# Protótipos (Prototype Chain)

## Definição

O sistema de **protótipos** é o mecanismo real de herança em JavaScript. Cada objeto tem uma referência interna (`[[Prototype]]`) a outro objeto — seu **protótipo**. Quando você acessa uma propriedade que não existe no objeto, o motor sobe pela **cadeia de protótipos** até encontrá-la (ou retornar `undefined`).

> Classes são açúcar sintático. Por baixo, `class Cachorro extends Animal` configura a prototype chain exatamente como descrito aqui.

---

## 1. `__proto__` vs `prototype`

```
Toda FUNÇÃO tem:     .prototype  → objeto que será o protótipo das instâncias criadas com new
Todo OBJETO tem:     __proto__   → referência ao protótipo (acesso via Object.getPrototypeOf)
```

```javascript
function Pessoa(nome) {
  this.nome = nome;
}

Pessoa.prototype.saudar = function() {
  return `Olá, sou ${this.nome}`;
};

const felix = new Pessoa("Felix");

console.log(felix.__proto__ === Pessoa.prototype);          // true
console.log(Object.getPrototypeOf(felix) === Pessoa.prototype); // true (forma recomendada)

console.log(felix.saudar()); // "Olá, sou Felix"
// felix não TEM saudar → sobe para Pessoa.prototype → encontra!
```

---

## 2. A Cadeia de Protótipos

```javascript
const felix = new Pessoa("Felix");

// felix.saudar() → busca em felix → não tem → Pessoa.prototype → ENCONTROU ✓
// felix.toString() → felix → Pessoa.prototype → Object.prototype → ENCONTROU ✓
// felix.xyz → felix → Pessoa.prototype → Object.prototype → null → undefined
```

```
┌─────────────────────┐
│ felix               │
│  nome: "Felix"      │
│  __proto__ ─────────┼───→ ┌──────────────────────┐
└─────────────────────┘     │ Pessoa.prototype      │
                            │  saudar: function     │
                            │  constructor: Pessoa  │
                            │  __proto__ ───────────┼──→ ┌─────────────────────┐
                            └──────────────────────┘    │ Object.prototype     │
                                                        │  toString()          │
                                                        │  hasOwnProperty()    │
                                                        │  __proto__ → null    │
                                                        └─────────────────────┘
```

---

## 3. `Object.create()` — Herança pura por protótipo

```javascript
const animal = {
  tipo: "Animal",
  falar() {
    return `${this.nome} faz um som.`;
  }
};

// Cria objeto com animal como protótipo
const gato = Object.create(animal);
gato.nome = "Mimi";

console.log(gato.falar());       // "Mimi faz um som."
console.log(gato.tipo);          // "Animal" (herdado)
console.log(gato.hasOwnProperty("nome")); // true
console.log(gato.hasOwnProperty("tipo")); // false (do protótipo)
```

---

## 4. Prototype Chain com Funções Construtoras (pré-ES6)

```javascript
// Isso é o que class + extends faz por baixo:

function Animal(nome) {
  this.nome = nome;
}
Animal.prototype.falar = function() {
  return `${this.nome} faz um som`;
};

function Cachorro(nome, raca) {
  Animal.call(this, nome); // equivalente a super(nome)
  this.raca = raca;
}

// Configurar a cadeia de protótipos (equivalente a extends)
Cachorro.prototype = Object.create(Animal.prototype);
Cachorro.prototype.constructor = Cachorro; // corrigir referência

Cachorro.prototype.latir = function() {
  return `${this.nome} late!`;
};

const rex = new Cachorro("Rex", "Pastor");
console.log(rex.falar()); // "Rex faz um som" (de Animal.prototype)
console.log(rex.latir()); // "Rex late!" (de Cachorro.prototype)
```

---

## 5. Verificações de Protótipo

```javascript
const rex = new Cachorro("Rex", "Pastor");

// instanceof — verifica a cadeia de protótipos
rex instanceof Cachorro; // true
rex instanceof Animal;   // true
rex instanceof Object;   // true

// isPrototypeOf — verifica se está na cadeia
Animal.prototype.isPrototypeOf(rex); // true

// hasOwnProperty — propriedade PRÓPRIA (não herdada)
rex.hasOwnProperty("nome");  // true (definida no constructor)
rex.hasOwnProperty("falar"); // false (está no prototype)

// Object.keys — retorna apenas propriedades próprias enumeráveis
console.log(Object.keys(rex)); // ["nome", "raca"]
```

---

## 6. Protótipos dos Tipos Nativos

```javascript
// Todos os tipos nativos usam protótipos:
const arr = [1, 2, 3];
// arr.__proto__ === Array.prototype
// Array.prototype.__proto__ === Object.prototype

const str = "hello";
// str.__proto__ === String.prototype (boxing temporário)

// Por isso todo array tem .map(), .filter(), etc — vêm de Array.prototype
// Por isso todo objeto tem .toString() — vem de Object.prototype
```

> ⚠️ **Nunca modifique protótipos nativos** (`Array.prototype.meuMetodo = ...`). Isso pode quebrar código de terceiros e criar conflitos futuros com a linguagem.

---

## 7. Resumo

```
PROTÓTIPOS:
  • Todo objeto tem [[Prototype]] (acessível via __proto__ ou Object.getPrototypeOf)
  • Toda função tem .prototype (usado pelo operador new)
  • Cadeia: objeto → prototype → prototype → ... → Object.prototype → null

LOOKUP:
  obj.prop → procura no objeto → sobe a cadeia → null = undefined

CLASS vs PROTÓTIPO:
  class Animal {}        →  function Animal() {}
  class Dog extends Animal  →  Dog.prototype = Object.create(Animal.prototype)
  super(args)            →  Animal.call(this, args)
```

| Ferramenta | Uso |
|------------|-----|
| `Object.create(proto)` | Cria objeto com protótipo específico |
| `Object.getPrototypeOf(obj)` | Retorna o protótipo |
| `obj instanceof Class` | Verifica cadeia de protótipos |
| `obj.hasOwnProperty(key)` | Propriedade própria? |
| `proto.isPrototypeOf(obj)` | Está na cadeia? |

---

> **Próximo módulo:** [06-contexto-de-execucao](../06-contexto-de-execucao/README.md) — O motor por trás da execução.
