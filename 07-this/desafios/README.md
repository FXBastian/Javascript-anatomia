# Desafios — this

## Desafio 1: Prever o this

Sem executar, diga qual sera o valor de `this` em cada caso:

```javascript
const obj = {
  nome: "Teste",
  regular: function () { console.log(this.nome); },
  arrow: () => { console.log(this.nome); },
  aninhada: function () {
    function interna() { console.log(this.nome); }
    interna();
  },
  aninhadaArrow: function () {
    const interna = () => { console.log(this.nome); };
    interna();
  }
};

obj.regular();        // ?
obj.arrow();          // ?
obj.aninhada();       // ?
obj.aninhadaArrow();  // ?

const fn = obj.regular;
fn();                 // ?
```

---

## Desafio 2: call, apply, bind

Reimplemente `call` e `apply` sem usar os metodos nativos:

```javascript
Function.prototype.meuCall = function (contexto, ...args) {
  // Implemente aqui
};

Function.prototype.meuApply = function (contexto, args) {
  // Implemente aqui
};
```

---

## Desafio 3: this em Classes vs Objetos Literais

Explique e demonstre a diferenca do comportamento do `this`:

```javascript
class Carro {
  constructor(marca) { this.marca = marca; }
  mostrar() { return this.marca; }
}

const obj = {
  marca: "Fiat",
  mostrar() { return this.marca; }
};

// Extrair o metodo:
const m1 = new Carro("BMW").mostrar;
const m2 = obj.mostrar;

// m1() e m2() produzem o mesmo resultado? Por que?
```

---

## Desafio 4: this em Callbacks do DOM

```javascript
// Cenario: botao no navegador
const botao = document.createElement("button");
botao.id = "meuBtn";

const controller = {
  contagem: 0,
  incrementar() {
    this.contagem++;
    console.log(this.contagem);
  }
};

// Qual forma funciona corretamente? Por que?
botao.addEventListener("click", controller.incrementar);
botao.addEventListener("click", controller.incrementar.bind(controller));
botao.addEventListener("click", () => controller.incrementar());
```

---

## Desafio 5: this com new

Explique o que acontece internamente quando usamos `new`:

```javascript
function MeuObjeto(valor) {
  this.valor = valor;
  // return { outro: true }; // O que acontece se descomentar?
}

const a = new MeuObjeto(42);
console.log(a.valor); // ?

// Implemente uma funcao meuNew(Construtor, ...args) que simula o new
```
