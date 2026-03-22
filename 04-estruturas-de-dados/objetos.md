# Objetos

## Definição

Um **objeto** é uma coleção de pares **chave-valor** (propriedades). É a estrutura de dados mais fundamental do JavaScript — praticamente tudo na linguagem é um objeto ou se comporta como um. Objetos representam entidades com características (propriedades) e comportamentos (métodos).

```javascript
const usuario = {
  nome: "Felix",        // propriedade (string)
  idade: 30,            // propriedade (number)
  ativo: true,          // propriedade (boolean)
  saudar() {            // método (função como propriedade)
    return `Olá, sou ${this.nome}`;
  }
};
```

---

## 1. Criação de Objetos

### Object literal (mais comum)

```javascript
const carro = {
  marca: "Toyota",
  modelo: "Corolla",
  ano: 2023
};
```

### Com `new Object()` (evite — verboso)

```javascript
const carro = new Object();
carro.marca = "Toyota";
carro.modelo = "Corolla";
```

### Com `Object.create()` (herança direta)

```javascript
const animal = {
  tipo: "mamífero",
  descrever() {
    return `Sou um ${this.tipo}`;
  }
};

const cachorro = Object.create(animal);
cachorro.nome = "Rex";
cachorro.raca = "Labrador";

console.log(cachorro.descrever()); // "Sou um mamífero" (herdado)
console.log(cachorro.nome);        // "Rex" (próprio)
```

### Com função construtora / class (Módulo 05)

```javascript
class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }
}
const p = new Produto("Notebook", 3500);
```

---

## 2. Acesso a Propriedades

### Notação de ponto (dot notation)

```javascript
const user = { nome: "Felix", idade: 30 };

console.log(user.nome);  // "Felix"
console.log(user.idade);  // 30
```

### Notação de colchetes (bracket notation)

Necessária quando a chave é dinâmica, contém espaços ou caracteres especiais.

```javascript
const user = { "nome completo": "Felix Santos", idade: 30 };

// Chave com espaço — só colchetes funcionam
console.log(user["nome completo"]); // "Felix Santos"

// Chave dinâmica
const campo = "idade";
console.log(user[campo]); // 30

// Chave computada
const indice = 0;
console.log(user[`campo_${indice}`]); // undefined (não existe, mas é válido)
```

### Propriedade inexistente

```javascript
console.log(user.email);   // undefined (não gera erro)
console.log(user.contato.email); // TypeError! (contato é undefined)

// Acesso seguro com optional chaining
console.log(user.contato?.email); // undefined (sem erro)
```

---

## 3. Modificação de Objetos

```javascript
const obj = { a: 1, b: 2 };

// Adicionar propriedade
obj.c = 3;

// Modificar propriedade
obj.a = 10;

// Remover propriedade
delete obj.b;

console.log(obj); // { a: 10, c: 3 }
```

### Propriedades computadas (chave dinâmica na criação)

```javascript
const campo = "email";
const valor = "felix@mail.com";

const obj = {
  nome: "Felix",
  [campo]: valor,          // email: "felix@mail.com"
  [`${campo}Backup`]: valor // emailBackup: "felix@mail.com"
};

console.log(obj.email); // "felix@mail.com"
```

### Shorthand property (nome = valor)

```javascript
const nome = "Felix";
const idade = 30;

// Sem shorthand
const user1 = { nome: nome, idade: idade };

// Com shorthand (ES6)
const user2 = { nome, idade };
// Ambos: { nome: "Felix", idade: 30 }
```

### Shorthand method

```javascript
// Sem shorthand
const obj1 = { saudar: function() { return "Olá"; } };

// Com shorthand (ES6)
const obj2 = { saudar() { return "Olá"; } };
```

---

## 4. Verificação de Propriedades

```javascript
const user = { nome: "Felix", idade: 30 };

// in — verifica a propriedade (inclusive herdadas)
console.log("nome" in user);      // true
console.log("toString" in user);   // true (herdada de Object)

// hasOwnProperty — apenas propriedades PRÓPRIAS
console.log(user.hasOwnProperty("nome"));     // true
console.log(user.hasOwnProperty("toString")); // false

// Object.hasOwn (ES2022 — forma moderna)
console.log(Object.hasOwn(user, "nome"));     // true
console.log(Object.hasOwn(user, "toString")); // false

// !== undefined (cuidado: falha se a propriedade existir com valor undefined)
console.log(user.nome !== undefined); // true
```

---

## 5. Iteração sobre Objetos

### `Object.keys()` — array de chaves

```javascript
const user = { nome: "Felix", idade: 30, ativo: true };

Object.keys(user); // ["nome", "idade", "ativo"]

Object.keys(user).forEach(chave => {
  console.log(`${chave}: ${user[chave]}`);
});
```

### `Object.values()` — array de valores

```javascript
Object.values(user); // ["Felix", 30, true]

const soma = Object.values({ a: 10, b: 20, c: 30 }).reduce((acc, v) => acc + v, 0);
console.log(soma); // 60
```

### `Object.entries()` — array de pares [chave, valor]

```javascript
Object.entries(user); // [["nome","Felix"], ["idade",30], ["ativo",true]]

// Desestruturação no loop
for (const [chave, valor] of Object.entries(user)) {
  console.log(`${chave} = ${valor}`);
}
// nome = Felix
// idade = 30
// ativo = true
```

### `for...in` — itera chaves (inclui herdadas)

```javascript
for (const chave in user) {
  if (Object.hasOwn(user, chave)) { // filtrar só próprias
    console.log(`${chave}: ${user[chave]}`);
  }
}
```

---

## 6. Métodos Estáticos de `Object`

### `Object.assign()` — mesclar/copiar objetos

```javascript
// Cópia rasa
const original = { a: 1, b: 2 };
const copia = Object.assign({}, original);
copia.a = 99;
console.log(original.a); // 1 (não afetou)

// Mesclar objetos (spread é preferido hoje)
const base = { cor: "azul", tamanho: "M" };
const custom = { cor: "verde", preco: 99 };
const final = Object.assign({}, base, custom);
console.log(final); // { cor: "verde", tamanho: "M", preco: 99 }

// Mesmo resultado com spread:
const final2 = { ...base, ...custom };
```

### `Object.freeze()` — congelar objeto (imutável raso)

```javascript
const config = Object.freeze({
  api: "https://api.exemplo.com",
  timeout: 5000
});

config.api = "outra"; // silenciosamente ignorado (erro em strict mode)
console.log(config.api); // "https://api.exemplo.com"

// ⚠️ Freeze é RASO — objetos internos continuam mutáveis
const obj = Object.freeze({ dados: { valor: 10 } });
obj.dados.valor = 99; // funciona!
console.log(obj.dados.valor); // 99
```

### `Object.keys()`, `Object.values()`, `Object.entries()`

Já vistos acima — retornam arrays para facilitar iteração.

### `Object.fromEntries()` — array de pares → objeto

```javascript
const pares = [["nome", "Felix"], ["idade", 30]];
const obj = Object.fromEntries(pares);
console.log(obj); // { nome: "Felix", idade: 30 }

// Caso de uso: transformar Map em objeto
const mapa = new Map([["a", 1], ["b", 2]]);
const objDoMapa = Object.fromEntries(mapa);
console.log(objDoMapa); // { a: 1, b: 2 }

// Caso de uso: filtrar propriedades de objeto
const usuario = { nome: "Felix", senha: "123", email: "f@mail.com" };
const semSenha = Object.fromEntries(
  Object.entries(usuario).filter(([chave]) => chave !== "senha")
);
console.log(semSenha); // { nome: "Felix", email: "f@mail.com" }
```

---

## 7. Cópia Rasa vs Profunda

### Cópia rasa (shallow copy)

Copia apenas o primeiro nível. Objetos internos continuam sendo referências.

```javascript
const original = {
  nome: "Felix",
  endereco: { cidade: "São Paulo", estado: "SP" }
};

// Spread cria cópia rasa
const copia = { ...original };
copia.nome = "Ana";                // não afeta original ✅
copia.endereco.cidade = "Rio";     // AFETA original! 😱

console.log(original.endereco.cidade); // "Rio"
```

### Cópia profunda (deep copy)

```javascript
// structuredClone (moderno — disponível no navegador e Node 17+)
const copiaProf = structuredClone(original);
copiaProf.endereco.cidade = "Curitiba";
console.log(original.endereco.cidade); // "Rio" (não afetou) ✅

// JSON (funciona para dados simples, falha com funções, Date, etc.)
const copiaJSON = JSON.parse(JSON.stringify(original));
```

---

## 8. Desestruturação de Objetos

```javascript
const { nome, idade } = { nome: "Felix", idade: 30, email: "f@mail.com" };
console.log(nome);  // "Felix"
console.log(idade);  // 30

// Renomear variável
const { nome: nomeUsuario } = { nome: "Felix" };
console.log(nomeUsuario); // "Felix"

// Valor padrão
const { role = "user" } = { nome: "Felix" };
console.log(role); // "user"

// Aninhado
const { endereco: { cidade } } = { endereco: { cidade: "SP" } };
console.log(cidade); // "SP"

// Rest (pegar o restante)
const { nome: n, ...resto } = { nome: "Felix", idade: 30, ativo: true };
console.log(resto); // { idade: 30, ativo: true }
```

---

## 9. Erros Comuns

### Acessar propriedade de `null`/`undefined`

```javascript
let user = null;
// console.log(user.nome); // TypeError!
console.log(user?.nome);    // undefined ✅
```

### Comparar objetos por conteúdo com `===`

```javascript
const a = { x: 1 };
const b = { x: 1 };
console.log(a === b); // false! São objetos diferentes na memória

// Para comparar conteúdo, use JSON.stringify ou compare campo a campo
console.log(JSON.stringify(a) === JSON.stringify(b)); // true
```

### Confundir cópia rasa com profunda

Já mostrado acima — spread e Object.assign são sempre rasos.

---

## Resumo

| Operação | Método/Sintaxe |
|----------|---------------|
| Criar | `{ }`, `Object.create()`, `new Class()` |
| Acessar | `obj.prop`, `obj["prop"]`, `obj?.prop` |
| Listar chaves | `Object.keys(obj)` |
| Listar valores | `Object.values(obj)` |
| Iterar pares | `Object.entries(obj)` |
| Copiar raso | `{ ...obj }`, `Object.assign({}, obj)` |
| Copiar profundo | `structuredClone(obj)` |
| Congelar | `Object.freeze(obj)` |
| Verificar prop | `"prop" in obj`, `Object.hasOwn(obj, "prop")` |
| Desestruturar | `const { a, b } = obj` |

---

> **Próximo:** [arrays.md](arrays.md) — Arrays e todos os seus métodos essenciais.
