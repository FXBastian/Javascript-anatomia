# Herança

## Definição

**Herança** permite que uma classe **filha** reutilize e estenda o comportamento de uma classe **pai**. Em JavaScript, usa-se `extends` para herdar e `super` para acessar a classe pai.

---

## 1. `extends` — Herdar de outra classe

```javascript
class Animal {
  constructor(nome) {
    this.nome = nome;
  }

  falar() {
    return `${this.nome} faz um som.`;
  }
}

class Cachorro extends Animal {
  latir() {
    return `${this.nome} late: Au au!`;
  }
}

const rex = new Cachorro("Rex");
console.log(rex.falar());  // "Rex faz um som." ← herdado de Animal
console.log(rex.latir());  // "Rex late: Au au!" ← próprio de Cachorro
console.log(rex instanceof Cachorro); // true
console.log(rex instanceof Animal);   // true
```

---

## 2. `super` — Acessar a classe pai

### No constructor

```javascript
class Veiculo {
  constructor(marca, ano) {
    this.marca = marca;
    this.ano = ano;
  }
}

class Carro extends Veiculo {
  constructor(marca, ano, portas) {
    super(marca, ano); // DEVE ser chamado ANTES de usar this
    this.portas = portas;
  }

  info() {
    return `${this.marca} ${this.ano} - ${this.portas} portas`;
  }
}

const civic = new Carro("Honda", 2024, 4);
console.log(civic.info()); // "Honda 2024 - 4 portas"
```

> ⚠️ Se a classe filha tem `constructor`, DEVE chamar `super()` antes de usar `this`. Caso contrário: `ReferenceError`.

### Em métodos (override + extensão)

```javascript
class Forma {
  area() {
    return 0;
  }

  descrever() {
    return `Área: ${this.area()}`;
  }
}

class Circulo extends Forma {
  constructor(raio) {
    super();
    this.raio = raio;
  }

  area() {
    return Math.PI * this.raio ** 2; // override: substitui area() do pai
  }

  descrever() {
    return `Círculo (raio=${this.raio}) → ${super.descrever()}`; // chama método do pai
  }
}

const c = new Circulo(5);
console.log(c.area());      // 78.53...
console.log(c.descrever()); // "Círculo (raio=5) → Área: 78.5398..."
```

---

## 3. Polimorfismo

Objetos de classes diferentes respondem ao **mesmo método** de formas diferentes.

```javascript
class Forma {
  area() { return 0; }
}

class Retangulo extends Forma {
  constructor(l, a) { super(); this.largura = l; this.altura = a; }
  area() { return this.largura * this.altura; }
}

class Triangulo extends Forma {
  constructor(b, a) { super(); this.base = b; this.altura = a; }
  area() { return (this.base * this.altura) / 2; }
}

// Polimorfismo: mesma interface, comportamento diferente
const formas = [new Retangulo(10, 5), new Triangulo(10, 5)];

formas.forEach(f => {
  console.log(`${f.constructor.name}: ${f.area()}`);
});
// "Retangulo: 50"
// "Triangulo: 25"
```

---

## 4. Herança de Membros Estáticos

```javascript
class Pai {
  static saudar() {
    return "Olá do Pai";
  }
}

class Filho extends Pai {}

console.log(Filho.saudar()); // "Olá do Pai" — métodos estáticos são herdados
```

---

## 5. Composição vs Herança

Herança não é sempre a melhor solução. **Composição** (ter referências a objetos) é muitas vezes preferível.

```javascript
// ❌ Herança frágil: "um Logger é um FileWriter"? Não faz sentido.
class FileWriter { write(data) { /* escreve arquivo */ } }
class Logger extends FileWriter { log(msg) { this.write(msg); } }

// ✅ Composição: "um Logger USA um writer"
class Logger {
  constructor(writer) {
    this.writer = writer;
  }

  log(msg) {
    this.writer.write(`[LOG] ${msg}`);
  }
}

const logger = new Logger(new FileWriter());
```

> **Regra:** "Favor composition over inheritance" — prefira composição quando a relação não é claramente "é um" (is-a).

---

## Resumo

| Conceito | Sintaxe | Propósito |
|----------|---------|-----------|
| Herdar | `class B extends A` | Reutilizar métodos/propriedades |
| Chamar construtor pai | `super()` | Inicializar a parte herdada |
| Chamar método pai | `super.metodo()` | Estender (não apenas substituir) |
| Override | Redefinir método na filha | Polimorfismo |

---

> **Próximo arquivo:** [prototipos.md](prototipos.md) — O mecanismo real por baixo das classes.
