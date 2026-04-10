# Projetos Praticos — this

## Projeto 1: Event System com Binding Correto

```javascript
class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(evento, callback) {
    if (!this.listeners[evento]) this.listeners[evento] = [];
    this.listeners[evento].push(callback);
    return this; // encadeamento
  }

  emit(evento, ...args) {
    const handlers = this.listeners[evento] || [];
    handlers.forEach(handler => handler.call(this, ...args));
    return this;
  }

  off(evento, callback) {
    if (!this.listeners[evento]) return this;
    this.listeners[evento] = this.listeners[evento].filter(cb => cb !== callback);
    return this;
  }
}

// Demonstracao de problemas com this
const emitter = new EventEmitter();

// Problema: metodo perde this
const app = {
  nome: "MeuApp",
  iniciar() {
    emitter.on("dados", function (dados) {
      console.log(`${this.nome} recebeu:`, dados); // this = emitter, nao app!
    });
  },
  iniciarCorreto() {
    emitter.on("dados", (dados) => {
      console.log(`${this.nome} recebeu:`, dados); // arrow: this = app
    });
  }
};

app.iniciarCorreto();
emitter.emit("dados", { id: 1 });
```

---

## Projeto 2: Method Chaining com this

```javascript
class Consulta {
  #dados;
  #filtros = [];

  constructor(dados) {
    this.#dados = dados;
  }

  onde(campo, operador, valor) {
    this.#filtros.push({ campo, operador, valor });
    return this; // retorna this para encadeamento
  }

  executar() {
    return this.#dados.filter(item => {
      return this.#filtros.every(({ campo, operador, valor }) => {
        switch (operador) {
          case "===": return item[campo] === valor;
          case ">": return item[campo] > valor;
          case "<": return item[campo] < valor;
          case "includes": return item[campo].includes(valor);
          default: return true;
        }
      });
    });
  }
}

const pessoas = [
  { nome: "Ana", idade: 28, cidade: "SP" },
  { nome: "Carlos", idade: 35, cidade: "RJ" },
  { nome: "Bia", idade: 22, cidade: "SP" },
  { nome: "Daniel", idade: 40, cidade: "MG" }
];

const resultado = new Consulta(pessoas)
  .onde("cidade", "===", "SP")
  .onde("idade", ">", 25)
  .executar();

console.log(resultado); // [{ nome: "Ana", idade: 28, cidade: "SP" }]
```

---

## Projeto 3: Bind Polyfill Completo

```javascript
Function.prototype.meuBind = function (contexto, ...argsParciais) {
  const funcaoOriginal = this;

  const bound = function (...argsNovos) {
    // Se chamado com new, this deve ser a nova instancia
    const eNew = this instanceof bound;
    return funcaoOriginal.apply(
      eNew ? this : contexto,
      [...argsParciais, ...argsNovos]
    );
  };

  // Manter cadeia de prototipos para new
  bound.prototype = Object.create(funcaoOriginal.prototype);
  return bound;
};

// Teste
function Pessoa(nome, idade) {
  this.nome = nome;
  this.idade = idade;
}

const CriarJovem = Pessoa.meuBind(null, "Jovem");
const p = new CriarJovem(20);
console.log(p); // Pessoa { nome: "Jovem", idade: 20 }
console.log(p instanceof Pessoa); // true
```
