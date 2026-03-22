# String — Métodos Nativos

## Conceitos Essenciais

Strings em JavaScript são **imutáveis** — todo método retorna uma **nova string** sem alterar a original.

---

## 1. Busca

```javascript
const str = "JavaScript é incrível";

str.includes("Script");      // true
str.startsWith("Java");      // true
str.endsWith("ível");        // true

str.indexOf("é");            // 11 (posição)
str.indexOf("xyz");          // -1 (não encontrou)
str.lastIndexOf("i");        // 18

str.search(/incr[ií]vel/i);  // 14 (aceita regex)
```

## 2. Extração

```javascript
const str = "JavaScript";

str.slice(0, 4);    // "Java"
str.slice(4);       // "Script"
str.slice(-6);      // "Script" (últimos 6)

str.substring(0, 4); // "Java" (similar ao slice, sem negativos)
str.charAt(0);       // "J"
str.at(-1);          // "t" (ES2022)
```

## 3. Transformação

```javascript
const str = "  Hello World  ";

str.trim();        // "Hello World"
str.trimStart();   // "Hello World  "
str.trimEnd();     // "  Hello World"

str.toUpperCase(); // "  HELLO WORLD  "
str.toLowerCase(); // "  hello world  "

"abc".repeat(3);   // "abcabcabc"
"abc".padStart(6, "0"); // "000abc"
"abc".padEnd(6, "."); // "abc..."

"hello".replace("l", "L");    // "heLlo" (primeira)
"hello".replaceAll("l", "L"); // "heLLo" (todas)
```

## 4. Divisão e Junção

```javascript
"a,b,c".split(",");     // ["a", "b", "c"]
"hello".split("");       // ["h", "e", "l", "l", "o"]

["a", "b", "c"].join("-"); // "a-b-c"
```

## 5. Regex Básico

```javascript
const email = "user@email.com";
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(regex.test(email)); // true

const texto = "Hoje é 22/03/2026 e amanhã 23/03/2026";
const datas = texto.match(/\d{2}\/\d{2}\/\d{4}/g);
console.log(datas); // ["22/03/2026", "23/03/2026"]

// matchAll — retorna iterador com grupos de captura
const matches = texto.matchAll(/(\d{2})\/(\d{2})\/(\d{4})/g);
for (const m of matches) {
  console.log(`Dia: ${m[1]}, Mês: ${m[2]}, Ano: ${m[3]}`);
}
```

---

> **Próximo arquivo:** [number.md](number.md)
