# Map e WeakMap

## 1. Map

Um `Map` é uma coleção de pares **chave-valor** onde a chave pode ser **qualquer tipo** (objetos, funções, primitivos). Diferente de objetos, que só aceitam strings/symbols como chaves.

```javascript
const map = new Map();

// Definir pares
map.set("nome", "Felix");
map.set(42, "o número");
map.set(true, "booleano");

const objKey = { id: 1 };
map.set(objKey, "objeto como chave!");

// Acessar
console.log(map.get("nome"));   // "Felix"
console.log(map.get(42));       // "o número"
console.log(map.get(objKey));   // "objeto como chave!"
console.log(map.size);          // 4
```

### Métodos principais

```javascript
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3]
]);

map.has("a");      // true
map.delete("b");   // true (removeu)
map.size;          // 2
map.clear();       // remove tudo
```

### Iteração

```javascript
const map = new Map([["nome", "Felix"], ["idade", 30]]);

for (const [chave, valor] of map) {
  console.log(`${chave}: ${valor}`);
}

map.forEach((valor, chave) => console.log(chave, valor));

// Converter
const chaves = [...map.keys()];    // ["nome", "idade"]
const valores = [...map.values()]; // ["Felix", 30]
const pares = [...map.entries()];  // [["nome","Felix"], ["idade",30]]

// Map ↔ Objeto
const obj = Object.fromEntries(map);
const map2 = new Map(Object.entries(obj));
```

### Map vs Objeto

| Aspecto | `Map` | `Object` |
|---------|-------|----------|
| Tipos de chave | Qualquer | String/Symbol |
| Ordem | Inserção garantida | Parcialmente garantida |
| Tamanho | `.size` | `Object.keys().length` |
| Performance | Melhor para add/remove frequente | Melhor para acesso estático |
| Iterável | Sim (for...of) | Não diretamente |

### Caso de uso: contagem de frequência

```javascript
function contarPalavras(texto) {
  const freq = new Map();
  for (const palavra of texto.toLowerCase().split(/\s+/)) {
    freq.set(palavra, (freq.get(palavra) || 0) + 1);
  }
  return freq;
}

const freq = contarPalavras("o gato viu o rato e o gato correu");
console.log(freq.get("o")); // 3
```

---

## 2. WeakMap

Como Map, mas com chaves de **referência fraca** — não impede o Garbage Collector de limpar os objetos usados como chave.

```javascript
const wm = new WeakMap();

let obj = { dados: "importante" };
wm.set(obj, "metadado privado");

console.log(wm.get(obj)); // "metadado privado"

obj = null; // a referência ao objeto sumiu
// O GC PODE coletar o objeto e o entry do WeakMap desaparece automaticamente
```

### Limitações

```javascript
// Chaves DEVEM ser objetos (não primitivos)
// wm.set("string", 1); // TypeError!

// NÃO é iterável — sem .size, .keys(), .forEach(), for...of
// Métodos: .get(), .set(), .has(), .delete()
```

### Caso de uso: dados privados de instâncias

```javascript
const privados = new WeakMap();

class Pessoa {
  constructor(nome, cpf) {
    this.nome = nome;
    privados.set(this, { cpf }); // cpf guardado fora do objeto
  }

  getCPF() {
    return privados.get(this).cpf;
  }
}

const p = new Pessoa("Felix", "123.456.789-00");
console.log(p.nome);     // "Felix"
console.log(p.cpf);      // undefined (não é propriedade)
console.log(p.getCPF()); // "123.456.789-00"
```

---

> **Próximo arquivo:** [set.md](set.md)
