# Desafios — Estruturas de Dados

## Desafio 1: Achatar Array Aninhado

Implemente `flat()` do zero, com suporte a profundidade:

```javascript
function achatar(arr, profundidade = 1) {
  // achatar([1, [2, [3, [4]]]], 1) → [1, 2, [3, [4]]]
  // achatar([1, [2, [3, [4]]]], Infinity) → [1, 2, 3, 4]
  // Implemente sem usar Array.prototype.flat
}
```

---

## Desafio 2: Agrupar por Propriedade

```javascript
function agruparPor(array, chave) {
  // agruparPor([{tipo: "a", v: 1}, {tipo: "b", v: 2}, {tipo: "a", v: 3}], "tipo")
  // → { a: [{tipo:"a",v:1}, {tipo:"a",v:3}], b: [{tipo:"b",v:2}] }
}
```

---

## Desafio 3: Diferenca Entre Objetos

Crie uma funcao que retorna apenas as propriedades que mudaram:

```javascript
function diff(antigo, novo) {
  // diff({a:1, b:2, c:3}, {a:1, b:5, d:4})
  // → { alterados: {b: {de: 2, para: 5}}, adicionados: {d: 4}, removidos: ["c"] }
}
```

---

## Desafio 4: Implementar uma Fila e uma Pilha

```javascript
// Pilha (Stack) - LIFO
class Pilha {
  // push, pop, peek, isEmpty, size
}

// Fila (Queue) - FIFO
class Fila {
  // enqueue, dequeue, front, isEmpty, size
}

// Fila de Prioridade
class FilaPrioridade {
  // enqueue com prioridade, dequeue (maior prioridade primeiro)
}
```

---

## Desafio 5: Path de Objeto Seguro

Acesse propriedades profundas de forma segura com uma string de path:

```javascript
function obter(obj, caminho, padrao = undefined) {
  // obter({a: {b: {c: 42}}}, "a.b.c") → 42
  // obter({a: {b: {c: 42}}}, "a.x.y") → undefined
  // obter({a: {b: {c: 42}}}, "a.x.y", "N/A") → "N/A"
  // Suporte tambem para arrays: "a.0.nome"
}
```
