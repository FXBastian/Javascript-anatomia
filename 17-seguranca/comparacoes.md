# Comparações

## 1. == (Igualdade Abstrata / Loose)

Converte tipos antes de comparar (coerção implícita):

```javascript
0 == "";          // true   (ambos viram 0)
0 == false;       // true   (false → 0)
"" == false;      // true   (ambos viram 0)
null == undefined;// true   (caso especial da spec)
null == 0;        // false  (null só é == a undefined)
NaN == NaN;       // false  (NaN nunca é igual a nada)

1 == "1";         // true   ("1" → 1)
true == "1";      // true   (true → 1, "1" → 1)
[] == false;      // true   ⚠️ ([] → "" → 0, false → 0)
[] == ![];        // true   ⚠️
```

### Tabela de Conversão do ==

| A \ B       | Number  | String  | Boolean | null      | undefined |
|:-----------:|:-------:|:-------:|:-------:|:---------:|:---------:|
| Number      | —       | B→Num   | B→Num   | false     | false     |
| String      | A→Num   | —       | B→Num   | false     | false     |
| Boolean     | A→Num   | A→Num   | —       | false     | false     |
| null        | false   | false   | false   | **true**  | **true**  |
| undefined   | false   | false   | false   | **true**  | **true**  |

---

## 2. === (Igualdade Estrita / Strict)

Compara **sem coerção** — tipo E valor devem ser iguais:

```javascript
0 === "";          // false (tipos diferentes)
0 === false;       // false
1 === "1";         // false
null === undefined;// false
NaN === NaN;       // false ⚠️ (caso especial)
```

---

## 3. Object.is() — A Mais Precisa

Igual a `===`, exceto dois casos:

```javascript
// === falha nestes casos:
NaN === NaN;       // false
-0 === +0;         // true

// Object.is() corrige:
Object.is(NaN, NaN); // true  ✅
Object.is(-0, +0);   // false ✅
Object.is(1, 1);     // true  (mesmo que ===)
Object.is("a", "b"); // false (mesmo que ===)
```

---

## 4. Comparação de Objetos

Objetos são comparados por **referência**, não por conteúdo:

```javascript
const a = { x: 1 };
const b = { x: 1 };
const c = a;

a === b; // false (referências diferentes)
a === c; // true  (mesma referência)
a == b;  // false (== também compara referência para objetos)

// Arrays idem
[1, 2] === [1, 2]; // false
```

### Comparação profunda

```javascript
// Comparar conteúdo de objetos simples
JSON.stringify(a) === JSON.stringify(b); // true
// ⚠️ Ordem das chaves importa, não funciona com undefined, funções, etc.

// Para comparação robusta, use structuredClone ou bibliotecas
```

---

## 5. Comparações Relacionais (<, >, <=, >=)

```javascript
// Números — funciona como esperado
5 > 3;     // true
5 >= 5;    // true

// Strings — comparação lexicográfica (Unicode)
"banana" > "abacaxi"; // true  (compara char a char)
"B" < "a";             // true  (maiúsculas têm código menor)

// Misturados — converte para Number
"10" > 9;   // true  ("10" → 10)
"abc" > 0;  // false ("abc" → NaN, qualquer comparação com NaN é false)
null > 0;   // false (null → 0, 0 > 0 é false)
null >= 0;  // true  ⚠️ (null → 0, 0 >= 0 é true)
null == 0;  // false ⚠️ (== tem regra especial para null)
```

---

## 6. Verificações Seguras

```javascript
// Verificar null ou undefined
if (valor == null) { }         // captura null E undefined (único uso aceitável de ==)
if (valor === null || valor === undefined) { } // equivalente explícito

// Verificar NaN
Number.isNaN(valor);           // ✅
isNaN(valor);                  // ❌ converte antes (isNaN("abc") === true)

// Verificar tipo
typeof valor === "string";     // tipo primitivo
valor instanceof MinhaClasse;  // instância de classe
Array.isArray(valor);          // é array?

// Verificar existência de propriedade
"chave" in objeto;             // chave existe (inclusive herdada)
objeto.hasOwnProperty("chave"); // chave própria (não herdada)
Object.hasOwn(objeto, "chave"); // ✅ ES2022 — preferido
```

---

## Resumo: Quando Usar Cada Um

| Operador       | Quando usar                         |
|:--------------:|:-----------------------------------:|
| `===`          | **Sempre** — regra padrão           |
| `==`           | Apenas `valor == null` (null check) |
| `Object.is()`  | Quando precisa diferenciar NaN e ±0 |
| `typeof`       | Verificar tipo primitivo            |
| `instanceof`   | Verificar instância                 |

---

> **Próximo módulo:** [18-performance](../18-performance/README.md)
