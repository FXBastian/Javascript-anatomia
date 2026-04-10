# Desafios — Funcoes

## Desafio 1: Implementar Debounce e Throttle

```javascript
// debounce: executa a funcao somente depois que parar de ser chamada por X ms
function debounce(fn, delay) {
  // Implemente aqui
}

// throttle: executa no maximo uma vez a cada X ms
function throttle(fn, intervalo) {
  // Implemente aqui
}
```

---

## Desafio 2: Funcao once()

Crie uma funcao que garante que outra funcao so pode ser chamada uma vez:

```javascript
function once(fn) {
  // Implemente aqui
  // Primeira chamada: executa e retorna resultado
  // Chamadas seguintes: retorna o resultado da primeira
}

const inicializar = once(() => {
  console.log("Inicializando...");
  return { status: "pronto" };
});

console.log(inicializar()); // "Inicializando..." { status: "pronto" }
console.log(inicializar()); // { status: "pronto" } (sem log)
```

---

## Desafio 3: Implementar Function.prototype.bind

Reimplemente `bind` do zero (sem usar o bind nativo):

```javascript
Function.prototype.meuBind = function (contexto, ...argsParciais) {
  // Implemente aqui
  // Deve funcionar identico ao bind nativo
};
```

---

## Desafio 4: Recursao com Trampolim

O que acontece com recursao muito profunda? Stack overflow. Implemente um trampolim para resolver:

```javascript
function trampolim(fn) {
  // Implemente aqui
  // Deve transformar recursao em iteracao
}

// Versao normal (estoura com n grande):
const somaAte = (n) => n <= 0 ? 0 : n + somaAte(n - 1);

// Versao com trampolim (nao estoura):
const somaAteSafe = trampolim(function f(n, acc = 0) {
  if (n <= 0) return acc;
  return () => f(n - 1, acc + n); // retorna thunk ao inves de recursar
});

console.log(somaAteSafe(100000)); // Funciona!
```

---

## Desafio 5: Partial Application vs Currying

Explique a diferenca e implemente ambos. Quando usar cada um?

```javascript
// Partial: fixa ALGUNS argumentos
function partial(fn, ...fixos) {
  // Implemente
}

// Curry: transforma f(a,b,c) em f(a)(b)(c)
// (ja implementado no projeto - agora explique a diferenca)
```
