# Desafios — ES6+

## Desafio 1: Destructuring Profundo

Extraia todas as informacoes em uma unica linha de destructuring:

```javascript
const resposta = {
  data: {
    usuarios: [
      { id: 1, nome: "Ana", contato: { email: "ana@test.com", fones: ["11-1111"] } },
      { id: 2, nome: "Bia", contato: { email: "bia@test.com", fones: ["22-2222", "33-3333"] } }
    ],
    meta: { total: 2, pagina: 1 }
  },
  status: 200
};

// Extraia em uma unica declaracao:
// - nome do primeiro usuario
// - email do segundo usuario
// - primeiro telefone do segundo usuario
// - total da meta
// - status
```

---

## Desafio 2: Spread vs Clone Raso

Explique por que isso falha e como resolver:

```javascript
const original = { a: 1, b: { c: 2 } };
const copia = { ...original };
copia.b.c = 99;
console.log(original.b.c); // 99! Por que?
```

---

## Desafio 3: Rest em Tudo

Use rest operator em todos estes contextos:

```javascript
// 1. Funcao que aceita infinitos argumentos
// 2. Destructuring de array pegando o resto
// 3. Destructuring de objeto removendo propriedades
// 4. Clonar e estender objeto
```

---

## Desafio 4: Tagged Template Literals

Crie um tagged template que sanitiza HTML:

```javascript
function html(strings, ...valores) {
  // Escape caracteres perigosos nos valores interpolados
  // < > & " ' devem virar &lt; &gt; &amp; &quot; &#39;
}

const nome = '<script>alert("xss")</script>';
console.log(html`<p>Ola, ${nome}!</p>`);
// <p>Ola, &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;!</p>
```

---

## Desafio 5: Nullish Coalescing vs OR

Explique a diferenca e de exemplos onde `??` e essencial:

```javascript
const a = 0 || "padrao";    // ?
const b = 0 ?? "padrao";    // ?
const c = "" || "padrao";   // ?
const d = "" ?? "padrao";   // ?
const e = false || "padrao"; // ?
const f = false ?? "padrao"; // ?
```
