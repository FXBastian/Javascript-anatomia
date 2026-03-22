# Template Literals

## Definição

Template literals usam **crases** (`` ` ``) em vez de aspas. Suportam **interpolação**, **multilinha** e **tagged templates**.

---

## 1. Interpolação

```javascript
const nome = "Felix";
const idade = 30;

// Concatenação antiga
const msg1 = "Olá, " + nome + "! Você tem " + idade + " anos.";

// Template literal
const msg2 = `Olá, ${nome}! Você tem ${idade} anos.`;

// Expressões dentro de ${}
const msg3 = `Dobro da idade: ${idade * 2}`;
const msg4 = `Status: ${idade >= 18 ? "adulto" : "menor"}`;
```

---

## 2. Multilinha

```javascript
// Aspas — precisa de \n
const html1 = "<div>\n  <p>Texto</p>\n</div>";

// Template literal — multilinha natural
const html2 = `
<div>
  <p>Texto</p>
</div>
`;
```

---

## 3. Tagged Templates

Funções que processam template literals:

```javascript
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const val = values[i] !== undefined ? `<mark>${values[i]}</mark>` : "";
    return result + str + val;
  }, "");
}

const nome = "Felix";
const resultado = highlight`Olá, ${nome}! Bem-vindo.`;
// "Olá, <mark>Felix</mark>! Bem-vindo."
```

### Uso real: CSS-in-JS (styled-components)

```javascript
// Bibliotecas como styled-components usam tagged templates:
const Button = styled.button`
  background: ${props => props.primary ? "blue" : "gray"};
  color: white;
  padding: 8px 16px;
`;
```

---

## 4. Raw Strings

```javascript
// String.raw — ignora caracteres de escape
console.log(`Linha1\nLinha2`);       // Linha1 (quebra) Linha2
console.log(String.raw`Linha1\nLinha2`); // Linha1\nLinha2 (literal)

// Útil para regex, caminhos Windows, etc.
const path = String.raw`C:\Users\felix\docs`;
```

---

> **Próximo arquivo:** [optional-chaining.md](optional-chaining.md)
