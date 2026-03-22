# Variáveis — `var`, `let` e `const`

## Definição

Uma **variável** é um espaço nomeado na memória que armazena um valor. Em JavaScript, existem três palavras-chave para declarar variáveis: `var` (legado), `let` (moderno) e `const` (constante).

```javascript
var antigo = "ES5";        // function-scoped, com hoisting
let moderno = "ES6";       // block-scoped, com TDZ
const fixo = "imutável";   // block-scoped, não pode ser reatribuído
```

---

## 1. `var` — A Forma Legada

### Comportamento

- **Escopo**: function-scoped (ou global se fora de funções)
- **Hoisting**: a declaração é içada, mas **não a atribuição**
- **Redeclaração**: permitida (perigoso)
- **Reatribuição**: permitida

```javascript
var nome = "Felix";
var nome = "Ana";    // ✅ Redeclaração permitida (perigoso!)
nome = "Carlos";     // ✅ Reatribuição permitida
```

### Escopo de `var` — NÃO respeita blocos

```javascript
if (true) {
  var x = 10;
}
console.log(x); // 10 — x vazou do bloco! 😱

for (var i = 0; i < 3; i++) {
  // ...
}
console.log(i); // 3 — i existe fora do for!
```

### Hoisting de `var`

A **declaração** é movida para o topo, mas a **atribuição** fica no lugar.

```javascript
console.log(cidade); // undefined (não dá erro!)
var cidade = "São Paulo";
console.log(cidade); // "São Paulo"

// O que a engine vê internamente:
// var cidade;           ← declaração içada
// console.log(cidade);  ← undefined
// cidade = "São Paulo"; ← atribuição no lugar original
// console.log(cidade);  ← "São Paulo"
```

### Problema clássico: `var` no loop com closure

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
// Saída: 3, 3, 3 (não 0, 1, 2!)
// Motivo: var é function-scoped; quando os callbacks executam, i já é 3
```

---

## 2. `let` — A Forma Moderna

### Comportamento

- **Escopo**: block-scoped `{ }`
- **Hoisting**: é içado, mas fica na **TDZ** (Temporal Dead Zone) até a declaração
- **Redeclaração**: **NÃO** permitida no mesmo escopo
- **Reatribuição**: permitida

```javascript
let nome = "Felix";
// let nome = "Ana";  // ❌ SyntaxError: Identifier 'nome' has already been declared
nome = "Ana";          // ✅ Reatribuição OK
```

### Escopo de bloco

```javascript
if (true) {
  let x = 10;
  console.log(x); // 10
}
console.log(x); // ReferenceError: x is not defined ✅
```

### TDZ (Temporal Dead Zone)

O `let` é içado (hoisted), mas **não pode ser acessado** antes da linha de declaração:

```javascript
// console.log(nome); // ❌ ReferenceError (está na TDZ)
let nome = "Felix";
console.log(nome);     // ✅ "Felix"
```

```
Início do escopo ──────┐
                       │  ← TDZ (Temporal Dead Zone)
                       │     Variável existe mas não pode ser usada
let nome = "Felix"; ───┘  ← TDZ termina aqui
                          ← Agora pode ser usada
```

### Solução do problema do loop

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
// Saída: 0, 1, 2 ✅
// Motivo: let cria um novo escopo para cada iteração
```

---

## 3. `const` — Constante de Binding

### Comportamento

- **Escopo**: block-scoped `{ }`
- **Hoisting**: igual ao `let` (TDZ)
- **Redeclaração**: **NÃO** permitida
- **Reatribuição**: **NÃO** permitida
- **Deve ser inicializada** na declaração

```javascript
const PI = 3.14159;
// PI = 3.14;  // ❌ TypeError: Assignment to constant variable
// const X;    // ❌ SyntaxError: Missing initializer in const declaration
```

### ATENÇÃO: `const` NÃO significa imutável

`const` impede a **reatribuição do binding** (a variável não pode apontar para outro valor), mas **não impede a mutação do conteúdo** de objetos e arrays.

```javascript
const usuario = { nome: "Felix", idade: 30 };

// ❌ Reatribuir o binding
// usuario = { nome: "Ana" }; // TypeError

// ✅ Mutar o conteúdo — PERMITIDO!
usuario.nome = "Ana";
usuario.email = "ana@email.com";
console.log(usuario); // { nome: "Ana", idade: 30, email: "ana@email.com" }
```

```javascript
const frutas = ["maçã", "banana"];

// ❌ Reatribuir
// frutas = ["uva"]; // TypeError

// ✅ Mutar — PERMITIDO!
frutas.push("uva");
console.log(frutas); // ["maçã", "banana", "uva"]
```

#### Diagrama: o que `const` realmente protege

```
const usuario = { nome: "Felix" };

usuario ───────→ { nome: "Felix" }
   │                    ↑
   │ BLOQUEADO:         │ PERMITIDO:
   │ reatribuir         │ alterar propriedades
   │ o ponteiro         │ do objeto
   ▼                    │
  ✖ usuario = outro     ✔ usuario.nome = "Ana"
```

### Para tornar um objeto realmente imutável

```javascript
const config = Object.freeze({
  api: "https://api.exemplo.com",
  timeout: 5000
});

config.api = "https://outra.com"; // silenciosamente ignorado (ou erro em strict mode)
console.log(config.api); // "https://api.exemplo.com"
```

> **Nota:** `Object.freeze` é **raso** (shallow). Objetos aninhados continuam mutáveis.

---

## 4. Comparação Completa

| Característica | `var` | `let` | `const` |
|---------------|-------|-------|---------|
| Escopo | Function | Block | Block |
| Hoisting | Sim (valor = `undefined`) | Sim (TDZ) | Sim (TDZ) |
| Redeclaração | ✅ Sim | ❌ Não | ❌ Não |
| Reatribuição | ✅ Sim | ✅ Sim | ❌ Não |
| Inicialização obrigatória | Não | Não | **Sim** |
| Uso recomendado | ❌ Evitar | Para valores que mudam | **Padrão** |

---

## 5. Boas Práticas

### Regra geral (padrão da indústria)

```
1. Use CONST por padrão
2. Use LET quando precisar reatribuir
3. NUNCA use VAR
```

### Exemplos práticos

```javascript
// ✅ const para valores que não serão reatribuídos
const MAX_TENTATIVAS = 3;
const usuario = { nome: "Felix" };
const itens = [1, 2, 3];
const calcular = (a, b) => a + b;

// ✅ let para contadores, acumuladores, flags
let contador = 0;
let total = 0;
let encontrado = false;

for (let i = 0; i < 10; i++) {
  total += i;
  if (i === 5) encontrado = true;
}

// ❌ var — nunca use em código novo
// var resultado = "antigo";
```

---

## 6. Escopo em Profundidade

### Escopo global

```javascript
// Variáveis declaradas fora de qualquer função ou bloco
var globalVar = "global com var";
let globalLet = "global com let";
const globalConst = "global com const";

// var no escopo global se torna propriedade de window (no navegador)
console.log(window.globalVar);   // "global com var"
console.log(window.globalLet);   // undefined ← let NÃO vira propriedade de window
console.log(window.globalConst); // undefined ← const também não
```

### Escopo de função

```javascript
function exemplo() {
  var a = 1;   // acessível em toda a função
  let b = 2;   // acessível em toda a função (mas respeita blocos internos)
  const c = 3; // acessível em toda a função (mas respeita blocos internos)

  if (true) {
    var d = 4;   // acessível em toda a função (var ignora bloco)
    let e = 5;   // acessível APENAS neste bloco
    const f = 6; // acessível APENAS neste bloco
  }

  console.log(a); // 1
  console.log(b); // 2
  console.log(c); // 3
  console.log(d); // 4 ← var vazou do bloco
  // console.log(e); // ReferenceError
  // console.log(f); // ReferenceError
}
```

### Escopo de bloco

```javascript
{
  let x = "dentro";
  const y = "dentro";
  var z = "dentro";
}

// console.log(x); // ReferenceError
// console.log(y); // ReferenceError
console.log(z);     // "dentro" ← var ignora blocos!
```

---

## 7. Declaração sem Palavra-chave (Erro Grave)

```javascript
// ❌ NUNCA faça isso
function perigosa() {
  vazamento = "variável global acidental"; // sem var/let/const
}
perigosa();
console.log(vazamento); // "variável global acidental" 😱

// Em strict mode, isso gera erro:
"use strict";
function segura() {
  vazamento = "erro"; // ReferenceError: vazamento is not defined ✅
}
```

---

## 8. Múltiplas Declarações

```javascript
// Declaração múltipla em uma linha (válido, mas evite)
let a = 1, b = 2, c = 3;

// Preferível: uma declaração por linha (mais legível)
let x = 10;
let y = 20;
let z = 30;

// Desestruturação — forma moderna de declarar múltiplas variáveis
const { nome, idade } = { nome: "Felix", idade: 30 };
const [primeiro, segundo] = [1, 2];
```

---

## 9. Erros Comuns

### Usar variável antes de declarar

```javascript
console.log(a); // undefined (var — hoisting)
var a = 10;

console.log(b); // ReferenceError (let — TDZ)
let b = 20;
```

### Esquecer de declarar

```javascript
function calcular() {
  resultado = 42; // cria variável global acidental!
  return resultado;
}
```

### Tentar reatribuir `const`

```javascript
const nome = "Felix";
nome = "Ana"; // TypeError: Assignment to constant variable
```

### Confundir `const` com imutabilidade

```javascript
const lista = [1, 2, 3];
lista.push(4);         // funciona! const protege o binding, não o conteúdo
console.log(lista);    // [1, 2, 3, 4]
```

---

## Resumo Visual

```
┌──────────────────────────────────────────────────┐
│                   DECLARAÇÃO                      │
│                                                   │
│   var nome = "Felix";     ← Legado. Evite.       │
│   let nome = "Felix";     ← Quando muda.         │
│   const nome = "Felix";   ← PADRÃO. Use sempre.  │
│                                                   │
├──────────────────────────────────────────────────┤
│                    ESCOPO                          │
│                                                   │
│   var   → function-scoped (vaza de blocos)       │
│   let   → block-scoped { }                       │
│   const → block-scoped { }                       │
│                                                   │
├──────────────────────────────────────────────────┤
│                   HOISTING                         │
│                                                   │
│   var   → içado como undefined                   │
│   let   → içado, mas TDZ até a declaração        │
│   const → içado, mas TDZ até a declaração        │
│                                                   │
└──────────────────────────────────────────────────┘
```

---

> **Próximo:** [operadores.md](operadores.md) — Todos os operadores do JavaScript e como eles funcionam.
