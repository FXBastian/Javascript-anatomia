# Desafios — Iteradores e Generators

## Desafio 1: Implementar Iterator Protocol

Crie um objeto iteravel sem usar generator:

```javascript
const contagem = {
  de: 1,
  ate: 5,
  [Symbol.iterator]() {
    // Implemente: retornar objeto com next()
    // next() retorna { value, done }
  }
};

for (const n of contagem) console.log(n); // 1, 2, 3, 4, 5
```

---

## Desafio 2: Generator como State Machine

```javascript
function* semaforoTransito() {
  while (true) {
    yield "verde";
    yield "amarelo";
    yield "vermelho";
  }
}

// Use o generator para simular 10 mudancas de sinal
```

---

## Desafio 3: Generator com Comunicacao Bidirecional

```javascript
function* acumulador() {
  let total = 0;
  while (true) {
    const valor = yield total;
    if (valor === null) return total; // return encerra
    total += valor;
  }
}

const acc = acumulador();
acc.next();       // { value: 0, done: false }
acc.next(10);     // { value: 10, done: false }
acc.next(20);     // { value: 30, done: false }
acc.next(5);      // { value: 35, done: false }
acc.next(null);   // { value: 35, done: true }
// Explique como o yield recebe e envia valores
```

---

## Desafio 4: Implementar zip e enumerate

```javascript
function* zip(...iteraveis) {
  // zip([1,2,3], ["a","b","c"]) → [1,"a"], [2,"b"], [3,"c"]
}

function* enumerate(iteravel, inicio = 0) {
  // enumerate(["a","b","c"]) → [0,"a"], [1,"b"], [2,"c"]
}
```

---

## Desafio 5: Generator vs Array - Memoria

Demonstre a diferenca de uso de memoria entre:
```javascript
// Abordagem 1: Array (tudo em memoria)
const todosArray = Array.from({ length: 10_000_000 }, (_, i) => i * 2);

// Abordagem 2: Generator (sob demanda)
function* todosGenerator() {
  for (let i = 0; i < 10_000_000; i++) yield i * 2;
}

// Meca e compare o uso de memoria com process.memoryUsage() (Node.js)
```
