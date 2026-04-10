# Projetos Praticos — Colecoes

## Projeto 1: Cache LRU com Map

```javascript
class LRUCache {
  #capacidade;
  #cache;

  constructor(capacidade) {
    this.#capacidade = capacidade;
    this.#cache = new Map();
  }

  get(chave) {
    if (!this.#cache.has(chave)) return undefined;
    // Mover para o fim (mais recente)
    const valor = this.#cache.get(chave);
    this.#cache.delete(chave);
    this.#cache.set(chave, valor);
    return valor;
  }

  set(chave, valor) {
    if (this.#cache.has(chave)) {
      this.#cache.delete(chave);
    } else if (this.#cache.size >= this.#capacidade) {
      // Remover o mais antigo (primeiro item do Map)
      const primeiraChave = this.#cache.keys().next().value;
      this.#cache.delete(primeiraChave);
    }
    this.#cache.set(chave, valor);
  }

  get tamanho() {
    return this.#cache.size;
  }

  listar() {
    return [...this.#cache.entries()];
  }
}

const cache = new LRUCache(3);
cache.set("a", 1);
cache.set("b", 2);
cache.set("c", 3);
console.log(cache.get("a")); // 1 (move "a" para mais recente)
cache.set("d", 4);           // remove "b" (mais antigo)
console.log(cache.listar()); // [["c", 3], ["a", 1], ["d", 4]]
```

---

## Projeto 2: Gerenciador de Tags Unicas com Set

```javascript
class GerenciadorTags {
  #tags = new Set();

  adicionar(...novasTags) {
    for (const tag of novasTags) {
      this.#tags.add(tag.toLowerCase().trim());
    }
    return this;
  }

  remover(tag) {
    this.#tags.delete(tag.toLowerCase().trim());
    return this;
  }

  tem(tag) {
    return this.#tags.has(tag.toLowerCase().trim());
  }

  unir(outroSet) {
    return new Set([...this.#tags, ...outroSet]);
  }

  intersecao(outroSet) {
    return new Set([...this.#tags].filter(t => outroSet.has(t)));
  }

  diferenca(outroSet) {
    return new Set([...this.#tags].filter(t => !outroSet.has(t)));
  }

  listar() {
    return [...this.#tags].sort();
  }
}

const post = new GerenciadorTags();
post.adicionar("JavaScript", "ES6", "Tutorial", "javascript"); // sem duplicatas
console.log(post.listar()); // ["es6", "javascript", "tutorial"]

const outro = new Set(["es6", "react", "node"]);
console.log("Uniao:", [...post.unir(outro)]);
console.log("Intersecao:", [...post.intersecao(outro)]);
```

---

## Projeto 3: Rastreador de Objetos com WeakMap

```javascript
const rastreador = (() => {
  const metadata = new WeakMap();

  return {
    registrar(obj, info) {
      metadata.set(obj, { ...info, registradoEm: Date.now() });
    },

    obter(obj) {
      return metadata.get(obj) || null;
    },

    rastreado(obj) {
      return metadata.has(obj);
    }
  };
})();

let usuario = { nome: "Ana" };
rastreador.registrar(usuario, { origem: "formulario", ip: "127.0.0.1" });
console.log(rastreador.obter(usuario));

// Quando usuario = null, o WeakMap permite garbage collection
// diferente de Map que manteria a referencia
usuario = null;
// O objeto e a metadata podem ser coletados pelo GC
```

**Conexao**: Performance/Memoria (modulo 18), Iteradores (modulo 11).
