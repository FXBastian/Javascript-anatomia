# Desafios — Modulos

## Desafio 1: Circular Dependencies

O que acontece neste cenario? Como resolver?

```javascript
// a.js
import { b } from "./b.js";
export const a = "A" + b;

// b.js
import { a } from "./a.js";
export const b = "B" + a;

// Explique o problema e proponha 3 formas de resolver
```

---

## Desafio 2: Re-export Patterns

Crie um barrel file que re-exporta de forma organizada:

```javascript
// index.js - quais formas existem?
export { default as X } from "./x.js";
export * from "./y.js";
export * as z from "./z.js";

// Quando usar cada forma?
```

---

## Desafio 3: Dynamic Import Condicional

Implemente code splitting baseado em features:

```javascript
async function carregarFeature(nome) {
  // Carregar modulo dinamicamente baseado no nome
  // Mapear nomes para caminhos de forma segura (sem path traversal)
}
```

---

## Desafio 4: CommonJS vs ESM

Converta este modulo CommonJS para ESM e vice-versa:

```javascript
// CommonJS
const fs = require("fs");
const { join } = require("path");
module.exports = { ler, escrever };
module.exports.default = App;

// Converta para ESM equivalente
```

---

## Desafio 5: Module Singleton

Explique por que modulos ES6 sao singletons naturais e demonstre:

```javascript
// counter.js
let count = 0;
export function incrementar() { return ++count; }
export function obter() { return count; }

// Se dois arquivos importarem counter.js, eles compartilham o mesmo state?
// Demonstre com codigo
```
