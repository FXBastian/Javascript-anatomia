# Event Loop e Callbacks Avançado — Resumo

## Visão geral

JavaScript é **single-threaded**. Ele tem apenas uma Call Stack — uma coisa de cada vez. Mas ele não trava quando faz requisições, timers ou eventos. O segredo está na **arquitetura de runtime** composta por quatro peças:

```
┌─────────────────┐     ┌─────────────────────┐
│   CALL STACK    │     │      WEB APIs        │
│                 │     │                      │
│  console.log()  │────→│  setTimeout()        │
│  logger()       │     │  DOM (addEventListener)│
│  main()         │     │  fetch()             │
└────────┬────────┘     └──────────┬───────────┘
         │                         │
         │                         │ callback pronto
         │                         ▼
   ┌─────┴──────────┐    ┌─────────────────────┐
   │   EVENT LOOP   │◄───│   CALLBACK QUEUE     │
   │                │    │                      │
   │  "Stack vazia? │    │  onClick             │
   │   Move callback│    │  onLoad              │
   │   para stack"  │    │  onDone              │
   └────────────────┘    └─────────────────────┘
```

---

## 1. O que é a Call Stack

A Call Stack é uma **pilha de execução**. Toda vez que uma função é chamada, ela é **empilhada** no topo. Quando termina, é **desempilhada**.

### Características

- Estrutura **LIFO** (Last In, First Out) — a última a entrar é a primeira a sair
- Execução **síncrona** — uma instrução por vez
- JavaScript tem **uma única** Call Stack

### Exemplo visual

```javascript
function saudacao() {
  console.log("Olá!");   // 3 — executa e sai
}

function iniciar() {
  saudacao();            // 2 — empilha saudacao()
}

iniciar();               // 1 — empilha iniciar()
```

```
PASSO 1                PASSO 2                PASSO 3
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  iniciar()   │      │  saudacao()  │      │ console.log()│
├──────────────┤      ├──────────────┤      ├──────────────┤
│  Global EC   │      │  iniciar()   │      │  saudacao()  │
└──────────────┘      ├──────────────┤      ├──────────────┤
                      │  Global EC   │      │  iniciar()   │
                      └──────────────┘      ├──────────────┤
                                            │  Global EC   │
                                            └──────────────┘
```

Depois do `console.log()`, tudo desempilha na ordem inversa.

> **Fluxo mental:** A Call Stack é o **cérebro executando agora**. Ela só faz uma coisa por vez, e só quando termina a atual é que pega a próxima.

---

## 2. O que são Web APIs

Web APIs **não fazem parte do JavaScript puro**. Elas são fornecidas pelo **ambiente** (browser ou Node.js) e executam operações **fora** da Call Stack.

### Principais Web APIs

| Web API | O que faz |
|---------|-----------|
| `setTimeout` / `setInterval` | Agenda execução após um tempo |
| `DOM` (addEventListener) | Escuta eventos como click, scroll, keydown |
| `fetch` | Faz requisições HTTP (rede) |
| `geolocation` | Acessa localização do dispositivo |
| `requestAnimationFrame` | Sincroniza com a renderização do browser |

### Como funciona

```javascript
console.log("A");            // 1 — vai para Call Stack → executa

setTimeout(() => {           // 2 — vai para Call Stack → delega para Web API
  console.log("B");          //     Web API conta o tempo
}, 1000);                    //     após 1s, callback vai para Queue

console.log("C");            // 3 — vai para Call Stack → executa
```

O JavaScript **não espera** o `setTimeout` terminar. Ele **delega** para a Web API e continua rodando.

> **Fluxo mental:** Web APIs são **assistentes externos**. O JS pede ajuda, eles fazem o trabalho em background, e quando terminam, colocam o resultado na fila.

---

## 3. O que é a Callback Queue

A Callback Queue (ou Task Queue) é uma **fila** onde callbacks ficam esperando para executar. Quando uma Web API termina seu trabalho, o callback correspondente entra nessa fila.

### Características

- Estrutura **FIFO** (First In, First Out) — o primeiro a entrar é o primeiro a sair
- Callbacks **não executam imediatamente** — eles **esperam**
- Só vão para a Call Stack quando ela estiver **vazia**

### Exemplo

```javascript
setTimeout(() => console.log("Timeout"), 0);
console.log("Síncrono");
```

Saída:
```
Síncrono
Timeout
```

Mesmo com `0ms`, o callback do `setTimeout` vai para a Queue e **espera** o código síncrono terminar.

> **Fluxo mental:** A Queue é uma **sala de espera**. Não importa quão rápido o callback ficou pronto — ele espera sua vez.

---

## 4. O que é o Event Loop

O Event Loop é o **coordenador**. Ele roda em um loop infinito e tem um único trabalho: verificar se a Call Stack está vazia e, se estiver, mover o próximo callback da Queue para a Stack.

### Algoritmo simplificado

```
LOOP INFINITO:
  1. A Call Stack tem código executando?
     → SIM: espera terminar
     → NÃO: vai para o passo 2

  2. Tem callback na Queue?
     → SIM: move o primeiro callback para a Call Stack
     → NÃO: continua esperando

  3. Volta para o passo 1
```

> **Fluxo mental:** O Event Loop é o **gerente**. Ele não executa nada — ele **decide** quem executa e quando.

---

## 5. Fluxo completo — Passo a passo

Vamos seguir a execução completa baseada na arquitetura do runtime:

```javascript
console.log("Início");

setTimeout(() => {
  console.log("Timer");
}, 0);

console.log("Fim");
```

### Passo 1 — Código entra na Call Stack

```
CALL STACK          WEB APIs          QUEUE
┌──────────────┐
│ console.log  │    (vazio)           (vazio)
│ ("Início")   │
├──────────────┤
│  Global EC   │
└──────────────┘

→ Imprime: "Início"
```

### Passo 2 — setTimeout vai para Web APIs

```
CALL STACK          WEB APIs          QUEUE
┌──────────────┐    ┌───────────┐
│  Global EC   │    │ timer(0ms)│    (vazio)
└──────────────┘    └───────────┘

→ JS delega o timer e CONTINUA
```

### Passo 3 — Segundo console.log executa

```
CALL STACK          WEB APIs          QUEUE
┌──────────────┐    ┌───────────┐
│ console.log  │    │ timer(0ms)│    (vazio)
│ ("Fim")      │    └───────────┘
├──────────────┤
│  Global EC   │
└──────────────┘

→ Imprime: "Fim"
```

### Passo 4 — Callback vai para a Queue

```
CALL STACK          WEB APIs          QUEUE
┌──────────────┐                     ┌──────────────┐
│  Global EC   │    (vazio)          │ () => log    │
└──────────────┘                     │ ("Timer")    │
                                     └──────────────┘

→ Timer terminou, callback entra na fila
```

### Passo 5 — Event Loop verifica stack vazia e move callback

```
CALL STACK          WEB APIs          QUEUE
┌──────────────┐
│ console.log  │    (vazio)           (vazio)
│ ("Timer")    │
└──────────────┘

→ Imprime: "Timer"
```

### Saída final

```
Início
Fim
Timer
```

---

## Fluxo Mental — Regra de ouro

> **"JavaScript executa primeiro tudo que é síncrono. Depois processa o que está na fila assíncrona."**

Essa é a regra que governa **toda** a execução assíncrona do JavaScript. Se você internalizar isso, consegue prever a saída de qualquer código.

### Resumo visual

```
1. Código síncrono        → Call Stack (executa AGORA)
2. Operação assíncrona    → Delega para Web API
3. Callback pronto        → Entra na Queue (ESPERA)
4. Stack vazia            → Event Loop move para Stack
5. Callback executa       → Call Stack (executa AGORA)
```

---

## Analogia final

| Componente | Analogia |
|-----------|----------|
| **Call Stack** | Cérebro executando a tarefa atual |
| **Web APIs** | Assistentes externos fazendo trabalho paralelo |
| **Callback Queue** | Fila de tarefas prontas esperando vez |
| **Event Loop** | Gerente que decide quem entra na sala de execução |

> O cérebro (Call Stack) faz uma coisa por vez. Os assistentes (Web APIs) trabalham em background. Quando terminam, colocam o resultado na fila (Queue). O gerente (Event Loop) só deixa entrar quando o cérebro está livre.

---

## Conexões

- Call Stack detalhada → [Módulo 06 — call-stack.md](../../06-contexto-de-execucao/call-stack.md)
- Callbacks e Promises → [Módulo 08 — callbacks.md](../../08-assincrono/callbacks.md)
- Event Loop básico → [Módulo 08 — event-loop.md](../../08-assincrono/event-loop.md)
- Microtasks vs Macrotasks → [avancado.md](avancado.md)
