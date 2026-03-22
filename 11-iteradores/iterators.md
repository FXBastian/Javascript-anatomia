# Iterators (Iteradores)

## Definição

O **Iterator Protocol** é o mecanismo que permite que `for...of`, spread (`...`), e destructuring funcionem. Qualquer objeto que implementa o método `Symbol.iterator` é **iterável**.

---

## 1. Como `for...of` Funciona Por Baixo

```javascript
const arr = [10, 20, 30];

// for...of faz isso internamente:
const iterator = arr[Symbol.iterator](); // obtém o iterador

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true } ← acabou
```

```
PROTOCOLO:
  Iterável  → objeto com [Symbol.iterator]() que retorna um Iterador
  Iterador  → objeto com .next() que retorna { value, done }
```

---

## 2. Iteráveis Nativos

```javascript
// Todos implementam Symbol.iterator:
// Arrays, Strings, Maps, Sets, NodeLists, arguments, TypedArrays

for (const char of "Hello") console.log(char); // H, e, l, l, o
for (const [k, v] of new Map([["a",1]])) console.log(k, v); // a 1
for (const item of new Set([1,2,3])) console.log(item); // 1, 2, 3
```

---

## 3. Criar um Iterável Personalizado

```javascript
const range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;

    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const n of range) console.log(n); // 1, 2, 3, 4, 5
console.log([...range]); // [1, 2, 3, 4, 5]

const [a, b] = range; // a=1, b=2 (destructuring funciona!)
```

### Iterável em uma Classe

```javascript
class Playlist {
  #musicas = [];

  adicionar(musica) {
    this.#musicas.push(musica);
  }

  [Symbol.iterator]() {
    let i = 0;
    const musicas = this.#musicas;
    return {
      next() {
        return i < musicas.length
          ? { value: musicas[i++], done: false }
          : { done: true };
      }
    };
  }
}

const playlist = new Playlist();
playlist.adicionar("Bohemian Rhapsody");
playlist.adicionar("Stairway to Heaven");

for (const musica of playlist) {
  console.log(musica);
}
```

---

## 4. Spread e Destructuring Dependem do Iterator Protocol

```javascript
// Spread usa Symbol.iterator
const set = new Set([1, 2, 3]);
const arr = [...set]; // [1, 2, 3]

// Destructuring usa Symbol.iterator
const [first, ...rest] = "Hello"; // first="H", rest=["e","l","l","o"]

// Objetos NÃO são iteráveis (sem Symbol.iterator)
// for (const x of { a: 1 }) {} // TypeError: not iterable
// Mas spread em objetos ({...obj}) é uma feature separada de Object
```

---

> **Próximo arquivo:** [generators.md](generators.md) — Funções que podem pausar e retomar.
