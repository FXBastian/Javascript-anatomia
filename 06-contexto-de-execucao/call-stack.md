# Call Stack (Pilha de Chamadas)

## Definição

A **Call Stack** é uma estrutura de dados do tipo **pilha** (LIFO — Last In, First Out) que o motor JavaScript usa para gerenciar os Execution Contexts. Cada vez que uma função é chamada, seu contexto é **empilhado**; quando a função retorna, o contexto é **desempilhado**.

JavaScript é **single-threaded** — tem apenas **uma** Call Stack. Isso significa que só pode executar **uma coisa por vez**.

---

## 1. Funcionamento Visual

```javascript
function terceira() {
  console.log("Executando terceira");
}

function segunda() {
  terceira();
  console.log("Executando segunda");
}

function primeira() {
  segunda();
  console.log("Executando primeira");
}

primeira();
```

### Passo a passo na Call Stack

```
PASSO 1 — Script inicia
┌──────────────┐
│  Global EC   │
└──────────────┘

PASSO 2 — primeira() é chamada
┌──────────────┐
│  primeira()  │
├──────────────┤
│  Global EC   │
└──────────────┘

PASSO 3 — segunda() é chamada (dentro de primeira)
┌──────────────┐
│  segunda()   │
├──────────────┤
│  primeira()  │
├──────────────┤
│  Global EC   │
└──────────────┘

PASSO 4 — terceira() é chamada (dentro de segunda)
┌──────────────┐
│  terceira()  │  ← executando agora
├──────────────┤
│  segunda()   │
├──────────────┤
│  primeira()  │
├──────────────┤
│  Global EC   │
└──────────────┘

PASSO 5 — terceira() retorna → desempilha
         console.log("Executando terceira") ✓
┌──────────────┐
│  segunda()   │  ← volta a executar
├──────────────┤
│  primeira()  │
├──────────────┤
│  Global EC   │
└──────────────┘

PASSO 6 — segunda() retorna → desempilha
         console.log("Executando segunda") ✓
┌──────────────┐
│  primeira()  │  ← volta a executar
├──────────────┤
│  Global EC   │
└──────────────┘

PASSO 7 — primeira() retorna → desempilha
         console.log("Executando primeira") ✓
┌──────────────┐
│  Global EC   │  ← programa continua
└──────────────┘
```

**Saída no console:**
```
Executando terceira
Executando segunda
Executando primeira
```

---

## 2. Call Stack e Valores de Retorno

```javascript
function multiplicar(a, b) {
  return a * b;
}

function calcularArea(largura, altura) {
  const area = multiplicar(largura, altura);
  return area;
}

const resultado = calcularArea(5, 3);
console.log(resultado); // 15
```

```
STACK:                      AÇÃO:

│ multiplicar(5,3)  │       → retorna 15
│ calcularArea(5,3) │       → recebe 15, retorna 15
│ Global EC         │       → resultado = 15

A cada retorno, o valor "desce" para o EC de baixo.
```

---

## 3. Stack Overflow

A Call Stack tem um **tamanho limitado** (varia por engine, geralmente ~10.000–25.000 frames). Se exceder, ocorre **Stack Overflow**.

### Causa mais comum: recursão sem caso base

```javascript
// ❌ Recursão infinita
function loop() {
  loop(); // chama a si mesma infinitamente
}
loop();
// RangeError: Maximum call stack size exceeded
```

```
┌──────────────┐
│  loop()      │  ← frame #10001 → STACK OVERFLOW!
├──────────────┤
│  loop()      │
├──────────────┤
│  loop()      │
├──────────────┤
│  ... × 9998  │
├──────────────┤
│  Global EC   │
└──────────────┘
```

### Recursão correta (com caso base)

```javascript
// ✅ Com caso base — a stack cresce e depois encolhe
function fatorial(n) {
  if (n <= 1) return 1; // caso base — PARA a recursão
  return n * fatorial(n - 1);
}

fatorial(5); // 120
```

```
Crescimento:                       Retorno:
│ fatorial(1) │ → return 1         1
│ fatorial(2) │ → return 2*f(1)    2*1 = 2
│ fatorial(3) │ → return 3*f(2)    3*2 = 6
│ fatorial(4) │ → return 4*f(3)    4*6 = 24
│ fatorial(5) │ → return 5*f(4)    5*24 = 120
│ Global EC   │
```

---

## 4. Single-Threaded e Suas Consequências

Como existe apenas uma Call Stack:

```javascript
// ❌ Código bloqueante — TRAVA a UI
function operacaoPesada() {
  let soma = 0;
  for (let i = 0; i < 10_000_000_000; i++) {
    soma += i;
  }
  return soma;
}

console.log("Antes");
operacaoPesada(); // A página congela aqui! Nada mais executa.
console.log("Depois"); // Só aparece quando o loop terminar
```

```
┌─────────────────────┐
│ operacaoPesada()    │  ← BLOQUEANDO a stack por minutos!
├─────────────────────┤     Nenhum clique, scroll ou animação funciona.
│ Global EC           │
└─────────────────────┘

A solução para isso: Web APIs + Event Loop (Módulo 08)
```

### Por isso existem operações assíncronas

```javascript
console.log("1 - Antes");

setTimeout(() => {
  console.log("2 - Timer"); // Callback vai para a Task Queue
}, 0);

console.log("3 - Depois");

// Saída: 1, 3, 2
// O callback do setTimeout NÃO entra na stack imediatamente
// Ele espera na fila até a stack estar vazia
```

---

## 5. Debugging com a Call Stack

### No DevTools do navegador

Quando um erro acontece, o browser mostra o **stack trace** — a sequência de chamadas na Call Stack no momento do erro:

```javascript
function c() {
  throw new Error("Algo deu errado!");
}

function b() {
  c();
}

function a() {
  b();
}

a();
```

```
Error: Algo deu errado!
    at c (script.js:2:9)       ← onde o erro aconteceu
    at b (script.js:6:3)       ← quem chamou c
    at a (script.js:10:3)      ← quem chamou b
    at script.js:13:1          ← quem chamou a (nível global)
```

**Leitura do stack trace:** de cima para baixo é da **função mais interna** para a mais externa. A linha do topo é onde o erro ocorreu.

### `console.trace()`

```javascript
function funcaoC() {
  console.trace("Rastreamento da stack:");
}

function funcaoB() {
  funcaoC();
}

function funcaoA() {
  funcaoB();
}

funcaoA();
// Imprime a call stack atual sem lançar erro:
// Trace: Rastreamento da stack:
//     at funcaoC
//     at funcaoB
//     at funcaoA
```

### Breakpoints no DevTools

1. Abra DevTools (F12)
2. Aba **Sources**
3. Clique no número da linha para colocar um breakpoint
4. O painel **Call Stack** (à direita) mostra a pilha completa
5. Use **Step Into** (F11) para entrar em funções, **Step Over** (F10) para pular

---

## 6. Call Stack com Eventos e Callbacks

```javascript
function processar(dados) {
  console.log("Processando:", dados);
}

document.getElementById("btn").addEventListener("click", function handler() {
  processar("clique");
});
```

```
QUANDO o botão é clicado:

┌──────────────────┐
│ processar("...")  │
├──────────────────┤
│ handler()        │  ← callback do evento
├──────────────────┤
│ Global EC        │
└──────────────────┘

A Call Stack estava vazia → Event Loop empurrou handler() para a stack.
Veremos isso em detalhes no Módulo 08.
```

---

## 7. Resumo

```
CALL STACK
├── É uma PILHA (LIFO)
├── UMA ÚNICA stack (single-threaded)
├── Global EC sempre na base
├── Cada chamada de função → empilha
├── Cada retorno → desempilha
├── Stack Overflow = recursão infinita ou muitos níveis
└── Stack trace = fotografia da pilha no momento do erro

REGRAS:
  1. Só o EC do TOPO está executando
  2. Quando uma função é chamada, execução PAUSA no EC atual
  3. Novo EC é empilhado e começa a executar
  4. Quando retorna, EC é removido e o anterior RETOMA
  5. Quando a stack esvazia, o Event Loop pode inserir callbacks
```

| Conceito | O que é |
|----------|---------|
| Frame | Um Execution Context na stack |
| Stack Trace | Lista dos frames no momento do erro |
| Stack Overflow | Stack excedeu o limite de frames |
| Blocking | Código que ocupa a stack por muito tempo |
| Single-threaded | Apenas uma operação por vez na stack |

---

> **Próximo arquivo:** [hoisting.md](hoisting.md) — Por que você pode usar certas coisas antes de declará-las.
