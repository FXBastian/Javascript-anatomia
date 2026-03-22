# Hoisting

## Definição

**Hoisting** (içamento) é o comportamento do JavaScript de **mover declarações para o topo** do seu escopo durante a **fase de criação** do Execution Context — antes de qualquer código ser executado.

> ⚠️ **Importante:** o código **não** é fisicamente movido. O que acontece é que na fase de criação, o motor **aloca memória** para variáveis e funções antes da execução. O efeito prático é como se as declarações "subissem" para o topo.

---

## 1. Hoisting de `var`

Variáveis declaradas com `var` são hoisted com o valor `undefined`.

```javascript
console.log(nome); // undefined (NÃO é erro!)
var nome = "Felix";
console.log(nome); // "Felix"
```

**O motor "enxerga" assim internamente:**

```javascript
// FASE DE CRIAÇÃO: var nome → undefined
var nome;              // declaração é hoisted
console.log(nome);     // undefined
nome = "Felix";        // atribuição permanece no lugar
console.log(nome);     // "Felix"
```

### Hoisting de `var` em funções

```javascript
function exemplo() {
  console.log(x); // undefined (hoisted dentro da função)
  var x = 10;
  console.log(x); // 10
}
exemplo();

console.log(x); // ReferenceError — var tem escopo de FUNÇÃO, não de bloco
```

### Armadilha clássica com `var` em loops

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Saída: 3, 3, 3 (e não 0, 1, 2!)

// Por quê?
// var i tem escopo de FUNÇÃO (ou global), não de bloco
// Quando os callbacks executam, o loop já acabou e i === 3
// Todos os callbacks referenciam a MESMA variável i

// ✅ Solução 1: usar let (escopo de bloco)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Saída: 0, 1, 2

// ✅ Solução 2: IIFE (padrão antigo)
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
// Saída: 0, 1, 2
```

---

## 2. Hoisting de `let` e `const` — A Temporal Dead Zone (TDZ)

`let` e `const` **também são hoisted**, mas ficam em um estado chamado **Temporal Dead Zone** — acessá-las antes da declaração causa erro.

```javascript
// ─── INÍCIO DA TDZ para "idade" ───
console.log(idade); // ReferenceError: Cannot access 'idade' before initialization
// ─── FIM DA TDZ ───
let idade = 25;
console.log(idade); // 25
```

### Por que a TDZ existe?

Para prevenir bugs. O comportamento de `var` (retornar `undefined` antes da declaração) causa bugs silenciosos. A TDZ transforma esse problema em um erro explícito.

### Visualização da TDZ

```javascript
{
  // ┌─── TDZ de x começa aqui (início do bloco)
  // │
  // │    console.log(x); // ReferenceError!
  // │
  // └─── TDZ de x termina aqui ───────────────
  let x = 42; // ← a partir daqui, x está disponível
  console.log(x); // 42
}
```

### TDZ é temporal, não espacial

```javascript
function check() {
  // Essa função referencia x, mas NÃO executa ainda
  return typeof x; // x ainda está na TDZ quando a função é DEFINIDA
}

let x = 42; // x é inicializada

// Se check() for chamada DEPOIS da inicialização de x:
console.log(check()); // "number" ✓

// A TDZ depende do MOMENTO da execução, não da posição no código
```

### TDZ com `const`

```javascript
console.log(PI); // ReferenceError
const PI = 3.14;

// const tem um requisito adicional: DEVE ser inicializado na declaração
const VAZIO; // SyntaxError: Missing initializer in const declaration
```

---

## 3. Hoisting de Function Declarations

Function declarations são hoisted **por completo** — tanto o nome quanto o corpo da função.

```javascript
// ✅ Funciona! A função inteira é hoisted
saudacao("Felix"); // "Olá, Felix!"

function saudacao(nome) {
  return `Olá, ${nome}!`;
}
```

```
FASE DE CRIAÇÃO:
┌────────────────────────────────────┐
│ saudacao → function(nome) {       │  ← hoisted por completo
│              return `Olá, ${nome}` │
│            }                       │
└────────────────────────────────────┘

FASE DE EXECUÇÃO:
Linha 1: saudacao("Felix") → "Olá, Felix!" ✓  (função já existe)
```

### Function Expressions NÃO são hoisted como funções

```javascript
// ❌ TypeError: somar is not a function
somar(2, 3);

var somar = function(a, b) {
  return a + b;
};
```

**Por quê?** A variável `somar` é hoisted (é `var`), mas recebe `undefined`. A função só é atribuída na fase de execução.

```
FASE DE CRIAÇÃO:
  somar → undefined    (apenas o var é hoisted)

FASE DE EXECUÇÃO:
  somar(2, 3)  →  undefined(2, 3)  →  TypeError!
  somar = function(a, b) { ... }   ←  atribuição seria aqui
```

### Com `let`/`const` — ainda pior

```javascript
somar(2, 3); // ReferenceError (TDZ!)

const somar = function(a, b) {
  return a + b;
};
```

---

## 4. Hoisting de Arrow Functions

Arrow functions seguem a mesma regra da variável que as contém:

```javascript
// ❌ Não funciona
dobrar(5);

var dobrar = (n) => n * 2;
// TypeError: dobrar is not a function (var é undefined)

// ❌ Não funciona
triplicar(5);

const triplicar = (n) => n * 3;
// ReferenceError: Cannot access 'triplicar' before initialization (TDZ)
```

---

## 5. Hoisting de Classes

Classes são hoisted mas ficam na **TDZ**, assim como `let`/`const`.

```javascript
// ❌ ReferenceError
const p = new Pessoa("Felix");

class Pessoa {
  constructor(nome) {
    this.nome = nome;
  }
}
```

```javascript
// ❌ Class expressions — mesma regra da variável
const p = new Animal("Rex");

var Animal = class {
  constructor(nome) {
    this.nome = nome;
  }
};
// TypeError: Animal is not a constructor (var → undefined)
```

---

## 6. Precedência no Hoisting

Quando há conflito, **function declarations vencem `var`**:

```javascript
console.log(typeof foo); // "function"

var foo = "texto";

function foo() {
  return "sou função";
}

console.log(typeof foo); // "string"
```

**Internamente na fase de criação:**

```
1. var foo → undefined
2. function foo → function() { return "sou função" }  ← sobrescreve var

Fase de execução:
  typeof foo → "function" (porque function declaration venceu)
  foo = "texto"            ← agora foo é reassigned para string
  typeof foo → "string"
```

---

## 7. Tabela Comparativa de Hoisting

| Declaração | Hoisted? | Valor antes da declaração | Escopo |
|------------|----------|--------------------------|--------|
| `var x = 1` | ✅ Sim | `undefined` | Função |
| `let x = 1` | ✅ Sim (TDZ) | `ReferenceError` | Bloco |
| `const x = 1` | ✅ Sim (TDZ) | `ReferenceError` | Bloco |
| `function f(){}` | ✅ Completo | Função inteira disponível | Função |
| `var f = function(){}` | ✅ Parcial | `undefined` (TypeError ao chamar) | Função |
| `const f = () => {}` | ✅ Sim (TDZ) | `ReferenceError` | Bloco |
| `class C {}` | ✅ Sim (TDZ) | `ReferenceError` | Bloco |

---

## 8. Boas Práticas

```javascript
// ✅ Declare variáveis no topo do escopo
function processar(dados) {
  const resultado = [];
  const limite = 100;

  // ... lógica usando resultado e limite
}

// ✅ Use const por padrão, let quando precisar reatribuir
const BASE_URL = "https://api.exemplo.com";
let contador = 0;

// ✅ Declare funções antes de usá-las (mesmo que function declarations sejam hoisted)
function calcularDesconto(preco, porcentagem) {
  return preco * (1 - porcentagem / 100);
}

const precoFinal = calcularDesconto(100, 15);

// ❌ Evite var — comportamento de hoisting confuso
// ❌ Evite depender do hoisting de function declarations
// ❌ Nunca declare funções dentro de blocos if/else com function declaration
```

### Nunca declare funções em blocos condicionais

```javascript
// ❌ Comportamento IMPREVISÍVEL (varia entre engines!)
if (true) {
  function teste() { return "a"; }
} else {
  function teste() { return "b"; }
}
// Em strict mode causa erro. Em sloppy mode, comportamento varia.

// ✅ Use function expressions
let teste;
if (true) {
  teste = function() { return "a"; };
} else {
  teste = function() { return "b"; };
}
```

---

## 9. Erros Comuns

### Usar variável antes da declaração sem perceber

```javascript
function exibirNome() {
  // ❌ Bug sutil: nome aqui é a var local (undefined), não o parâmetro externo
  console.log(nome); // undefined

  if (true) {
    var nome = "Felix"; // var tem escopo de função, não de bloco!
  }
}
```

### Confundir hoisting com "mover código"

```javascript
// O código NÃO é movido. É só alocação de memória na fase de criação.
// A atribuição SEMPRE acontece na posição original.
var x = 1;
var x = 2; // Redeclaração com var é permitida (mas evite!)
console.log(x); // 2

let y = 1;
let y = 2; // SyntaxError: Identifier 'y' has already been declared
```

---

## 10. Resumo Mental

```
REGRA DE OURO:
  "Declarações sobem. Atribuições ficam."

var   → sobe como undefined    → sem proteção (bugs silenciosos)
let   → sobe para a TDZ        → protegido (erro se acessar antes)
const → sobe para a TDZ        → protegido + precisa inicializar
function → sobe POR COMPLETO   → pode chamar antes da declaração
class → sobe para a TDZ        → protegido

MELHOR PRÁTICA:
  Use const/let + declare antes de usar = hoisting nunca será problema.
```

---

> **Próximo arquivo:** [escopo.md](escopo.md) — Como o JavaScript decide quais variáveis são visíveis em cada parte do código.
