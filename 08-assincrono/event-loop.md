# Event Loop

## Definição

O **Event Loop** é o mecanismo que permite JavaScript ser **single-threaded** mas **não-bloqueante**. Ele coordena a execução de código síncrono, callbacks, Promises e eventos — decidindo **o quê** executa **quando**.

> **Analogia:** O Event Loop é como um garçom em um restaurante. Ele tem uma lista de pedidos (Call Stack), uma cozinha com vários cozinheiros (Web APIs), e uma fila de pratos prontos esperando para ser entregues (Task Queue). O garçom só entrega o próximo prato quando a mesa está limpa (stack vazia).

---

## 1. A Arquitetura Completa

```
┌──────────────────────────────────────────────────────────────┐
│                         RUNTIME                              │
│                                                              │
│  ┌──────────────────┐     ┌────────────────────────────┐    │
│  │    CALL STACK     │     │        WEB APIs            │    │
│  │                   │     │  (ambiente do browser/Node) │    │
│  │  ┌─────────────┐ │     │                            │    │
│  │  │ função()    │ │────→│  setTimeout()              │    │
│  │  ├─────────────┤ │     │  fetch()                   │    │
│  │  │ Global EC   │ │     │  addEventListener()        │    │
│  │  └─────────────┘ │     │  geolocation               │    │
│  └──────────────────┘     │  setInterval()             │    │
│          ↑                 └─────────┬──────────────────┘    │
│          │                           │                        │
│          │                           │ callback pronto        │
│    ┌─────┴────────────┐              ▼                        │
│    │   EVENT LOOP     │    ┌─────────────────────────┐       │
│    │                   │    │    MICROTASK QUEUE       │       │
│    │   "A stack está   │    │  (Promises, queueMicro)  │       │
│    │    vazia?         │◄───│  [cb1] [cb2] [cb3]       │       │
│    │    Sim → move     │    └─────────────────────────┘       │
│    │    callback para  │                                      │
│    │    a stack"       │    ┌─────────────────────────┐       │
│    │                   │◄───│    MACROTASK QUEUE       │       │
│    └───────────────────┘    │  (setTimeout, setInterval│       │
│                              │   I/O, eventos DOM)      │       │
│                              │  [cb4] [cb5]             │       │
│                              └─────────────────────────┘       │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Os Componentes

### Call Stack
Onde o código JavaScript executa. Uma coisa de cada vez (single-threaded). Veja [call-stack.md](call-stack.md) para aprofundamento.

### Web APIs (Browser) / C++ APIs (Node.js)
Ambientes **fora** do motor JS que executam operações em paralelo:
- `setTimeout`, `setInterval`
- `fetch`, `XMLHttpRequest`
- DOM events (`click`, `scroll`)
- `requestAnimationFrame`
- File system, network (Node.js)

### Callback Queues (Filas)
Quando uma Web API termina, o callback vai para uma **fila**:

| Fila | Prioridade | Exemplos |
|------|-----------|----------|
| **Microtask Queue** | 🔴 ALTA | `.then()`, `.catch()`, `.finally()`, `queueMicrotask()`, `MutationObserver` |
| **Macrotask Queue** | 🟡 NORMAL | `setTimeout`, `setInterval`, `setImmediate` (Node), I/O, eventos DOM |

### Event Loop
Algoritmo que roda continuamente:

```
LOOP INFINITO DO EVENT LOOP:

1. Executa TUDO na Call Stack até ela ficar vazia
2. Verifica a Microtask Queue:
   → Se tem microtasks, executa TODAS (até esvaziar)
   → Se novas microtasks foram adicionadas DURANTE a execução, executa também
3. Renderiza a UI (se necessário) — browser only
4. Pega UMA task da Macrotask Queue → move para a Call Stack
5. Volta para o passo 1
```

---

## 3. Exemplo Passo a Passo — Completo

```javascript
console.log("1");

setTimeout(function timeout() {
  console.log("2");
}, 0);

Promise.resolve().then(function promiseCb() {
  console.log("3");
});

console.log("4");
```

### Execução detalhada:

```
PASSO 1: console.log("1")
  Stack: [Global, console.log]
  → Imprime: "1"
  Stack: [Global]

PASSO 2: setTimeout(timeout, 0)
  Stack: [Global, setTimeout]
  → setTimeout registra timer na Web API (0ms)
  → Timer termina imediatamente → timeout vai para a MACROTASK QUEUE
  Stack: [Global]
  Macrotask Queue: [timeout]

PASSO 3: Promise.resolve().then(promiseCb)
  Stack: [Global, Promise.resolve, .then]
  → Promise já está resolvida → promiseCb vai para a MICROTASK QUEUE
  Stack: [Global]
  Microtask Queue: [promiseCb]
  Macrotask Queue: [timeout]

PASSO 4: console.log("4")
  Stack: [Global, console.log]
  → Imprime: "4"
  Stack: [Global]

PASSO 5: Global EC termina → Stack quase vazia
  → EVENT LOOP: "Stack vazia? Sim."
  → "Tem microtasks? SIM → executa TODAS"

PASSO 6: promiseCb() (da Microtask Queue)
  Stack: [promiseCb]
  → Imprime: "3"
  Stack: []

PASSO 7: Microtask Queue vazia → pega da Macrotask Queue
  → timeout() (da Macrotask Queue)
  Stack: [timeout]
  → Imprime: "2"
  Stack: []
```

**Saída final:** `1, 4, 3, 2`

---

## 4. Microtasks vs Macrotasks — A Diferença Crucial

### Microtasks: TODAS executam antes do próximo macrotask

```javascript
console.log("início");

setTimeout(() => console.log("macro 1"), 0);
setTimeout(() => console.log("macro 2"), 0);

Promise.resolve()
  .then(() => console.log("micro 1"))
  .then(() => console.log("micro 2"))
  .then(() => console.log("micro 3"));

console.log("fim");

// Saída:
// início
// fim
// micro 1    ← todas as microtasks primeiro
// micro 2
// micro 3
// macro 1    ← depois os macrotasks (um por vez)
// macro 2
```

### Microtasks podem gerar mais microtasks

```javascript
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => {
  console.log("C");
  // Esta microtask cria OUTRA microtask
  Promise.resolve().then(() => {
    console.log("D");
    // E esta cria mais uma!
    Promise.resolve().then(() => console.log("E"));
  });
});

console.log("F");

// Saída: A, F, C, D, E, B
// TODAS as microtasks (incluindo as geradas durante) executam antes de B
```

```
REGRA:
  Microtask Queue deve estar COMPLETAMENTE VAZIA
  antes do Event Loop pegar o próximo macrotask.

  ⚠️ Isso significa que microtasks recursivas podem BLOQUEAR
  a execução de macrotasks e a renderização da UI!
```

---

## 5. `queueMicrotask()`

API para agendar microtasks explicitamente:

```javascript
console.log("1");

queueMicrotask(() => console.log("2 - microtask"));

setTimeout(() => console.log("3 - macrotask"), 0);

Promise.resolve().then(() => console.log("4 - promise microtask"));

console.log("5");

// Saída: 1, 5, 2, 4, 3
// queueMicrotask e .then() estão na mesma fila (microtask)
```

---

## 6. setTimeout NÃO É Garantia de Tempo Exato

```javascript
console.log("Antes");

setTimeout(() => {
  console.log("Timer!");
}, 1000);

// O que setTimeout(fn, 1000) realmente significa:
// "Execute fn PELO MENOS após 1000ms, quando a stack estiver vazia"
// Se a stack estiver ocupada, o delay pode ser MAIOR

// Demonstração:
setTimeout(() => console.log("Deveria ser 0ms"), 0);

// Operação pesada que bloqueia por 3 segundos
const inicio = Date.now();
while (Date.now() - inicio < 3000) {
  // bloqueia a stack por 3 segundos
}

console.log("Desbloqueou");

// Saída:
// Antes
// Desbloqueou          ← após 3 segundos
// Deveria ser 0ms      ← na verdade esperou ~3000ms!
```

```
setTimeout(fn, 0) NÃO executa em 0ms!

1. O delay mínimo real é ~4ms (especificação HTML)
2. O callback vai para a Macrotask Queue
3. Event Loop SÓ move para a stack quando ela está vazia
4. Se a stack estiver ocupada, pode demorar muito mais
```

---

## 7. Exemplo Complexo — O Teste Definitivo

```javascript
console.log("1 - sync");

setTimeout(() => {
  console.log("2 - macro");
  Promise.resolve().then(() => console.log("3 - micro dentro de macro"));
}, 0);

Promise.resolve().then(() => {
  console.log("4 - micro");
  setTimeout(() => console.log("5 - macro dentro de micro"), 0);
});

Promise.resolve().then(() => console.log("6 - micro"));

setTimeout(() => console.log("7 - macro"), 0);

console.log("8 - sync");
```

### Resolução:

```
FASE SÍNCRONA (Call Stack):
  "1 - sync"
  setTimeout → callback vai para Macrotask Queue: [2-macro]
  .then → callback vai para Microtask Queue: [4-micro]
  .then → callback vai para Microtask Queue: [4-micro, 6-micro]
  setTimeout → Macrotask Queue: [2-macro, 7-macro]
  "8 - sync"

Stack vazia → ESVAZIAR MICROTASK QUEUE:
  "4 - micro" → executa. setTimeout dentro → Macrotask: [2-macro, 7-macro, 5-macro]
  "6 - micro"

Microtask vazia → PEGAR 1 MACROTASK:
  "2 - macro" → executa. .then() dentro → Microtask: [3-micro]

  Microtask Queue não está vazia → esvaziar:
  "3 - micro dentro de macro"

Microtask vazia → PEGAR 1 MACROTASK:
  "7 - macro"

Microtask vazia → PEGAR 1 MACROTASK:
  "5 - macro dentro de micro"
```

**Saída:** `1, 8, 4, 6, 2, 3, 7, 5`

---

## 8. Event Loop no Node.js

O Node.js tem fases adicionais no Event Loop:

```
   ┌───────────────────────────┐
┌─→│         timers            │  ← setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  ← callbacks de I/O adiados
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  ← uso interno
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │          poll             │  ← I/O de rede, arquivo, etc.
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │          check            │  ← setImmediate()
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──│      close callbacks      │  ← socket.on('close')
   └───────────────────────────┘

Entre CADA fase: microtasks (Promises, process.nextTick) são executadas
process.nextTick tem prioridade ACIMA de Promise.then
```

```javascript
// Node.js specific
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("promise"));

// Saída (Node.js):
// nextTick     ← process.nextTick tem prioridade máxima
// promise      ← microtask (Promise)
// timeout      ← macrotask (timer — pode variar com immediate)
// immediate    ← check phase
```

---

## 9. requestAnimationFrame (Browser)

```javascript
// requestAnimationFrame executa ANTES da próxima pintura do browser
// (~60fps = a cada ~16.6ms)

function animar(timestamp) {
  // Atualizar posição do elemento
  elemento.style.transform = `translateX(${posicao}px)`;
  posicao += 2;

  if (posicao < 500) {
    requestAnimationFrame(animar); // agenda próximo frame
  }
}

requestAnimationFrame(animar);
```

```
ORDEM de execução por frame do browser:

1. Macrotask (uma)
2. Microtasks (todas)
3. requestAnimationFrame callbacks
4. Layout/Paint (renderização visual)
5. requestIdleCallback (se sobrar tempo)
```

---

## 10. Armadilhas do Event Loop

### Starvation de Macrotasks

```javascript
// ❌ Microtasks infinitas impedem macrotasks de executar
function microInfinita() {
  Promise.resolve().then(microInfinita); // recursão em microtask
}

setTimeout(() => console.log("Nunca executa!"), 0);
microInfinita();
// O setTimeout NUNCA vai executar porque a Microtask Queue nunca esvazia
// A UI congela completamente
```

### Assumir ordem de setTimeout(fn, 0) vs Promise

```javascript
// ❌ Achar que setTimeout(0) é "imediato"
setTimeout(() => console.log("timer"), 0);     // macrotask → depois
Promise.resolve().then(() => console.log("promise")); // microtask → antes

// Promise SEMPRE antes do timeout!
```

---

## 11. Resumo Visual

```
CÓDIGO RODA NA CALL STACK (síncrono)
         │
         │ encontra operação assíncrona?
         │
         ▼
    WEB APIs / Node APIs executam em paralelo
         │
         │ operação terminou?
         │
         ▼
    Callback vai para a FILA correta:
         │
         ├──→ Microtask Queue (Promise.then, queueMicrotask)
         │        │
         │        │ PRIORIDADE ALTA — todas executam antes
         │        │
         └──→ Macrotask Queue (setTimeout, eventos, I/O)
                  │
                  │ PRIORIDADE NORMAL — uma por vez
                  │
    EVENT LOOP verifica continuamente:
         │
         ▼
    1. Stack vazia?
    2. Microtasks pendentes? → Executa TODAS
    3. Macrotask pendente?   → Executa UMA
    4. Volta ao passo 1
```

```
ORDEM DE PRIORIDADE:

1. 🔴 Código síncrono (stack)        — imediato
2. 🟠 process.nextTick (Node.js)     — antes de tudo
3. 🟡 Microtasks (Promise, queueMicrotask) — TODAS
4. 🟢 requestAnimationFrame (browser) — antes do paint
5. 🔵 Macrotasks (setTimeout, I/O)    — uma por vez
6. ⚪ requestIdleCallback (browser)   — se sobrar tempo
```

---

> **Próximo módulo:** [05-orientacao-a-objetos](../05-orientacao-a-objetos/README.md) — Classes, herança e protótipos.
