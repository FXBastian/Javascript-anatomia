# Set e WeakSet

## 1. Set

Um `Set` é uma coleção de **valores únicos** — sem duplicatas. Qualquer tipo de valor é aceito.

```javascript
const set = new Set();

set.add(1);
set.add(2);
set.add(3);
set.add(2); // ignorado! já existe
set.add(1); // ignorado!

console.log(set.size); // 3
console.log(set);      // Set(3) { 1, 2, 3 }
```

### Criação a partir de array (deduplicação)

```javascript
const numeros = [1, 2, 3, 2, 1, 4, 5, 4];
const unicos = [...new Set(numeros)]; // [1, 2, 3, 4, 5]

// Strings
const letras = new Set("abracadabra");
console.log([...letras]); // ["a", "b", "r", "c", "d"]
```

### Métodos

```javascript
const set = new Set([10, 20, 30]);

set.has(20);     // true
set.delete(20);  // true
set.size;        // 2
set.clear();     // remove tudo
```

### Iteração

```javascript
const set = new Set(["a", "b", "c"]);

for (const valor of set) {
  console.log(valor);
}

set.forEach(valor => console.log(valor));

const arr = [...set]; // converter para array
```

### Operações de Conjuntos

```javascript
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

// União
const uniao = new Set([...a, ...b]); // {1,2,3,4,5,6}

// Interseção
const inter = new Set([...a].filter(x => b.has(x))); // {3,4}

// Diferença (A - B)
const diff = new Set([...a].filter(x => !b.has(x))); // {1,2}

// ES2025+: métodos nativos (quando disponíveis)
// a.union(b), a.intersection(b), a.difference(b)
```

### Caso de uso: controle de únicos

```javascript
// Rastrear IDs já processados
const processados = new Set();

function processar(item) {
  if (processados.has(item.id)) return; // já foi!
  processados.add(item.id);
  // ... processar item
}

// Tags únicas
function getTags(posts) {
  const tags = new Set();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return [...tags];
}
```

---

## 2. WeakSet

Coleção de **objetos únicos** com referência fraca. Quando o objeto perde todas as referências externas, o GC pode coletá-lo.

```javascript
const ws = new WeakSet();

let obj = { id: 1 };
ws.add(obj);
ws.has(obj);    // true
ws.delete(obj); // true

// Apenas objetos — primitivos não são aceitos
// ws.add(42); // TypeError!

// NÃO iterável — sem .size, sem for...of
```

### Caso de uso: marcar objetos

```javascript
// Verificar se um objeto já foi visitado (sem poluir o objeto)
const visitados = new WeakSet();

function processar(node) {
  if (visitados.has(node)) return; // evita ciclos
  visitados.add(node);

  // processar node...
  if (node.children) {
    node.children.forEach(child => processar(child));
  }
}
```

---

## Comparação

| | `Set` | `WeakSet` | `Map` | `WeakMap` |
|--|-------|-----------|-------|-----------|
| Valores/Chaves | Qualquer | Objetos | Qualquer | Objetos (chave) |
| Iterável | ✅ | ❌ | ✅ | ❌ |
| `.size` | ✅ | ❌ | ✅ | ❌ |
| GC-friendly | ❌ | ✅ | ❌ | ✅ |

---

> **Próximo módulo:** [11-iteradores](../11-iteradores/README.md) — Iteradores e Generators.
