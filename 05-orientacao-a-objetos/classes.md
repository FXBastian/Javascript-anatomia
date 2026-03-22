# Classes

## Definição

A sintaxe `class` (ES6) é a forma moderna de criar objetos com estrutura e comportamento definidos. Por baixo, classes são **açúcar sintático** sobre o sistema de protótipos — mas oferecem uma sintaxe muito mais clara e organizada.

---

## 1. Declaração Básica

```javascript
class Pessoa {
  // Constructor: executado ao criar uma instância com "new"
  constructor(nome, idade) {
    this.nome = nome;   // propriedade de instância
    this.idade = idade;
  }

  // Método de instância
  apresentar() {
    return `Olá, sou ${this.nome} e tenho ${this.idade} anos.`;
  }
}

const felix = new Pessoa("Felix", 30);
console.log(felix.apresentar()); // "Olá, sou Felix e tenho 30 anos."
console.log(felix.nome);         // "Felix"
console.log(felix instanceof Pessoa); // true
```

```
new Pessoa("Felix", 30) faz:
  1. Cria um objeto vazio {}
  2. Define o protótipo do objeto como Pessoa.prototype
  3. Executa o constructor com this = novo objeto
  4. Retorna o objeto (a menos que constructor retorne outro objeto)
```

---

## 2. Métodos

```javascript
class Calculadora {
  constructor() {
    this.historico = [];
  }

  // Método de instância (vive em Calculadora.prototype)
  somar(a, b) {
    const resultado = a + b;
    this.historico.push(`${a} + ${b} = ${resultado}`);
    return resultado;
  }

  // Getter — acessa como propriedade, não como método
  get ultimaOperacao() {
    return this.historico.at(-1) || "Nenhuma operação";
  }

  // Setter — atribui como propriedade
  set limite(valor) {
    if (valor < 0) throw new Error("Limite deve ser positivo");
    this._limite = valor;
  }

  get limite() {
    return this._limite || 100;
  }
}

const calc = new Calculadora();
calc.somar(2, 3);                    // 5
console.log(calc.ultimaOperacao);    // "2 + 3 = 5" (sem parênteses!)
calc.limite = 50;                    // usa o setter
console.log(calc.limite);           // 50 (usa o getter)
```

---

## 3. Membros Estáticos (`static`)

Pertencem à **classe** em si, não às instâncias.

```javascript
class MathUtils {
  // Método estático — chamado na CLASSE, não na instância
  static somar(a, b) {
    return a + b;
  }

  static PI = 3.14159;

  static circunferencia(raio) {
    return 2 * MathUtils.PI * raio;
  }
}

console.log(MathUtils.somar(2, 3));         // 5
console.log(MathUtils.PI);                  // 3.14159
console.log(MathUtils.circunferencia(10));  // 62.8318

const m = new MathUtils();
// m.somar(2, 3);  // TypeError — não existe na instância
```

### Factory com `static`

```javascript
class Usuario {
  constructor(nome, email, role) {
    this.nome = nome;
    this.email = email;
    this.role = role;
  }

  static criarAdmin(nome, email) {
    return new Usuario(nome, email, "admin");
  }

  static criarVisitante() {
    return new Usuario("Visitante", "", "guest");
  }
}

const admin = Usuario.criarAdmin("Felix", "felix@email.com");
const visitante = Usuario.criarVisitante();
```

---

## 4. Campos Privados (`#`)

Propriedades acessíveis **apenas dentro da classe** (ES2022).

```javascript
class ContaBancaria {
  #saldo = 0;        // campo privado
  #titular;

  constructor(titular, saldoInicial) {
    this.#titular = titular;
    this.#saldo = saldoInicial;
  }

  depositar(valor) {
    if (valor <= 0) throw new Error("Valor deve ser positivo");
    this.#saldo += valor;
  }

  sacar(valor) {
    if (valor > this.#saldo) throw new Error("Saldo insuficiente");
    this.#saldo -= valor;
  }

  get saldo() {
    return this.#saldo;
  }

  // Método privado
  #registrarLog(operacao) {
    console.log(`[LOG] ${this.#titular}: ${operacao}`);
  }
}

const conta = new ContaBancaria("Felix", 1000);
conta.depositar(500);
console.log(conta.saldo);  // 1500 (via getter)
// conta.#saldo;            // SyntaxError! Campo privado
// conta.#registrarLog();   // SyntaxError! Método privado
```

---

## 5. Class Expressions

```javascript
// Anônima
const Animal = class {
  constructor(nome) {
    this.nome = nome;
  }
};

// Nomeada (o nome só é visível dentro da classe)
const Veiculo = class VeiculoInterno {
  tipo() {
    return VeiculoInterno.name; // "VeiculoInterno"
  }
};

const carro = new Veiculo();
// new VeiculoInterno(); // ReferenceError
```

---

## 6. Erros Comuns

### Esquecer `new`

```javascript
const p = Pessoa("Felix", 30); // TypeError: Class constructor cannot be invoked without 'new'
const p = new Pessoa("Felix", 30); // ✅
```

### `this` em callbacks de métodos

```javascript
class Timer {
  constructor() { this.segundos = 0; }

  iniciar() {
    // ❌ this será undefined/window no callback
    setInterval(function() {
      this.segundos++; // TypeError!
    }, 1000);

    // ✅ Arrow function preserva o this léxico
    setInterval(() => {
      this.segundos++;
    }, 1000);
  }
}
```

---

## Resumo

```
class Nome {
  #privado;                    // campo privado
  static estatico = valor;     // campo estático

  constructor(params) {}       // inicialização
  metodo() {}                  // método de instância
  get prop() {}                // getter
  set prop(val) {}             // setter
  #metodoPrivado() {}          // método privado
  static metodo() {}           // método estático
}
```

---

> **Próximo arquivo:** [heranca.md](heranca.md) — Herança com `extends` e `super`.
