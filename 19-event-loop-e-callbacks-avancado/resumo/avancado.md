# Event Loop e Callbacks Avançado — Visão Profissional

> Este arquivo aprofunda o que o `resumo.md` apresenta. Não repete — expande.

---

## 1. Execução real do Event Loop

### O Tick do Event Loop

Cada iteração do Event Loop é chamada de **tick**. Um tick segue esta sequência exata:

```
╔═══════════════════════════════════════════════════════════╗
║                    UM TICK DO EVENT LOOP                  ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  1. Executa tudo na Call Stack até esvaziar                ║
║                                                           ║
║  2. Drena TODA a Microtask Queue                          ║
║     → inclui microtasks geradas DURANTE a drenagem        ║
║                                                           ║
║  3. Renderiza UI (se necessário — somente browser)        ║
║     → requestAnimationFrame roda aqui                     ║
║                                                           ║
║  4. Pega UMA macrotask da Macrotask Queue                 ║
║     → move para Call Stack                                 ║
║                                                           ║
║  5. Volta para 1                                          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### Loop infinito

O Event Loop **nunca para**. Enquanto o programa estiver rodando (browser aberto, processo Node.js ativo), ele continua verificando as filas. Quando não tem nada para fazer, fica em estado de espera sem consumir CPU significativa.

### Prioridade de execução

```
MAIS PRIORITÁRIO ──────────────────────── MENOS PRIORITÁRIO

  Call Stack  →  Microtask Queue  →  Render  →  Macrotask Queue
  (síncrono)    (Promises)         (UI)        (setTimeout, I/O)
```

Isso explica por que Promises sempre resolvem antes de `setTimeout`, mesmo que ambos estejam "prontos".

---

## 2. Microtask vs Macrotask

Essa é a distinção mais importante para prever execução de código assíncrono.

### Microtasks (alta prioridade)

| API | Exemplo |
|-----|---------|
| `Promise.then()` / `.catch()` / `.finally()` | `fetch('/api').then(cb)` |
| `queueMicrotask()` | `queueMicrotask(() => {...})` |
| `MutationObserver` | Observa mudanças no DOM |
| `async/await` (continuação após await) | `const x = await fn()` |

### Macrotasks (prioridade normal)

| API | Exemplo |
|-----|---------|
| `setTimeout` | `setTimeout(cb, 0)` |
| `setInterval` | `setInterval(cb, 1000)` |
| Eventos DOM | `element.addEventListener('click', cb)` |
| I/O (Node.js) | `fs.readFile(path, cb)` |
| `setImmediate` (Node.js) | `setImmediate(cb)` |
| `requestAnimationFrame` | `requestAnimationFrame(cb)` |

### Comparação direta

```
MICROTASK                              MACROTASK
─────────────────────────────          ─────────────────────────────
✅ Executa ANTES do render             ❌ Executa DEPOIS do render
✅ TODA a fila drena de uma vez        ❌ Apenas UMA por tick
✅ Alta prioridade                     ❌ Prioridade normal
⚠️  Pode travar UI se infinita        ✅ Dá espaço para o browser
```

### Ordem de execução — Regra absoluta

```
1. Call Stack          → código síncrono
2. Microtask Queue     → Promise.then, queueMicrotask, await
3. Macrotask Queue     → setTimeout, setInterval, eventos DOM
```

Sempre. Sem exceção.

---

## 3. Exemplo real — Comentado passo a passo

```javascript
console.log("A");                      // SÍNCRONO

setTimeout(() => {                     // MACROTASK
  console.log("B");
}, 0);

Promise.resolve().then(() => {         // MICROTASK
  console.log("C");
});

console.log("D");                      // SÍNCRONO
```

### Passo 1 — Fase síncrona (Call Stack)

```
Executa: console.log("A")  →  imprime "A"
Encontra: setTimeout(...)  →  delega para Web API → callback vai para MACROTASK Queue
Encontra: Promise.then()   →  callback vai para MICROTASK Queue
Executa: console.log("D")  →  imprime "D"
```

Estado após fase síncrona:
```
CALL STACK:       (vazia)
MICROTASK QUEUE:  [() => console.log("C")]
MACROTASK QUEUE:  [() => console.log("B")]
SAÍDA ATÉ AGORA:  A, D
```

### Passo 2 — Event Loop drena Microtasks

```
Microtask Queue NÃO está vazia
→ Executa: () => console.log("C")  →  imprime "C"
→ Microtask Queue agora está vazia
```

Estado:
```
CALL STACK:       (vazia)
MICROTASK QUEUE:  (vazia)
MACROTASK QUEUE:  [() => console.log("B")]
SAÍDA ATÉ AGORA:  A, D, C
```

### Passo 3 — Event Loop pega uma Macrotask

```
Macrotask Queue NÃO está vazia
→ Move: () => console.log("B") para Call Stack
→ Executa: console.log("B")  →  imprime "B"
```

### Saída final

```
A
D
C
B
```

**Por que essa ordem?**
- `A` e `D` → síncronos, executam direto na Call Stack
- `C` → microtask (Promise), tem prioridade sobre macrotasks
- `B` → macrotask (setTimeout), executa por último

---

## 4. Modelo mental profundo

### JavaScript não é assíncrono

JavaScript puro é **síncrono e single-threaded**. Ele não tem nenhum mecanismo interno para fazer coisas em paralelo. O que acontece na prática:

```
JavaScript (motor V8, SpiderMonkey, etc.)
    │
    │  "Eu não sei fazer requisição HTTP"
    │  "Eu não sei contar tempo"
    │  "Eu não sei escutar clique"
    │
    ▼
Web APIs / Runtime (Browser, Node.js)
    │
    │  "Eu faço isso pra você"
    │  "Quando terminar, coloco o callback na fila"
    │
    ▼
Event Loop
    │
    │  "Quando a stack esvaziar, eu entrego o callback"
    │
    ▼
Call Stack executa o callback
```

### As três verdades

1. **JS delega** — ele não executa assíncrono, ele pede para o ambiente executar
2. **Web APIs fazem o trabalho pesado** — rede, timers, DOM, tudo fora da engine
3. **Event Loop coordena** — é a ponte entre o mundo assíncrono e a Call Stack síncrona

---

## 5. Pegadinhas

### ⚠️ setTimeout(fn, 0) não é imediato

```javascript
setTimeout(() => console.log("timer"), 0);
console.log("sync");
// sync → timer
```

`0ms` não significa "agora". Significa "o mais rápido possível DEPOIS que a stack esvaziar e as microtasks executarem". Na prática, o browser impõe um mínimo de ~4ms para timers aninhados.

### ⚠️ Promises sempre executam antes de setTimeout

```javascript
setTimeout(() => console.log("macro"), 0);
Promise.resolve().then(() => console.log("micro"));
// micro → macro
```

Microtasks têm prioridade. Sempre. Isso é **especificação**, não comportamento acidental.

### ⚠️ Stack bloqueada trava TUDO

```javascript
// NUNCA faça isso
while (true) {
  // loop infinito na Call Stack
}
// Nenhum callback, Promise ou evento vai executar
// A UI congela completamente
```

Se a Call Stack nunca esvazia, o Event Loop **nunca** consegue mover callbacks. O browser mostra "página não responde".

### ⚠️ Microtasks podem travar também

```javascript
// NUNCA faça isso
function loop() {
  Promise.resolve().then(loop);
}
loop();
// Microtask Queue NUNCA esvazia → macrotasks nunca executam → UI trava
```

Como o Event Loop drena **todas** as microtasks antes de avançar, uma microtask que gera outra infinitamente trava o sistema da mesma forma.

### ⚠️ async/await é Microtask disfarçada

```javascript
async function exemplo() {
  console.log("antes");      // síncrono
  await Promise.resolve();
  console.log("depois");     // microtask (continuação do await)
}
```

Tudo **depois** de um `await` é uma microtask. O `await` divide a função em parte síncrona (antes) e parte assíncrona (depois).

---

## 6. Analogia — O Restaurante

```
┌──────────────────────────────────────────────────────────────┐
│                    🏪 RESTAURANTE JS                         │
│                                                              │
│  CALL STACK = O cozinheiro principal                         │
│  → Só faz UM prato por vez                                  │
│  → Não sai do fogão até terminar                             │
│                                                              │
│  WEB APIs = Os assistentes da cozinha                        │
│  → Um cuida do forno (setTimeout)                            │
│  → Outro cuida das entregas (fetch)                          │
│  → Outro anota pedidos dos clientes (DOM events)             │
│  → Trabalham em PARALELO ao cozinheiro                       │
│                                                              │
│  CALLBACK QUEUE = O balcão de pratos prontos                 │
│  → Assistentes deixam pratos prontos aqui                    │
│  → Pratos esperam na FILA                                    │
│                                                              │
│  EVENT LOOP = O gerente do restaurante                       │
│  → Fica olhando: "O cozinheiro terminou?"                    │
│  → Se sim: pega o próximo prato do balcão                    │
│  → Entrega pro cozinheiro preparar                           │
│                                                              │
│  MICROTASK = Pedidos VIP (Promise)                           │
│  → Passam na frente da fila normal                           │
│  → TODOS os VIPs são atendidos antes do próximo normal       │
│                                                              │
│  MACROTASK = Pedidos normais (setTimeout)                    │
│  → Esperam sua vez                                           │
│  → Só UM por rodada                                          │
└──────────────────────────────────────────────────────────────┘
```

---

## 7. Conexão com vida real

### React

```javascript
// setState é assíncrono — o render não acontece imediatamente
setState({ count: count + 1 });
console.log(count); // valor ANTIGO — a microtask do React ainda não executou
```

O React agenda atualizações de estado como microtasks. Entender o Event Loop explica por que `console.log` após `setState` mostra o valor antigo.

### APIs e Fetch

```javascript
// fetch delega para Web API → callback volta como microtask
async function carregarDados() {
  const res = await fetch("/api/dados");  // Web API faz a requisição
  const json = await res.json();           // Outra operação assíncrona
  renderizar(json);                        // Só executa quando os dados chegam
}
```

Cada `await` cria um ponto onde o Event Loop pode processar outras coisas.

### Animações

```javascript
// requestAnimationFrame sincroniza com o refresh do monitor (~60fps)
function animar() {
  elemento.style.left = posicao + "px";
  posicao++;
  requestAnimationFrame(animar); // macrotask que roda antes do render
}
```

Se você usar `setTimeout` para animação, pode perder frames. `requestAnimationFrame` é coordenado pelo Event Loop no momento certo.

### Loaders e UX

```javascript
// Mostrar loading ANTES de operação pesada
botao.addEventListener("click", async () => {
  spinner.style.display = "block";     // síncrono — muda DOM
  await new Promise(r => setTimeout(r, 0)); // dá tempo pro browser renderizar
  const dados = await buscarDados();   // operação demorada
  spinner.style.display = "none";
});
```

Sem o `await setTimeout`, o browser não renderiza o spinner porque a Call Stack está ocupada.

### Jogos (3D, canvas)

```javascript
// Game loop clássico — cada frame é uma macrotask
function gameLoop() {
  atualizarFisica();      // Call Stack
  renderizarCena();       // Call Stack
  requestAnimationFrame(gameLoop); // Agenda próximo frame
}
```

O Event Loop garante que cada frame tem tempo para processar input, física e render, sem bloquear o browser.

---

## Resumo final — Como o JavaScript pensa

```
1. "Tenho código síncrono? Executo AGORA na Call Stack."
2. "Encontrei algo assíncrono? Delego para Web API."
3. "Web API terminou? Callback vai para a fila."
4. "Microtask na fila? Dreno TODAS antes de qualquer outra coisa."
5. "Stack vazia e microtasks esgotadas? Pego UMA macrotask."
6. "Repito para sempre."
```

Se você consegue olhar qualquer código e seguir esses 6 passos mentalmente, você **domina** o Event Loop.
