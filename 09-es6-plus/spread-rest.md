# Spread e Rest (`...`)

## Definição

O operador `...` tem dois papéis dependendo do contexto:
- **Spread** (espalhar): expande um iterável em elementos individuais
- **Rest** (resto): coleta múltiplos elementos em um array/objeto

---

## 1. Spread — Espalhar

### Em Arrays

```javascript
const nums = [1, 2, 3];

// Copiar
const copia = [...nums]; // [1, 2, 3] (cópia rasa)

// Unir
const todos = [...nums, 4, 5, ...[6, 7]]; // [1, 2, 3, 4, 5, 6, 7]

// Como argumentos
console.log(Math.max(...nums)); // 3
```

### Em Objetos

```javascript
const base = { a: 1, b: 2 };

// Copiar
const copia = { ...base }; // { a: 1, b: 2 }

// Mesclar (último vence)
const merged = { ...base, b: 99, c: 3 }; // { a: 1, b: 99, c: 3 }

// Adicionar propriedade condicionalmente
const user = {
  nome: "Felix",
  ...(isAdmin && { role: "admin" })
};
```

---

## 2. Rest — Coletar

### Em Parâmetros de Função

```javascript
function somar(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}
somar(1, 2, 3, 4); // 10

function log(nivel, ...mensagens) {
  mensagens.forEach(msg => console.log(`[${nivel}] ${msg}`));
}
log("INFO", "Servidor iniciado", "Porta 3000");
```

### Em Desestruturação

```javascript
const [primeiro, ...demais] = [1, 2, 3, 4];
// primeiro = 1, demais = [2, 3, 4]

const { nome, ...props } = { nome: "Felix", idade: 30, cidade: "SP" };
// nome = "Felix", props = { idade: 30, cidade: "SP" }
```

---

## 3. Cuidado: Cópia Rasa

```javascript
const original = { a: 1, nested: { b: 2 } };
const copia = { ...original };

copia.a = 99;          // NÃO afeta original
copia.nested.b = 99;   // AFETA original! (mesma referência)

// Cópia profunda:
const deep = structuredClone(original);
```

---

> **Próximo arquivo:** [template-literals.md](template-literals.md)
