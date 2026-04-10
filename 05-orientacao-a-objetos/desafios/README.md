# Desafios — Orientacao a Objetos

## Desafio 1: Implementar instanceof do Zero

```javascript
function meuInstanceof(obj, Construtor) {
  // Percorra a cadeia de prototipos de obj
  // Retorne true se encontrar Construtor.prototype
  // Implemente aqui
}
```

---

## Desafio 2: Proxy para Validacao

Use `Proxy` para criar um objeto que valida tipos automaticamente:

```javascript
function criarModelo(esquema) {
  // esquema = { nome: "string", idade: "number", ativo: "boolean" }
  // Retorna um Proxy que:
  // - Aceita apenas propriedades do esquema
  // - Valida o tipo na atribuicao
  // - Lanca erro se tipo errado
}

const usuario = criarModelo({ nome: "string", idade: "number" });
usuario.nome = "Ana";     // OK
usuario.idade = 25;       // OK
usuario.idade = "vinte";  // ERRO: idade deve ser number
usuario.xyz = true;       // ERRO: propriedade xyz nao existe no modelo
```

---

## Desafio 3: Heranca sem Class

Implemente heranca usando apenas funcoes e prototipos (pre-ES6):

```javascript
function Animal(nome) {
  this.nome = nome;
}
Animal.prototype.falar = function () {
  return `${this.nome} faz um som`;
};

// Implemente Cachorro que herda de Animal
// Cachorro deve sobrescrever falar() com "late"
// Use Object.create para a cadeia de prototipos
```

---

## Desafio 4: Singleton Pattern

Implemente o padrao Singleton de 3 formas diferentes:
1. Com closure
2. Com class e campo estatico
3. Com modulo ES6

---

## Desafio 5: Symbol.iterator Customizado

Crie uma classe `Intervalo` que pode ser iterada com `for...of`:

```javascript
class Intervalo {
  constructor(inicio, fim) {
    this.inicio = inicio;
    this.fim = fim;
  }
  // Implemente [Symbol.iterator]
}

for (const n of new Intervalo(3, 7)) {
  console.log(n); // 3, 4, 5, 6, 7
}
```
