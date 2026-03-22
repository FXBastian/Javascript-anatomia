# Coerções de Tipo

## 1. O que é Coerção?

JavaScript converte tipos **automaticamente** (implícita) quando operações envolvem tipos diferentes.

```javascript
// Implícita — o motor converte por você
"5" + 3;    // "53"  (number → string, concatenação)
"5" - 3;    // 2     (string → number, subtração)
true + 1;   // 2     (boolean → number)

// Explícita — você converte intencionalmente
Number("5") + 3; // 8
String(42);       // "42"
Boolean(0);       // false
```

---

## 2. Coerção para String

```javascript
// Implícita
"valor: " + 42;      // "valor: 42"
"valor: " + true;    // "valor: true"
"valor: " + null;    // "valor: null"
`total: ${100}`;     // "total: 100"

// Explícita
String(42);           // "42"
String(null);         // "null"
String(undefined);    // "undefined"
(42).toString();      // "42"
```

---

## 3. Coerção para Number

```javascript
// Implícita (operadores matemáticos exceto +)
"6" - 2;       // 4
"6" * "3";     // 18
"abc" - 1;     // NaN
true - false;  // 1
null + 5;      // 5  (null → 0)
undefined + 5; // NaN (undefined → NaN)

// + unário — converte para number
+"42";          // 42
+true;          // 1
+false;         // 0
+null;          // 0
+undefined;     // NaN
+"";            // 0
+"abc";         // NaN

// Explícita
Number("42");     // 42
Number("");       // 0
Number("42abc");  // NaN
parseInt("42px"); // 42

// Cuidado com parseInt
parseInt("08");     // 8
parseInt("0xFF", 16); // 255
parseInt("abc");    // NaN
parseFloat("3.14"); // 3.14
```

---

## 4. Coerção para Boolean (Truthy / Falsy)

### Valores Falsy (convertem para `false`)

```javascript
Boolean(false);     // false
Boolean(0);         // false
Boolean(-0);        // false
Boolean(0n);        // false (BigInt zero)
Boolean("");        // false (string vazia)
Boolean(null);      // false
Boolean(undefined); // false
Boolean(NaN);       // false
```

### Tudo o resto é Truthy

```javascript
Boolean("0");       // true  ⚠️ string com "0" é truthy!
Boolean(" ");       // true  ⚠️ string com espaço é truthy!
Boolean([]);        // true  ⚠️ array vazio é truthy!
Boolean({});        // true  ⚠️ objeto vazio é truthy!
Boolean(42);        // true
Boolean("false");   // true  ⚠️ string "false" é truthy!
```

### Onde a coerção booleana acontece

```javascript
// if / else
if ("texto") { /* executa — truthy */ }

// Operador lógico
"" || "fallback";     // "fallback" (|| retorna primeiro truthy)
"valor" && "outro";   // "outro"   (&& retorna último se todos truthy)

// Operador ternário
0 ? "sim" : "não";   // "não"

// Negação
!0;     // true
!!"hi"; // true (double bang — converte para boolean)
```

---

## 5. O Operador + (A Grande Armadilha)

O `+` é o único operador que **concatena strings** e **soma números**:

```javascript
// Se UM lado for string → concatenação
1 + "2";        // "12"
"1" + 2;        // "12"
1 + 2 + "3";    // "33"  (avalia da esquerda: 3 + "3")
"1" + 2 + 3;    // "123" (avalia da esquerda: "12" + 3)

// Se nenhum lado for string → soma numérica
true + true;    // 2
null + 1;       // 1
[] + [];         // ""     ⚠️
[] + {};         // "[object Object]"
{} + [];         // 0 ou "[object Object]" (depende do contexto)
```

---

## 6. Strict Mode para Segurança

```javascript
"use strict";

// Strict mode NÃO elimina coerções,
// mas previne outros erros silenciosos:

// ❌ Variáveis não declaradas
// x = 10; // ReferenceError

// ❌ Deletar variáveis
// delete x; // SyntaxError

// ❌ Parâmetros duplicados
// function f(a, a) {} // SyntaxError

// ❌ Octais com prefixo 0
// const n = 010; // SyntaxError
```

---

## Regra de Ouro

> Nunca dependa de coerção implícita em comparações.  
> Use **conversão explícita** e **===** para código previsível.

```javascript
// ❌ Perigoso
if (valor) { }        // 0, "", null — tudo é falsy

// ✅ Explícito
if (valor !== null && valor !== undefined) { }
if (typeof valor === "string" && valor.length > 0) { }
```

---

> **Próximo arquivo:** [comparacoes.md](comparacoes.md)
