# Optional Chaining e Nullish Coalescing

## 1. Optional Chaining (`?.`)

Acessa propriedades de forma segura — se o valor for `null` ou `undefined`, retorna `undefined` em vez de lançar erro.

```javascript
const usuario = {
  nome: "Felix",
  endereco: {
    rua: "Av. Brasil"
  }
};

// Sem optional chaining — pode crashar
// usuario.empresa.nome → TypeError!

// Com optional chaining — seguro
console.log(usuario.empresa?.nome);         // undefined (sem erro)
console.log(usuario.endereco?.rua);         // "Av. Brasil"
console.log(usuario.endereco?.cep);         // undefined

// Em arrays
const arr = [1, 2, 3];
console.log(arr?.[5]); // undefined

// Em métodos
const obj = { fn: () => 42 };
console.log(obj.fn?.());       // 42
console.log(obj.metodo?.());   // undefined (sem erro)
```

### Encadeamento profundo

```javascript
// API que pode ter dados parciais
const response = await fetch("/api/user/1").then(r => r.json());

const cep = response?.data?.endereco?.cep ?? "CEP não informado";
```

---

## 2. Nullish Coalescing (`??`)

Retorna o lado direito **apenas** se o esquerdo for `null` ou `undefined`. Diferente de `||` que trata `0`, `""` e `false` como falsy.

```javascript
// || trata 0, "" e false como falsy
console.log(0 || "padrão");      // "padrão" ← indesejado!
console.log("" || "padrão");     // "padrão" ← indesejado!
console.log(false || "padrão");  // "padrão" ← indesejado!

// ?? só age em null/undefined
console.log(0 ?? "padrão");      // 0 ✅
console.log("" ?? "padrão");     // "" ✅
console.log(false ?? "padrão");  // false ✅
console.log(null ?? "padrão");   // "padrão" ✅
console.log(undefined ?? "padrão"); // "padrão" ✅
```

### Quando usar `||` vs `??`

| Operador | Trata como "vazio" | Use quando |
|----------|-------------------|------------|
| `\|\|` | `null`, `undefined`, `0`, `""`, `false`, `NaN` | Quer fallback para QUALQUER falsy |
| `??` | Apenas `null` e `undefined` | Quer preservar `0`, `""`, `false` como válidos |

---

## 3. Nullish Coalescing Assignment (`??=`)

```javascript
let config = {};

config.timeout ??= 3000;    // atribui SÓ se for null/undefined
config.retries ??= 3;

console.log(config); // { timeout: 3000, retries: 3 }

// Comparar:
config.timeout ??= 9999;    // NÃO atribui — já tem valor (3000)
console.log(config.timeout); // 3000
```

---

## 4. Combinando `?.` com `??`

```javascript
// Padrão defensivo poderoso:
const nome = usuario?.perfil?.nome ?? "Anônimo";
const itens = pedido?.itens?.length ?? 0;
const callback = config?.hooks?.onError ?? ((err) => console.error(err));
```

---

> **Próximo módulo:** [10-colecoes](../10-colecoes/README.md) — Map, Set e coleções avançadas.
