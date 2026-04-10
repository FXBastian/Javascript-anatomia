# Projetos Praticos — Funcoes

## Projeto 1: Factory de Validadores

Crie um sistema de validacao usando closures e higher-order functions:

```javascript
function criarValidador(regras) {
  return function validar(valor) {
    const erros = [];
    for (const regra of regras) {
      if (!regra.teste(valor)) {
        erros.push(regra.mensagem);
      }
    }
    return { valido: erros.length === 0, erros };
  };
}

const validarSenha = criarValidador([
  { teste: (v) => v.length >= 8, mensagem: "Minimo 8 caracteres" },
  { teste: (v) => /[A-Z]/.test(v), mensagem: "Precisa de maiuscula" },
  { teste: (v) => /\d/.test(v), mensagem: "Precisa de numero" },
  { teste: (v) => /[!@#$%]/.test(v), mensagem: "Precisa de especial" }
]);

console.log(validarSenha("abc"));
console.log(validarSenha("Abc12345!"));
```

---

## Projeto 2: Sistema de Memoization

Implemente memoization generica com suporte a multiplos argumentos:

```javascript
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const chave = JSON.stringify(args);
    if (cache.has(chave)) {
      console.log(`[cache hit] ${chave}`);
      return cache.get(chave);
    }
    const resultado = fn.apply(this, args);
    cache.set(chave, resultado);
    return resultado;
  };
}

// Funcao cara (simulada)
const fatorial = memoize(function f(n) {
  if (n <= 1) return 1;
  return n * f(n - 1);
});

console.log(fatorial(10)); // calcula
console.log(fatorial(10)); // cache hit
console.log(fatorial(5));  // cache hit (ja calculou durante fatorial(10))
```

---

## Projeto 3: Pipeline de Funcoes (Compose/Pipe)

```javascript
function pipe(...fns) {
  return function (valor) {
    return fns.reduce((acc, fn) => fn(acc), valor);
  };
}

function compose(...fns) {
  return pipe(...fns.reverse());
}

// Transformacoes de texto
const limpar = (s) => s.trim();
const minusculas = (s) => s.toLowerCase();
const semEspacosDuplos = (s) => s.replace(/\s+/g, " ");
const capitalizar = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const normalizarTexto = pipe(limpar, minusculas, semEspacosDuplos, capitalizar);

console.log(normalizarTexto("   HELLO    WORLD   ")); // "Hello world"
```

---

## Projeto 4: Curry Automatico

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...args2) {
      return curried.apply(this, [...args, ...args2]);
    };
  };
}

const somar = curry((a, b, c) => a + b + c);
console.log(somar(1)(2)(3));    // 6
console.log(somar(1, 2)(3));    // 6
console.log(somar(1)(2, 3));    // 6
console.log(somar(1, 2, 3));    // 6
```

**Conexao**: Closures (modulo 06), this (modulo 07), patterns (futuro modulo 20).
