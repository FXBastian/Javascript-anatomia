# this

## Definição

`this` é uma referência especial que aponta para o **objeto do contexto atual**. Diferente de outras linguagens, em JavaScript o valor de `this` **não é fixo** — ele é determinado por **como a função é chamada**, não por onde ela é definida (exceto arrow functions).

---

## 1. As 4 Regras do `this` (em ordem de prioridade)

```
PRIORIDADE (maior → menor):

1. new binding         → this = novo objeto criado
2. Explicit binding    → this = o que bind/call/apply definir
3. Implicit binding    → this = objeto que chamou o método
4. Default binding     → this = window (ou undefined em strict mode)
```

---

### Regra 1: Default Binding

Quando uma função é chamada sozinha (sem objeto, sem `new`, sem `bind`).

```javascript
function mostrarThis() {
  console.log(this);
}

mostrarThis(); // window (browser) ou global (Node)

// Em strict mode:
"use strict";
function mostrarThisStrict() {
  console.log(this);
}
mostrarThisStrict(); // undefined ← MUDA!
```

---

### Regra 2: Implicit Binding

Quando a função é chamada como **método** de um objeto — `this` é o objeto à esquerda do ponto.

```javascript
const pessoa = {
  nome: "Felix",
  saudar() {
    console.log(this.nome); // this = pessoa
  }
};

pessoa.saudar(); // "Felix" ← pessoa está à esquerda do ponto
```

#### ⚠️ Perda do Implicit Binding

```javascript
const pessoa = {
  nome: "Felix",
  saudar() {
    console.log(this.nome);
  }
};

const fn = pessoa.saudar; // extrai a referência da função
fn(); // undefined! ← chamada sem objeto, cai no default binding

// O mesmo acontece com callbacks:
setTimeout(pessoa.saudar, 1000); // undefined — o timer chama a função "solta"
```

---

### Regra 3: Explicit Binding — `call`, `apply`, `bind`

Você **define** o valor de `this` explicitamente.

```javascript
function saudar(cumprimento) {
  console.log(`${cumprimento}, ${this.nome}!`);
}

const felix = { nome: "Felix" };
const ana = { nome: "Ana" };

// call — chama imediatamente, argumentos separados
saudar.call(felix, "Olá");   // "Olá, Felix!"
saudar.call(ana, "Oi");      // "Oi, Ana!"

// apply — chama imediatamente, argumentos em ARRAY
saudar.apply(felix, ["Hey"]); // "Hey, Felix!"

// bind — retorna NOVA função com this fixo (não executa)
const saudarFelix = saudar.bind(felix);
saudarFelix("Bom dia"); // "Bom dia, Felix!"

// bind resolve a perda de implicit binding:
setTimeout(pessoa.saudar.bind(pessoa), 1000); // "Felix" ✅
```

```
call(obj, arg1, arg2)      → executa imediatamente
apply(obj, [arg1, arg2])   → executa imediatamente (args em array)
bind(obj, arg1)            → retorna nova função (não executa)
```

---

### Regra 4: `new` Binding

Quando uma função é chamada com `new` — `this` é o **novo objeto** criado.

```javascript
function Pessoa(nome) {
  // this = {} (novo objeto criado pelo new)
  this.nome = nome;
  // return this (implícito)
}

const felix = new Pessoa("Felix");
console.log(felix.nome); // "Felix"
```

---

## 2. Arrow Functions — `this` Léxico

Arrow functions **não têm seu próprio `this`**. Elas **herdam** o `this` do escopo onde foram **definidas** (escopo léxico).

```javascript
const pessoa = {
  nome: "Felix",

  // Método normal — this = pessoa (implicit binding)
  metodoNormal() {
    console.log(this.nome); // "Felix"

    // ❌ function tradicional em callback — perde this
    setTimeout(function() {
      console.log(this.nome); // undefined (default binding)
    }, 100);

    // ✅ Arrow function — herda this de metodoNormal
    setTimeout(() => {
      console.log(this.nome); // "Felix" ← this léxico!
    }, 100);
  }
};

pessoa.metodoNormal();
```

### Arrow function como método — NÃO USE

```javascript
const pessoa = {
  nome: "Felix",

  // ❌ Arrow function como método — this NÃO é pessoa!
  saudarArrow: () => {
    console.log(this.nome); // undefined — herda this do escopo externo (global)
  },

  // ✅ Método normal
  saudarNormal() {
    console.log(this.nome); // "Felix"
  }
};
```

---

## 3. `this` em Classes

```javascript
class Timer {
  constructor() {
    this.segundos = 0;
  }

  iniciar() {
    // ❌ function — this será undefined (class body é strict mode)
    // setInterval(function() { this.segundos++; }, 1000);

    // ✅ Arrow function — herda this da instância
    setInterval(() => {
      this.segundos++;
    }, 1000);
  }
}

// ✅ Campos com arrow (auto-bind)
class Botao {
  texto = "Clique";

  // Arrow como campo → this sempre é a instância
  handleClick = () => {
    console.log(this.texto); // sempre "Clique"
  };
}

const btn = new Botao();
const handler = btn.handleClick;
handler(); // "Clique" ← funciona! Arrow mantém this
```

---

## 4. `this` em Event Handlers

```javascript
const botao = document.getElementById("btn");

// function tradicional — this = elemento do DOM que disparou
botao.addEventListener("click", function() {
  console.log(this);           // <button id="btn">
  console.log(this.textContent); // texto do botão
});

// Arrow function — this = escopo externo (NÃO o elemento)
botao.addEventListener("click", () => {
  console.log(this); // window (ou o this do escopo externo)
});

// Se precisa do elemento + contexto externo, use o parâmetro event:
botao.addEventListener("click", (event) => {
  console.log(event.target); // <button id="btn">
});
```

---

## 5. Tabela Resumo

| Forma de chamada | `this` aponta para |
|------------------|--------------------|
| `func()` | `window` (ou `undefined` em strict) |
| `obj.func()` | `obj` |
| `func.call(x)` / `func.apply(x)` | `x` |
| `func.bind(x)()` | `x` |
| `new Func()` | novo objeto criado |
| `() => {}` | `this` do escopo onde foi definida (léxico) |
| Event handler (`function`) | elemento que disparou o evento |
| Event handler (`arrow`) | `this` do escopo externo |

---

## 6. Erros Comuns

### Perder `this` em destructuring de métodos

```javascript
class API {
  baseURL = "https://api.com";
  async get(path) {
    return fetch(`${this.baseURL}${path}`);
  }
}

const api = new API();
const { get } = api; // extrai o método
// get("/users"); // TypeError! this é undefined

// ✅ Soluções:
const get2 = api.get.bind(api);
// ou use arrow function no campo da classe
```

### Usar `this` no nível global esperando o módulo

```javascript
// Em módulos ES, o this no top-level é undefined, não window
console.log(this); // undefined (em type="module")

// Use globalThis para acessar o objeto global de forma segura
console.log(globalThis); // window (browser) ou global (Node)
```

---

> **Próximo módulo:** [08-assincrono](../08-assincrono/README.md) — Event Loop e programação assíncrona.
