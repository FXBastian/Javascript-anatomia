# Declaração de Funções

## Definição

Uma **função** é um bloco de código reutilizável que realiza uma tarefa específica. Em JavaScript, funções são **cidadãs de primeira classe** (first-class citizens) — podem ser atribuídas a variáveis, passadas como argumentos e retornadas de outras funções.

```javascript
// A função encapsula lógica reutilizável
function calcularDesconto(preco, percentual) {
  return preco - (preco * percentual / 100);
}

console.log(calcularDesconto(100, 15)); // 85
console.log(calcularDesconto(250, 10)); // 225
```

---

## 1. Function Declaration (Declaração de Função)

### Sintaxe

```javascript
function nomeDaFuncao(param1, param2) {
  // corpo da função
  return resultado;
}
```

### Características

- **Hoisted** — pode ser chamada ANTES da declaração no código
- Tem nome obrigatório
- Cria seu próprio `this`

```javascript
// ✅ Funciona — function declaration é hoisted
saudar("Felix"); // "Olá, Felix!"

function saudar(nome) {
  console.log(`Olá, ${nome}!`);
}
```

### Anatomia interna

```
function saudar(nome) {
    ↑       ↑     ↑
    │       │     └─ Parâmetro formal (recebe valor na chamada)
    │       └─────── Nome da função (identificador)
    └─────────────── Palavra-chave de declaração

  console.log(`Olá, ${nome}!`);
    ↑
    └─ Corpo da função (executa quando chamada)

  return undefined;
    ↑
    └─ Retorno implícito (se não há return explícito)
}

saudar("Felix");
   ↑      ↑
   │      └─ Argumento (valor real passado)
   └──────── Invocação / chamada da função
```

---

## 2. Function Expression (Expressão de Função)

A função é criada como parte de uma expressão e atribuída a uma variável.

```javascript
// Função anônima atribuída a uma variável
const somar = function(a, b) {
  return a + b;
};

console.log(somar(3, 4)); // 7
```

### Diferença crucial: NÃO é hoisted

```javascript
// ❌ TypeError: calcular is not a function
calcular(5);

const calcular = function(x) {
  return x * 2;
};
```

### Function expression com nome (Named Function Expression)

```javascript
const fatorial = function fat(n) {
  if (n <= 1) return 1;
  return n * fat(n - 1); // pode se chamar pelo nome internamente
};

console.log(fatorial(5)); // 120
// console.log(fat(5));    // ❌ ReferenceError — "fat" só existe dentro da função
```

> O nome é útil para **recursão** e aparece em **stack traces** de erros (debugging).

---

## 3. Function Declaration vs Expression

| Aspecto | Declaration | Expression |
|---------|------------|------------|
| Hoisting | ✅ Sim (completo) | ❌ Não |
| Nome | Obrigatório | Opcional |
| Uso antes da declaração | ✅ Funciona | ❌ TypeError |
| Pode ser condicional | ⚠️ Comportamento inconsistente | ✅ Seguro |
| `this` próprio | ✅ Sim | ✅ Sim |

### Declaração condicional — por que expression é mais segura

```javascript
// ⚠️ Comportamento NÃO garantido com declaration em blocos
if (true) {
  function foo() { return "a"; }
} else {
  function foo() { return "b"; }
}
// Resultado varia entre engines! Evite isso.

// ✅ Seguro com expression
let foo;
if (true) {
  foo = function() { return "a"; };
} else {
  foo = function() { return "b"; };
}
console.log(foo()); // "a" — previsível
```

---

## 4. IIFE — Immediately Invoked Function Expression

Função que é **definida e executada imediatamente**. Era muito usada antes do ES6 para criar escopo isolado.

### Sintaxe

```javascript
(function() {
  // código isolado — não polui o escopo global
  let privado = "só existe aqui";
  console.log(privado);
})();

// Com parâmetros
(function(nome) {
  console.log(`Olá, ${nome}!`);
})("Felix");
```

### Por que existia

```javascript
// Antes do ES6 (sem let/const/módulos), var vazava para o global
var x = 10; // poluía window.x

// IIFE criava escopo isolado
(function() {
  var x = 10; // x só existe aqui dentro
})();

// Hoje, com let/const e módulos, IIFE é raramente necessário
{
  let x = 10; // escopo de bloco — mesma proteção, mais simples
}
```

### Padrão Module (pré-ES6)

```javascript
const Contador = (function() {
  let valor = 0; // variável privada (closure)

  return {
    incrementar() { valor++; },
    decrementar() { valor--; },
    obterValor() { return valor; }
  };
})();

Contador.incrementar();
Contador.incrementar();
console.log(Contador.obterValor()); // 2
// console.log(valor);              // ❌ ReferenceError — privado!
```

---

## 5. Funções como Valores (First-Class Functions)

Em JavaScript, funções são valores como qualquer outro — podem ser manipuladas como strings, números ou objetos.

### Atribuir a variáveis

```javascript
const dobrar = function(x) { return x * 2; };
const operacao = dobrar;
console.log(operacao(5)); // 10
```

### Armazenar em arrays

```javascript
const operacoes = [
  function(x) { return x + 1; },
  function(x) { return x * 2; },
  function(x) { return x ** 2; }
];

console.log(operacoes[0](5)); // 6
console.log(operacoes[1](5)); // 10
console.log(operacoes[2](5)); // 25
```

### Armazenar em objetos (métodos)

```javascript
const calculadora = {
  somar: function(a, b) { return a + b; },
  subtrair: function(a, b) { return a - b; },
  // Shorthand (ES6):
  multiplicar(a, b) { return a * b; }
};

console.log(calculadora.somar(3, 4));       // 7
console.log(calculadora.multiplicar(3, 4)); // 12
```

### Passar como argumento (callback)

```javascript
function executar(operacao, valor) {
  return operacao(valor);
}

console.log(executar(dobrar, 5)); // 10
console.log(executar(x => x + 1, 5)); // 6
```

### Retornar de outra função

```javascript
function criarMultiplicador(fator) {
  return function(numero) {
    return numero * fator;
  };
}

const triplicar = criarMultiplicador(3);
const quintuplicar = criarMultiplicador(5);

console.log(triplicar(10));     // 30
console.log(quintuplicar(10));  // 50
```

---

## 6. Funções Construtoras (Pré-ES6)

Antes das classes, funções eram usadas como construtores com `new`.

```javascript
function Pessoa(nome, idade) {
  this.nome = nome;
  this.idade = idade;
  this.apresentar = function() {
    return `${this.nome}, ${this.idade} anos`;
  };
}

const felix = new Pessoa("Felix", 30);
console.log(felix.apresentar()); // "Felix, 30 anos"
console.log(felix instanceof Pessoa); // true
```

> **Nota:** Hoje, use `class` (Módulo 05). Funções construtoras são importantes para entender protótipos.

---

## 7. Erros Comuns

### Esquecer os parênteses na chamada

```javascript
function obterHora() {
  return new Date().toLocaleTimeString();
}

console.log(obterHora);   // [Function: obterHora] ← referência, não resultado!
console.log(obterHora()); // "14:30:45" ← chamada correta
```

### Confundir declaração com expressão no hoisting

```javascript
// Funciona (declaration é hoisted)
foo();
function foo() { console.log("ok"); }

// NÃO funciona (expression não é hoisted)
bar(); // TypeError: bar is not a function
var bar = function() { console.log("ok"); };
```

### Função sem return explícito

```javascript
function calcular(x) {
  x * 2; // calculou, mas não retornou!
}

console.log(calcular(5)); // undefined ← esqueceu o return
```

---

## Resumo

| Forma | Hoisting | Nome | Uso principal |
|-------|---------|------|--------------|
| `function nome()` | ✅ Completo | Obrigatório | Funções principais, reutilizáveis |
| `const fn = function()` | ❌ Não | Opcional | Callbacks, funções condicionais |
| `(function() {})()` | — | Opcional | IIFE — escopo isolado (legado) |
| `function Foo()` + `new` | ✅ Completo | Obrigatório | Construtores (pré-ES6) |

**Regra prática:**
- Use **function declaration** para funções nomeadas no escopo do módulo
- Use **const + arrow function** para callbacks e funções curtas (próximo arquivo)

---

> **Próximo:** [parametros-retorno.md](parametros-retorno.md) — Parâmetros, valores padrão, rest e retorno.
