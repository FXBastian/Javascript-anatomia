# Tipos de Dados

## Definição

Um **tipo de dado** define a natureza do valor armazenado: se é um número, um texto, um valor lógico, etc. JavaScript é uma linguagem de **tipagem dinâmica** — você não declara o tipo explicitamente; ele é determinado automaticamente pelo valor atribuído, e pode mudar ao longo do tempo.

```javascript
let x = 42;       // x é number
x = "texto";      // agora x é string — sem erro!
x = true;         // agora x é boolean
```

---

## 1. Categorias de Tipos

JavaScript divide seus tipos em duas grandes categorias:

```
                    TIPOS DE DADOS
                         │
            ┌────────────┴────────────┐
            │                         │
       PRIMITIVOS                  OBJETOS
     (imutáveis, por valor)    (mutáveis, por referência)
            │                         │
    ┌───┬───┬───┬───┬───┬───┐       ┌───┬───┬───┐
    │   │   │   │   │   │   │       │   │   │   │
  str num bool null undef sym big  Obj Arr Func ...
```

---

## 2. Tipos Primitivos (7 tipos)

Primitivos são **imutáveis** (não podem ser alterados diretamente) e são comparados **por valor**.

### 2.1. `string`

Sequência de caracteres. Pode ser definida com aspas simples, duplas ou crases (template literal).

```javascript
let nome = "Felix";            // aspas duplas
let sobrenome = 'Santos';      // aspas simples
let completo = `${nome} ${sobrenome}`; // template literal

console.log(typeof nome); // "string"
```

#### Imutabilidade de strings

```javascript
let texto = "JavaScript";
texto[0] = "j";           // NÃO altera a string
console.log(texto);        // "JavaScript" — continua igual

// Para alterar, crie uma nova string
texto = "j" + texto.slice(1);
console.log(texto);        // "javaScript"
```

#### Métodos comuns (veja mais em Módulo 12)

```javascript
"hello".toUpperCase();     // "HELLO"
"hello".includes("ell");   // true
"hello world".split(" ");  // ["hello", "world"]
"  hello  ".trim();        // "hello"
```

---

### 2.2. `number`

Representa números inteiros e decimais. Internamente, todos são **IEEE 754 de 64 bits** (ponto flutuante).

```javascript
let inteiro = 42;
let decimal = 3.14;
let negativo = -10;
let cientifico = 2.5e6;    // 2500000

console.log(typeof inteiro); // "number"
```

#### Valores especiais

```javascript
console.log(1 / 0);          // Infinity
console.log(-1 / 0);         // -Infinity
console.log("abc" * 2);      // NaN (Not a Number)
console.log(typeof NaN);     // "number" — sim, NaN é do tipo number!
```

#### Cuidado com ponto flutuante

```javascript
console.log(0.1 + 0.2);         // 0.30000000000000004 😱
console.log(0.1 + 0.2 === 0.3); // false

// Solução: comparar com margem de erro
console.log(Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON); // true
```

---

### 2.3. `boolean`

Apenas dois valores possíveis: `true` ou `false`. Base de toda lógica condicional.

```javascript
let ativo = true;
let bloqueado = false;

console.log(typeof ativo); // "boolean"
```

#### Valores truthy e falsy

JavaScript converte automaticamente valores para boolean em contextos lógicos:

```javascript
// FALSY — valores que viram false
Boolean(false);       // false
Boolean(0);           // false
Boolean(-0);          // false
Boolean("");          // false (string vazia)
Boolean(null);        // false
Boolean(undefined);   // false
Boolean(NaN);         // false

// TRUTHY — TUDO o resto é true
Boolean(1);           // true
Boolean("texto");     // true
Boolean([]);          // true  ← array vazio é truthy!
Boolean({});          // true  ← objeto vazio é truthy!
Boolean("0");         // true  ← string "0" é truthy!
Boolean("false");     // true  ← string "false" é truthy!
```

> **Cuidado:** `[]` e `{}` são **truthy**, mesmo vazios. Isso pega muita gente.

---

### 2.4. `null`

Representa a **ausência intencional** de valor. É atribuído explicitamente pelo programador.

```javascript
let usuario = null; // "não tem usuário ainda"

console.log(typeof null); // "object" — bug histórico do JavaScript!
```

#### Caso de uso real

```javascript
function buscarUsuario(id) {
  const usuarios = { 1: "Felix", 2: "Ana" };
  return usuarios[id] || null; // retorna null se não encontrar
}

let user = buscarUsuario(99);
if (user === null) {
  console.log("Usuário não encontrado");
}
```

---

### 2.5. `undefined`

Significa que uma variável **foi declarada mas não recebeu valor**, ou que algo esperado não existe.

```javascript
let x;
console.log(x);        // undefined
console.log(typeof x);  // "undefined"

// Função sem return
function nada() { }
console.log(nada());    // undefined

// Propriedade inexistente
let obj = { nome: "Felix" };
console.log(obj.idade); // undefined
```

#### `null` vs `undefined`

| Aspecto | `null` | `undefined` |
|---------|--------|-------------|
| Significado | Ausência **intencional** | Ausência **não intencional** |
| Quem atribui | O programador | A engine |
| `typeof` | `"object"` (bug) | `"undefined"` |
| Conversão numérica | `0` | `NaN` |

```javascript
console.log(null == undefined);  // true  (comparação frouxa)
console.log(null === undefined); // false (tipos diferentes)
```

---

### 2.6. `symbol` (ES6)

Cria um **identificador único e imutável**. Usado para criar propriedades que não colidem com outras.

```javascript
let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(id1 === id2);  // false — cada Symbol é ÚNICO
console.log(typeof id1);    // "symbol"
```

#### Caso de uso: propriedades ocultas em objetos

```javascript
const ID = Symbol("id");

let usuario = {
  nome: "Felix",
  [ID]: 12345  // propriedade com chave Symbol
};

console.log(usuario.nome);  // "Felix"
console.log(usuario[ID]);   // 12345

// Não aparece em for...in ou Object.keys
console.log(Object.keys(usuario)); // ["nome"]
```

---

### 2.7. `bigint` (ES2020)

Números inteiros de **precisão arbitrária**. Útil quando `number` não é suficiente para valores muito grandes.

```javascript
// number perde precisão em valores grandes
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992 😱 (mesmo valor!)

// bigint resolve isso
let grande = 9007199254740991n + 2n;
console.log(grande); // 9007199254740993n ✅

console.log(typeof grande); // "bigint"
```

#### Regras

```javascript
// Não pode misturar bigint com number
console.log(10n + 5);  // TypeError!

// Converta explicitamente
console.log(10n + BigInt(5)); // 15n
console.log(Number(10n) + 5); // 15
```

---

## 3. Tipos Estruturados (Objetos)

Tudo que **não é primitivo** é um objeto. Objetos são **mutáveis** e comparados **por referência**.

### 3.1. `object`

Coleção de pares chave-valor.

```javascript
let pessoa = {
  nome: "Felix",
  idade: 30,
  ativo: true
};

console.log(typeof pessoa); // "object"
console.log(pessoa.nome);   // "Felix"
```

### 3.2. `array`

Lista ordenada de valores (tecnicamente, um objeto especial).

```javascript
let frutas = ["maçã", "banana", "uva"];

console.log(typeof frutas);          // "object"
console.log(Array.isArray(frutas));   // true ← forma correta de verificar
console.log(frutas[0]);               // "maçã"
```

### 3.3. `function`

Funções também são objetos (com a capacidade de serem chamadas).

```javascript
function somar(a, b) {
  return a + b;
}

console.log(typeof somar); // "function" ← tipo especial
```

### 3.4. Outros objetos nativos

```javascript
let data = new Date();
let regex = /abc/gi;
let erro = new Error("algo deu errado");
let mapa = new Map();
let conjunto = new Set();

// Todos são "object" no typeof
console.log(typeof data);  // "object"
console.log(typeof regex); // "object"
```

---

## 4. O Operador `typeof`

Retorna uma string indicando o tipo do valor.

```javascript
typeof "hello"       // "string"
typeof 42            // "number"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof null          // "object"     ← BUG HISTÓRICO
typeof Symbol()      // "symbol"
typeof 42n           // "bigint"
typeof {}            // "object"
typeof []            // "object"     ← use Array.isArray()
typeof function(){}  // "function"
```

### Tabela resumo do `typeof`

| Valor | `typeof` | Observação |
|-------|----------|------------|
| `"texto"` | `"string"` | — |
| `42` | `"number"` | Inclui `NaN` e `Infinity` |
| `true` | `"boolean"` | — |
| `null` | `"object"` | Bug histórico, nunca corrigido |
| `undefined` | `"undefined"` | — |
| `Symbol()` | `"symbol"` | — |
| `42n` | `"bigint"` | — |
| `{}` | `"object"` | — |
| `[]` | `"object"` | Use `Array.isArray()` |
| `function(){}` | `"function"` | Subtipo de object |

---

## 5. Verificação Robusta de Tipos

Como `typeof` tem limitações, aqui estão formas mais confiáveis:

```javascript
// Verificar null
let x = null;
console.log(x === null); // true

// Verificar array
console.log(Array.isArray([1, 2]));   // true
console.log(Array.isArray("texto"));  // false

// Verificar NaN
console.log(Number.isNaN(NaN));       // true
console.log(Number.isNaN("texto"));   // false (diferente de isNaN global)

// Verificar tipo exato com Object.prototype.toString
Object.prototype.toString.call([]);       // "[object Array]"
Object.prototype.toString.call(null);     // "[object Null]"
Object.prototype.toString.call(/abc/);    // "[object RegExp]"
Object.prototype.toString.call(new Date); // "[object Date]"
```

---

## 6. Valor vs Referência

### Primitivos → por valor

```javascript
let a = 10;
let b = a;   // copia o VALOR
b = 20;

console.log(a); // 10 — não foi alterado
console.log(b); // 20
```

### Objetos → por referência

```javascript
let obj1 = { nome: "Felix" };
let obj2 = obj1;  // copia a REFERÊNCIA (aponta pro mesmo objeto)
obj2.nome = "Ana";

console.log(obj1.nome); // "Ana" — FOI alterado! 😱
console.log(obj2.nome); // "Ana"
```

#### Diagrama

```
PRIMITIVOS (por valor):
  a → [10]
  b → [20]    ← cópia independente

OBJETOS (por referência):
  obj1 ──┐
         ├──→ { nome: "Ana" }    ← mesmo objeto na memória
  obj2 ──┘
```

> **Aprofundamento:** Módulo 18 (Performance e Memória) detalha esse comportamento e cópia rasa/profunda.

---

## 7. Coerção de Tipos (Visão Geral)

JavaScript converte tipos automaticamente em muitas situações:

```javascript
// String + Number → String (concatenação)
console.log("5" + 3);     // "53"

// String - Number → Number (matemática)
console.log("5" - 3);     // 2

// Boolean em contexto numérico
console.log(true + 1);    // 2
console.log(false + 1);   // 1
```

> **Aprofundamento completo:** Módulo 17 (Segurança e Comportamento) cobre coerção em detalhes.

---

## Resumo

| Tipo | Categoria | `typeof` | Exemplo |
|------|-----------|----------|---------|
| `string` | Primitivo | `"string"` | `"hello"` |
| `number` | Primitivo | `"number"` | `42`, `3.14`, `NaN` |
| `boolean` | Primitivo | `"boolean"` | `true`, `false` |
| `null` | Primitivo | `"object"` ⚠️ | `null` |
| `undefined` | Primitivo | `"undefined"` | `undefined` |
| `symbol` | Primitivo | `"symbol"` | `Symbol("id")` |
| `bigint` | Primitivo | `"bigint"` | `42n` |
| `object` | Objeto | `"object"` | `{ }`, `[ ]`, `new Date()` |
| `function` | Objeto | `"function"` | `function() {}` |

**Regra de ouro:** Primitivos são **por valor e imutáveis**. Objetos são **por referência e mutáveis**.

---

> **Próximo:** [variaveis.md](variaveis.md) — Como declarar e armazenar valores com var, let e const.
