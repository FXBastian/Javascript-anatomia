# JSON

## Definição

**JSON** (JavaScript Object Notation) é o formato padrão para troca de dados na web. JavaScript tem dois métodos nativos: `JSON.stringify()` (objeto → string) e `JSON.parse()` (string → objeto).

---

## 1. `JSON.stringify()` — Serializar

```javascript
const usuario = { nome: "Felix", idade: 30, ativo: true };
const json = JSON.stringify(usuario);
console.log(json); // '{"nome":"Felix","idade":30,"ativo":true}'

// Com indentação (legível)
console.log(JSON.stringify(usuario, null, 2));
// {
//   "nome": "Felix",
//   "idade": 30,
//   "ativo": true
// }
```

### Replacer — filtrar propriedades

```javascript
// Array de chaves
JSON.stringify(usuario, ["nome", "ativo"]);
// '{"nome":"Felix","ativo":true}'

// Função transformadora
JSON.stringify(usuario, (key, value) => {
  if (key === "idade") return undefined; // remove
  return value;
});
```

### O que NÃO é serializado

```javascript
JSON.stringify({
  fn: function() {},  // ❌ ignorado
  sym: Symbol("x"),   // ❌ ignorado
  undef: undefined,   // ❌ ignorado
  nan: NaN,           // ⚠️ vira null
  inf: Infinity,      // ⚠️ vira null
  date: new Date(),   // ⚠️ vira string ISO
  regex: /abc/,       // ⚠️ vira {}
});
```

### `toJSON()` — personalizar serialização

```javascript
class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
    this._interno = "privado";
  }

  toJSON() {
    return { nome: this.nome, preco: this.preco };
    // _interno é omitido
  }
}

JSON.stringify(new Produto("Mouse", 80));
// '{"nome":"Mouse","preco":80}'
```

---

## 2. `JSON.parse()` — Desserializar

```javascript
const json = '{"nome":"Felix","idade":30}';
const obj = JSON.parse(json);
console.log(obj.nome); // "Felix"
```

### Reviver — transformar ao parsear

```javascript
const json = '{"nome":"Felix","nascimento":"1996-05-15T00:00:00.000Z"}';

const obj = JSON.parse(json, (key, value) => {
  // Converter strings ISO de volta em Date
  if (key === "nascimento") return new Date(value);
  return value;
});

console.log(obj.nascimento instanceof Date); // true
```

### Segurança

```javascript
// ❌ NUNCA use eval() para parsear JSON
// eval('(' + jsonString + ')'); // vulnerável a injeção de código!

// ✅ Sempre use JSON.parse()
try {
  const dados = JSON.parse(inputDoUsuario);
} catch (erro) {
  console.error("JSON inválido:", erro.message);
}
```

---

## 3. Cópia Profunda (Deep Clone)

```javascript
// JSON como deep clone (limitado)
const copia = JSON.parse(JSON.stringify(original));
// ❌ Perde: funções, Dates, undefined, RegExp, Map, Set, referências circulares

// ✅ Melhor: structuredClone (moderno)
const copia = structuredClone(original);
```

---

> **Próximo módulo:** [13-dom](../13-dom/README.md) — Manipulação do DOM.
