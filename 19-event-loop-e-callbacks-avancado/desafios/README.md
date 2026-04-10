# Desafios — Event Loop e Callbacks Avancado

## Desafio 1: Ordem de Execucao Complexa

Preveja a ordem exata:

```javascript
console.log("A");

setTimeout(() => {
  console.log("B");
  Promise.resolve().then(() => console.log("C"));
}, 0);

new Promise((resolve) => {
  console.log("D");
  resolve();
}).then(() => {
  console.log("E");
  setTimeout(() => console.log("F"), 0);
}).then(() => console.log("G"));

queueMicrotask(() => console.log("H"));

console.log("I");
```

---

## Desafio 2: Diferenca entre Microtask e Macrotask

Liste quais APIs geram microtasks e quais geram macrotasks:

```javascript
// Classifique cada um:
Promise.then()        // ?
setTimeout()          // ?
setInterval()         // ?
queueMicrotask()      // ?
MutationObserver      // ?
requestAnimationFrame // ?
fetch().then()        // ?
process.nextTick()    // ? (Node.js)
```

---

## Desafio 3: Starvation de Macrotask

Demonstre como microtasks podem "travar" macrotasks:

```javascript
// Este setTimeout NUNCA executa? Por que?
setTimeout(() => console.log("timeout"), 0);

function gerarMicrotasks() {
  Promise.resolve().then(() => {
    console.log("microtask");
    gerarMicrotasks(); // recursao infinita de microtasks
  });
}
gerarMicrotasks();
```

---

## Desafio 4: Implementar queueMicrotask

```javascript
function meuQueueMicrotask(callback) {
  // Implemente sem usar queueMicrotask nativo
  // Dica: use Promise.resolve().then()
}
```

---

## Desafio 5: Visualizar o Event Loop

Crie uma funcao que loga detalhadamente cada fase do event loop para um trecho de codigo:

```javascript
function tracer(codigo) {
  // Instrumentar console.log, setTimeout, Promise.then
  // Para cada chamada, logar:
  //   [SYNC] mensagem
  //   [MICROTASK] mensagem
  //   [MACROTASK] mensagem
  // Com timestamps relativos
}
```
