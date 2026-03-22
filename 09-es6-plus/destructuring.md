# Destructuring (Desestruturação)

## Definição

**Destructuring** é uma sintaxe que permite extrair valores de arrays ou propriedades de objetos em variáveis separadas, de forma concisa.

---

## 1. Desestruturação de Objetos

```javascript
const usuario = { nome: "Felix", idade: 30, cidade: "SP" };

// Sem destructuring
const nome = usuario.nome;
const idade = usuario.idade;

// Com destructuring
const { nome, idade, cidade } = usuario;
console.log(nome, idade, cidade); // "Felix" 30 "SP"
```

### Renomear variáveis

```javascript
const { nome: nomeCompleto, idade: anos } = usuario;
console.log(nomeCompleto); // "Felix"
console.log(anos);         // 30
```

### Valores padrão

```javascript
const { nome, email = "sem email" } = usuario;
console.log(email); // "sem email" (não existe no objeto)
```

### Aninhado

```javascript
const empresa = {
  nome: "TechCo",
  endereco: {
    rua: "Av. Brasil",
    numero: 100,
    cidade: { nome: "São Paulo", estado: "SP" }
  }
};

const { endereco: { rua, cidade: { estado } } } = empresa;
console.log(rua);    // "Av. Brasil"
console.log(estado); // "SP"
```

### Rest em objetos

```javascript
const { nome, ...resto } = { nome: "Felix", idade: 30, cidade: "SP" };
console.log(nome);  // "Felix"
console.log(resto); // { idade: 30, cidade: "SP" }
```

---

## 2. Desestruturação de Arrays

```javascript
const cores = ["vermelho", "azul", "verde"];

const [primeira, segunda, terceira] = cores;
console.log(primeira); // "vermelho"

// Pular elementos
const [, , ultima] = cores;
console.log(ultima); // "verde"

// Rest
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(tail); // [2, 3, 4, 5]

// Swap
let a = 1, b = 2;
[a, b] = [b, a]; // a=2, b=1
```

---

## 3. Em Parâmetros de Função

```javascript
// Desestruturar diretamente nos parâmetros
function exibirUsuario({ nome, idade, role = "user" }) {
  console.log(`${nome}, ${idade} anos (${role})`);
}

exibirUsuario({ nome: "Felix", idade: 30 }); // "Felix, 30 anos (user)"

// Com arrays
function primeiroDois([a, b]) {
  return a + b;
}
primeiroDois([10, 20]); // 30
```

---

## 4. Casos de Uso Reais

```javascript
// Retorno de múltiplos valores
function dividir(a, b) {
  return { quociente: Math.floor(a / b), resto: a % b };
}
const { quociente, resto } = dividir(17, 5);

// Import nomeado (ES Modules)
import { useState, useEffect } from "react";

// Iterar com entries
for (const [indice, valor] of ["a", "b", "c"].entries()) {
  console.log(indice, valor);
}
```

---

> **Próximo arquivo:** [spread-rest.md](spread-rest.md)
