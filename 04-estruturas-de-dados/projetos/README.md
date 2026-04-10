# Projetos Praticos — Estruturas de Dados

## Projeto 1: Mini Banco de Dados em Memoria

Implemente um CRUD completo usando arrays e objetos:

```javascript
function criarDB() {
  let dados = [];
  let proximoId = 1;

  return {
    inserir(registro) {
      const novo = { id: proximoId++, ...registro, criadoEm: new Date().toISOString() };
      dados.push(novo);
      return novo;
    },

    buscarPorId(id) {
      return dados.find(d => d.id === id) || null;
    },

    buscar(filtro) {
      return dados.filter(item =>
        Object.entries(filtro).every(([chave, valor]) => item[chave] === valor)
      );
    },

    atualizar(id, mudancas) {
      const indice = dados.findIndex(d => d.id === id);
      if (indice === -1) return null;
      dados[indice] = { ...dados[indice], ...mudancas, atualizadoEm: new Date().toISOString() };
      return dados[indice];
    },

    remover(id) {
      const tamanho = dados.length;
      dados = dados.filter(d => d.id !== id);
      return dados.length < tamanho;
    },

    listar() {
      return [...dados]; // copia defensiva
    }
  };
}

const db = criarDB();
db.inserir({ nome: "Ana", cargo: "Dev" });
db.inserir({ nome: "Carlos", cargo: "Design" });
db.inserir({ nome: "Bia", cargo: "Dev" });

console.log(db.buscar({ cargo: "Dev" }));
db.atualizar(1, { cargo: "Tech Lead" });
console.log(db.listar());
```

---

## Projeto 2: Deep Clone e Deep Merge

```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (Array.isArray(obj)) return obj.map(deepClone);

  const clone = {};
  for (const chave of Object.keys(obj)) {
    clone[chave] = deepClone(obj[chave]);
  }
  return clone;
}

function deepMerge(alvo, ...fontes) {
  for (const fonte of fontes) {
    for (const chave of Object.keys(fonte)) {
      if (fonte[chave] && typeof fonte[chave] === "object" && !Array.isArray(fonte[chave])) {
        alvo[chave] = deepMerge(alvo[chave] || {}, fonte[chave]);
      } else {
        alvo[chave] = fonte[chave];
      }
    }
  }
  return alvo;
}

const configPadrao = { tema: "claro", api: { url: "https://api.com", timeout: 3000 } };
const configUsuario = { api: { timeout: 5000 } };
console.log(deepMerge({}, configPadrao, configUsuario));
```

---

## Projeto 3: Metodos de Array Reimplementados

Reimplemente os metodos mais usados do zero para entender como funcionam:

```javascript
Array.prototype.meuMap = function (callback) {
  const resultado = [];
  for (let i = 0; i < this.length; i++) {
    resultado.push(callback(this[i], i, this));
  }
  return resultado;
};

Array.prototype.meuFilter = function (callback) {
  const resultado = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) resultado.push(this[i]);
  }
  return resultado;
};

Array.prototype.meuReduce = function (callback, valorInicial) {
  let acc = valorInicial !== undefined ? valorInicial : this[0];
  const inicio = valorInicial !== undefined ? 0 : 1;
  for (let i = inicio; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};

// Teste
console.log([1, 2, 3].meuMap(x => x * 2));
console.log([1, 2, 3, 4, 5].meuFilter(x => x % 2 === 0));
console.log([1, 2, 3, 4].meuReduce((acc, x) => acc + x, 0));
```

**Conexao**: Closures (modulo 03), this (modulo 07), prototipos (modulo 05).
