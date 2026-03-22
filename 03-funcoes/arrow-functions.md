# Arrow Functions

## Definição

**Arrow functions** (funções seta) são uma sintaxe mais curta para escrever funções, introduzida no ES6. Além da sintaxe, há uma **diferença fundamental de comportamento**: arrow functions **não têm `this` próprio** — herdam o `this` do escopo onde foram definidas (this léxico).

```javascript
// Function expression
const somar = function(a, b) {
  return a + b;
};

// Arrow function (equivalente)
const somar = (a, b) => {
  return a + b;
};

// Arrow function com retorno implícito
const somar = (a, b) => a + b;
```

---

## 1. Sintaxe — Do Mais Verboso ao Mais Conciso

### Com corpo completo (bloco `{ }`)

```javascript
const calcular = (a, b) => {
  const resultado = a + b;
  return resultado; // return OBRIGATÓRIO com { }
};
```

### Com retorno implícito (sem `{ }`)

```javascript
// Se o corpo tem UMA expressão, o return é implícito
const dobrar = (x) => x * 2;
console.log(dobrar(5)); // 10

// Equivale a:
const dobrar = (x) => { return x * 2; };
```

### Parênteses opcionais (com 1 parâmetro)

```javascript
// Com 1 parâmetro — parênteses são opcionais
const quadrado = x => x ** 2;

// Com 0 parâmetros — parênteses são obrigatórios
const agora = () => Date.now();

// Com 2+ parâmetros — parênteses são obrigatórios
const somar = (a, b) => a + b;

// Com desestruturação — parênteses são obrigatórios
const getNome = ({ nome }) => nome;

// Com default — parênteses são obrigatórios
const saudar = (nome = "visitante") => `Olá, ${nome}`;
```

### Retornar objeto literal — precisa de `( )`

```javascript
// ❌ { } é interpretado como bloco, não como objeto
const criarUser = (nome) => { nome: nome };
console.log(criarUser("Felix")); // undefined

// ✅ Envolva o objeto em ( ) para retorno implícito
const criarUser = (nome) => ({ nome: nome });
console.log(criarUser("Felix")); // { nome: "Felix" }

// Shorthand property
const criarUser = (nome) => ({ nome });
console.log(criarUser("Felix")); // { nome: "Felix" }
```

---

## 2. Comparação Visual

```javascript
// Progressão de simplificação:

// 1. Function expression completa
const fn1 = function(x) { return x * 2; };

// 2. Arrow com bloco
const fn2 = (x) => { return x * 2; };

// 3. Arrow com parênteses e retorno implícito
const fn3 = (x) => x * 2;

// 4. Arrow sem parênteses (1 param) e retorno implícito
const fn4 = x => x * 2;

// Todas fazem exatamente a mesma coisa
```

---

## 3. Diferenças Fundamentais: Arrow vs Function

### 3.1. `this` Léxico (a diferença mais importante)

Arrow functions **não criam seu próprio `this`**. Elas herdam o `this` do escopo onde foram **definidas**.

```javascript
const equipe = {
  nome: "Dev Team",
  membros: ["Ana", "Carlos", "Felix"],

  // ❌ Function expression — this é o objeto que CHAMOU
  listarErrado: function() {
    this.membros.forEach(function(membro) {
      console.log(`${membro} pertence a ${this.nome}`);
      // this.nome é undefined! "this" aqui é o contexto do forEach callback
    });
  },

  // ✅ Arrow function — this é herdado do escopo de listarCerto
  listarCerto: function() {
    this.membros.forEach(membro => {
      console.log(`${membro} pertence a ${this.nome}`);
      // this.nome é "Dev Team" — arrow herda o this do listarCerto
    });
  }
};

equipe.listarCerto();
// Ana pertence a Dev Team
// Carlos pertence a Dev Team
// Felix pertence a Dev Team
```

#### Diagrama do `this`

```
Function expression:
  ┌─ equipe.listarErrado() ──── this = equipe ✅
  │
  └─ forEach(function() {})
       └─ this = undefined (strict) ou window ❌

Arrow function:
  ┌─ equipe.listarCerto() ──── this = equipe ✅
  │
  └─ forEach(() => {})
       └─ this = equipe (HERDADO) ✅
```

### 3.2. Sem `arguments`

```javascript
// Function expression — tem arguments
const fn = function() {
  console.log(arguments); // { 0: 1, 1: 2, 2: 3 }
};
fn(1, 2, 3);

// Arrow function — NÃO tem arguments
const arrow = () => {
  // console.log(arguments); // ReferenceError!
};

// Use rest parameter em vez disso
const arrow = (...args) => {
  console.log(args); // [1, 2, 3]
};
arrow(1, 2, 3);
```

### 3.3. Não pode ser usada como construtor

```javascript
// Function — pode ser usada com new
function Pessoa(nome) {
  this.nome = nome;
}
const p = new Pessoa("Felix"); // OK

// Arrow — NÃO pode ser usada com new
const Carro = (modelo) => {
  this.modelo = modelo;
};
// const c = new Carro("Civic"); // TypeError: Carro is not a constructor
```

### 3.4. Não tem `prototype`

```javascript
function normal() { }
console.log(normal.prototype); // {} ← existe

const arrow = () => { };
console.log(arrow.prototype); // undefined ← não existe
```

### 3.5. Não pode ser generator

```javascript
// ❌ Arrow functions não podem usar yield
// const gen = *() => { yield 1; }; // SyntaxError
```

---

## 4. Tabela Comparativa Completa

| Característica | `function` | Arrow `=>` |
|---------------|-----------|-----------|
| `this` | Próprio (dinâmico) | Léxico (herdado) |
| `arguments` | ✅ Sim | ❌ Não |
| `new` (construtor) | ✅ Sim | ❌ Não |
| `prototype` | ✅ Sim | ❌ Não |
| Hoisting | ✅ (declaration) | ❌ Não |
| Generator (`function*`) | ✅ Sim | ❌ Não |
| `bind/call/apply` no this | ✅ Funciona | ❌ Ignorado (this é fixo) |

---

## 5. Quando Usar Cada Uma

### Use **arrow function** quando:

```javascript
// ✅ Callbacks curtos
const dobrados = [1, 2, 3].map(x => x * 2);

// ✅ Dentro de métodos (para herdar this)
class Timer {
  start() {
    setInterval(() => {
      this.tick(); // this é a instância — correto!
    }, 1000);
  }
}

// ✅ Funções puras simples
const somar = (a, b) => a + b;
const ehPar = n => n % 2 === 0;

// ✅ Promises e async (como callbacks)
fetch("/api/dados")
  .then(res => res.json())
  .then(dados => processar(dados));
```

### Use **function** quando:

```javascript
// ✅ Métodos de objeto (precisa de this próprio)
const obj = {
  nome: "Felix",
  saudar() {  // shorthand de function
    return `Olá, ${this.nome}`;
  }
};

// ✅ Construtores (se não usar class)
function Animal(nome) {
  this.nome = nome;
}

// ✅ Event handlers que usam this (referindo ao elemento)
botao.addEventListener("click", function() {
  this.classList.toggle("ativo"); // this = o botão
});

// ✅ Generators
function* gerador() {
  yield 1;
  yield 2;
}
```

---

## 6. Padrões Comuns com Arrow Functions

### Filtrar, mapear e reduzir

```javascript
const produtos = [
  { nome: "Camiseta", preco: 50, ativo: true },
  { nome: "Calça", preco: 120, ativo: false },
  { nome: "Tênis", preco: 200, ativo: true },
  { nome: "Boné", preco: 35, ativo: true }
];

// Pipeline de transformação
const resultado = produtos
  .filter(p => p.ativo)                    // só ativos
  .map(p => ({ ...p, preco: p.preco * 0.9 })) // 10% de desconto
  .sort((a, b) => a.preco - b.preco);      // ordenar por preço

console.log(resultado);
// [{ nome: "Boné", preco: 31.5, ... }, { nome: "Camiseta", preco: 45, ... }, ...]
```

### Composição e currying

```javascript
// Currying com arrows
const multiplicar = a => b => a * b;
const dobrar = multiplicar(2);
const triplicar = multiplicar(3);

console.log(dobrar(5));    // 10
console.log(triplicar(5)); // 15

// Composição
const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x);

const processar = pipe(
  x => x * 2,
  x => x + 1,
  x => `Resultado: ${x}`
);

console.log(processar(5)); // "Resultado: 11"
```

---

## 7. Erros Comuns

### Usar arrow como método de objeto

```javascript
// ❌ Arrow como método — this é window/undefined, não o objeto
const usuario = {
  nome: "Felix",
  saudar: () => {
    return `Olá, ${this.nome}`; // this NÃO é usuario!
  }
};
console.log(usuario.saudar()); // "Olá, undefined"

// ✅ Use shorthand method
const usuario = {
  nome: "Felix",
  saudar() {
    return `Olá, ${this.nome}`;
  }
};
console.log(usuario.saudar()); // "Olá, Felix"
```

### Esquecer `( )` ao retornar objeto

```javascript
// ❌ { } é interpretado como bloco
const fn = () => { id: 1, nome: "Felix" }; // SyntaxError ou undefined

// ✅ Envolver em ( )
const fn = () => ({ id: 1, nome: "Felix" });
```

### Tentar usar `new` com arrow

```javascript
const Foo = () => {};
// new Foo(); // TypeError: Foo is not a constructor
```

---

## Resumo

```
ARROW FUNCTION:
  ✅ Sintaxe curta e limpa
  ✅ this léxico (herda do escopo pai)
  ✅ Ideal para callbacks, map/filter/reduce
  ❌ Sem this próprio, sem arguments, sem new

FUNCTION:
  ✅ this dinâmico
  ✅ Pode ser construtor (new)
  ✅ Tem arguments e prototype
  ✅ Ideal para métodos e generators

REGRA PRÁTICA:
  → Arrow para callbacks e funções curtas
  → Function para métodos de objetos e construtores
```

---

> **Próximo:** [funcoes-avancadas.md](funcoes-avancadas.md) — Higher-order functions, closures, currying e composição.
