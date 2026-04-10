# Desafios — Contexto de Execucao

## Desafio 1: Prever a Saida

Sem executar, preveja a saida. Depois verifique:

```javascript
var a = 1;
function outer() {
  console.log(a); // ?
  var a = 2;
  function inner() {
    console.log(a); // ?
    var a = 3;
    console.log(a); // ?
  }
  inner();
  console.log(a); // ?
}
outer();
console.log(a); // ?
```

---

## Desafio 2: let vs var no Loop

Explique detalhadamente por que esses dois codigos produzem resultados diferentes:

```javascript
// Codigo A
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}

// Codigo B
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}
```

Desenhe o modelo mental de escopos criados em cada caso.

---

## Desafio 3: Temporal Dead Zone

```javascript
console.log(typeof x);   // ?
console.log(typeof y);   // ?
var x = 1;
let y = 2;
```

Explique o que e TDZ e por que o `let` se comporta diferente do `var`.

---

## Desafio 4: Execution Context Manual

Desenhe (em texto) o Execution Context completo para este codigo, incluindo:
- Variable Environment
- Scope Chain
- this binding

```javascript
const multiplicador = 2;

function calcular(valores) {
  const resultado = valores.map(function dobrar(v) {
    return v * multiplicador;
  });
  return resultado;
}

calcular([1, 2, 3]);
```

---

## Desafio 5: Closure vs Hoisting

```javascript
function criarContadores() {
  var contadores = [];
  for (var i = 0; i < 5; i++) {
    contadores.push(function() { return i; });
  }
  return contadores;
}

const c = criarContadores();
console.log(c[0]()); // ?
console.log(c[3]()); // ?
```

Corrija o codigo usando 3 abordagens diferentes:
1. IIFE
2. let
3. bind ou argumento extra
