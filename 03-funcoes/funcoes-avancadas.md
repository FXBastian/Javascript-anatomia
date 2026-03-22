# Funções Avançadas — Higher-Order, Closures, Currying e Composição

## Definição

Funções avançadas são padrões que exploram o fato de funções serem **cidadãs de primeira classe** em JavaScript. Esses padrões são a base da **programação funcional** e estão presentes em todo código JavaScript profissional.

---

## 1. Higher-Order Functions (Funções de Ordem Superior)

### O que são

Uma função de ordem superior é aquela que:
- **Recebe** outra função como argumento, e/ou
- **Retorna** uma função como resultado

```javascript
// Recebe função como argumento
function executar(fn, valor) {
  return fn(valor);
}

executar(x => x * 2, 5); // 10

// Retorna uma função
function criarSaudacao(saudacao) {
  return function(nome) {
    return `${saudacao}, ${nome}!`;
  };
}

const ola = criarSaudacao("Olá");
const bomDia = criarSaudacao("Bom dia");

console.log(ola("Felix"));     // "Olá, Felix!"
console.log(bomDia("Ana"));    // "Bom dia, Ana!"
```

### Higher-Order Functions nativas de Array

Os métodos mais usados de arrays são HOFs — recebem callbacks:

```javascript
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map — transforma cada elemento
const dobrados = numeros.map(n => n * 2);
// [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// filter — filtra elementos que passam no teste
const pares = numeros.filter(n => n % 2 === 0);
// [2, 4, 6, 8, 10]

// reduce — acumula em um único valor
const soma = numeros.reduce((acc, n) => acc + n, 0);
// 55

// find — encontra o primeiro que passa no teste
const maior5 = numeros.find(n => n > 5);
// 6

// some — pelo menos um passa?
const temNegativo = numeros.some(n => n < 0);
// false

// every — todos passam?
const todosMenor100 = numeros.every(n => n < 100);
// true

// sort — ordena (com comparador)
const desordenados = [5, 2, 8, 1, 9];
const ordenados = [...desordenados].sort((a, b) => a - b);
// [1, 2, 5, 8, 9]
```

### Caso de uso real: pipeline de dados

```javascript
const vendas = [
  { produto: "Notebook", valor: 3500, categoria: "tech" },
  { produto: "Mouse", valor: 80, categoria: "tech" },
  { produto: "Cadeira", valor: 900, categoria: "moveis" },
  { produto: "Monitor", valor: 1500, categoria: "tech" },
  { produto: "Mesa", valor: 600, categoria: "moveis" }
];

// "Qual o total de vendas de produtos tech acima de R$100?"
const totalTech = vendas
  .filter(v => v.categoria === "tech")
  .filter(v => v.valor > 100)
  .reduce((total, v) => total + v.valor, 0);

console.log(totalTech); // 5000
```

### Criando sua própria HOF

```javascript
// Repetir uma operação N vezes
function repetir(n, acao) {
  for (let i = 0; i < n; i++) {
    acao(i);
  }
}

repetir(3, i => console.log(`Iteração ${i}`));
// Iteração 0
// Iteração 1
// Iteração 2
```

```javascript
// Criar validador reutilizável
function criarValidador(regra, mensagem) {
  return function(valor) {
    if (!regra(valor)) {
      return { valido: false, erro: mensagem };
    }
    return { valido: true };
  };
}

const validarEmail = criarValidador(
  v => v.includes("@"),
  "E-mail deve conter @"
);

const validarMinimo = criarValidador(
  v => v.length >= 3,
  "Mínimo de 3 caracteres"
);

console.log(validarEmail("felix@mail.com")); // { valido: true }
console.log(validarEmail("felix"));           // { valido: false, erro: "E-mail deve conter @" }
console.log(validarMinimo("ab"));             // { valido: false, erro: "Mínimo de 3 caracteres" }
```

---

## 2. Closures (Fechamentos)

### O que é

Uma **closure** é criada quando uma função **"lembra"** das variáveis do escopo onde foi definida, mesmo após esse escopo ter terminado.

```javascript
function criarContador() {
  let count = 0; // variável no escopo de criarContador

  return function() {
    count++; // acessa count mesmo após criarContador ter retornado
    return count;
  };
}

const contador = criarContador();
console.log(contador()); // 1
console.log(contador()); // 2
console.log(contador()); // 3
// "count" ainda existe — a closure mantém a referência
```

### Estrutura interna

```
criarContador() é chamada
  │
  ├── Cria variável local: count = 0
  ├── Cria função interna que referencia "count"
  └── Retorna a função interna
  
criarContador() encerra... mas:
  │
  └── A função retornada MANTÉM referência ao escopo
      de criarContador → count continua acessível

contador() → count++ → retorna count
  A closure "fecha sobre" (closes over) a variável count
```

### Cada chamada cria uma closure independente

```javascript
function criarContador(inicio) {
  let valor = inicio;
  return {
    incrementar: () => ++valor,
    obter: () => valor
  };
}

const contA = criarContador(0);
const contB = criarContador(100);

contA.incrementar(); // 1
contA.incrementar(); // 2
contB.incrementar(); // 101

console.log(contA.obter()); // 2
console.log(contB.obter()); // 101
// São closures INDEPENDENTES — cada uma com seu "valor"
```

### Caso de uso: encapsulamento (dados privados)

```javascript
function criarCarteira(saldoInicial) {
  let saldo = saldoInicial; // "privado" — não acessível de fora

  return {
    depositar(valor) {
      if (valor <= 0) throw new Error("Valor deve ser positivo");
      saldo += valor;
      return saldo;
    },
    sacar(valor) {
      if (valor > saldo) throw new Error("Saldo insuficiente");
      saldo -= valor;
      return saldo;
    },
    consultarSaldo() {
      return saldo;
    }
  };
}

const carteira = criarCarteira(1000);
carteira.depositar(500);  // 1500
carteira.sacar(200);      // 1300
console.log(carteira.consultarSaldo()); // 1300
// console.log(carteira.saldo);          // undefined — não acessível!
```

### Caso de uso: funções de cache (memoization)

```javascript
function memoize(fn) {
  const cache = new Map(); // closure sobre o cache

  return function(...args) {
    const chave = JSON.stringify(args);

    if (cache.has(chave)) {
      console.log("Cache hit!");
      return cache.get(chave);
    }

    const resultado = fn(...args);
    cache.set(chave, resultado);
    return resultado;
  };
}

const fatorial = memoize(function calc(n) {
  if (n <= 1) return 1;
  return n * calc(n - 1);
});

console.log(fatorial(5)); // 120 (calculou)
console.log(fatorial(5)); // 120 (Cache hit! — pegou do cache)
```

### Armadilha clássica: closure no loop com `var`

```javascript
// ❌ Todas as funções compartilham o MESMO i (var é function-scoped)
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
// Saída: 3, 3, 3

// ✅ Solução 1: usar let (block-scoped — cria novo binding a cada iteração)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
// Saída: 0, 1, 2

// ✅ Solução 2: IIFE cria closure com valor capturado
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, 100);
  })(i);
}
// Saída: 0, 1, 2
```

---

## 3. Currying

### O que é

**Currying** transforma uma função que recebe múltiplos argumentos em uma sequência de funções que recebem **um argumento por vez**.

```javascript
// Normal: recebe todos os argumentos de uma vez
function somar(a, b, c) {
  return a + b + c;
}
somar(1, 2, 3); // 6

// Curried: recebe um argumento por vez
function somarCurried(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
somarCurried(1)(2)(3); // 6

// Com arrow functions — muito mais limpo
const somarCurried = a => b => c => a + b + c;
somarCurried(1)(2)(3); // 6
```

### Por que currying é útil: aplicação parcial

```javascript
// Criar funções especializadas a partir de uma genérica
const desconto = percentual => preco => preco * (1 - percentual / 100);

const desconto10 = desconto(10);
const desconto20 = desconto(20);
const descontoBlackFriday = desconto(50);

console.log(desconto10(100));           // 90
console.log(desconto20(100));           // 80
console.log(descontoBlackFriday(100));  // 50

// Usar com map
const precos = [50, 100, 200, 500];
const comDesconto = precos.map(desconto10);
console.log(comDesconto); // [45, 90, 180, 450]
```

### Caso de uso: configuração de logger

```javascript
const logger = modulo => nivel => mensagem => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${modulo}] [${nivel}] ${mensagem}`);
};

// Criar loggers especializados
const logAuth = logger("AUTH");
const logAuthInfo = logAuth("INFO");
const logAuthError = logAuth("ERROR");

const logDB = logger("DATABASE");
const logDBInfo = logDB("INFO");

logAuthInfo("Usuário logou");
// [2026-03-22T...] [AUTH] [INFO] Usuário logou

logAuthError("Senha incorreta");
// [2026-03-22T...] [AUTH] [ERROR] Senha incorreta

logDBInfo("Query executada");
// [2026-03-22T...] [DATABASE] [INFO] Query executada
```

### Função curry genérica

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...maisArgs) => curried(...args, ...maisArgs);
  };
}

const soma3 = curry((a, b, c) => a + b + c);

console.log(soma3(1)(2)(3));    // 6
console.log(soma3(1, 2)(3));    // 6
console.log(soma3(1)(2, 3));    // 6
console.log(soma3(1, 2, 3));    // 6
```

---

## 4. Composição de Funções

### O que é

**Composição** é combinar duas ou mais funções para criar uma nova — a saída de uma vira entrada da próxima.

```
f(x) → resultado1 → g(resultado1) → resultado2

compose(g, f)(x)  =  g(f(x))
pipe(f, g)(x)     =  g(f(x))
```

### Implementação

```javascript
// Compose — executa da DIREITA para a ESQUERDA (estilo matemático)
const compose = (...fns) => x => fns.reduceRight((v, fn) => fn(v), x);

// Pipe — executa da ESQUERDA para a DIREITA (mais intuitivo)
const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x);
```

### Exemplo prático

```javascript
const trim = str => str.trim();
const minusculas = str => str.toLowerCase();
const separar = str => str.split(" ");
const primeiroNome = arr => arr[0];

// Com pipe (da esquerda para direita — mais natural)
const obterPrimeiroNome = pipe(
  trim,
  minusculas,
  separar,
  primeiroNome
);

console.log(obterPrimeiroNome("  Felix SANTOS  ")); // "felix"
```

### Caso de uso real: processamento de dados

```javascript
const formatar = pipe(
  dados => dados.filter(d => d.ativo),
  dados => dados.map(d => ({ ...d, nome: d.nome.toUpperCase() })),
  dados => dados.sort((a, b) => a.nome.localeCompare(b.nome))
);

const usuarios = [
  { nome: "Felix", ativo: true },
  { nome: "Ana", ativo: false },
  { nome: "Carlos", ativo: true },
  { nome: "Diana", ativo: true }
];

console.log(formatar(usuarios));
// [{ nome: "CARLOS", ativo: true }, { nome: "DIANA", ativo: true }, { nome: "FELIX", ativo: true }]
```

---

## 5. Recursão

### O que é

Uma função que **chama a si mesma** até atingir uma condição de parada (caso base).

```javascript
// Caso clássico: fatorial
function fatorial(n) {
  if (n <= 1) return 1;    // caso base
  return n * fatorial(n - 1); // chamada recursiva
}

console.log(fatorial(5)); // 120
// 5 * fatorial(4) → 5 * 4 * fatorial(3) → ... → 5 * 4 * 3 * 2 * 1
```

### Fluxo visual

```
fatorial(5)
  └─ 5 * fatorial(4)
         └─ 4 * fatorial(3)
                └─ 3 * fatorial(2)
                       └─ 2 * fatorial(1)
                              └─ return 1  ← caso base
                       └─ return 2 * 1 = 2
                └─ return 3 * 2 = 6
         └─ return 4 * 6 = 24
  └─ return 5 * 24 = 120
```

### Caso de uso: percorrer estrutura em árvore

```javascript
const arvore = {
  nome: "Raiz",
  filhos: [
    {
      nome: "A",
      filhos: [
        { nome: "A1", filhos: [] },
        { nome: "A2", filhos: [] }
      ]
    },
    {
      nome: "B",
      filhos: [
        { nome: "B1", filhos: [] }
      ]
    }
  ]
};

function listarNomes(no, nivel = 0) {
  console.log("  ".repeat(nivel) + no.nome);
  for (const filho of no.filhos) {
    listarNomes(filho, nivel + 1);
  }
}

listarNomes(arvore);
// Raiz
//   A
//     A1
//     A2
//   B
//     B1
```

### Cuidado: Stack Overflow

```javascript
// ❌ Sem caso base → stack overflow
function infinita() {
  return infinita(); // RangeError: Maximum call stack size exceeded
}

// ✅ Sempre tenha um caso base claro
function contagem(n) {
  if (n <= 0) return; // caso base
  console.log(n);
  contagem(n - 1);
}
```

---

## 6. `bind`, `call` e `apply`

Métodos que permitem definir explicitamente o `this` de uma função.

### `call` — chama função com `this` definido

```javascript
function saudar(cumprimento) {
  return `${cumprimento}, ${this.nome}!`;
}

const user = { nome: "Felix" };
console.log(saudar.call(user, "Olá")); // "Olá, Felix!"
```

### `apply` — igual a call, mas args em array

```javascript
console.log(saudar.apply(user, ["Bom dia"])); // "Bom dia, Felix!"

// Uso prático antes do spread:
const numeros = [5, 2, 8, 1, 9];
console.log(Math.max.apply(null, numeros)); // 9
// Hoje use: Math.max(...numeros)
```

### `bind` — retorna nova função com this fixo

```javascript
const saudarFelix = saudar.bind(user);
console.log(saudarFelix("Oi")); // "Oi, Felix!"

// Caso de uso: event handlers
class Botao {
  constructor(label) {
    this.label = label;
    this.handleClick = this.handleClick.bind(this);
    // Agora handleClick sempre tem this = instância
  }

  handleClick() {
    console.log(`Clicou em: ${this.label}`);
  }
}
```

### `call` vs `apply` vs `bind`

| Método | Executa? | Argumentos | Retorno |
|--------|---------|-----------|---------|
| `call` | ✅ Sim | Separados: `fn.call(this, a, b)` | Resultado da função |
| `apply` | ✅ Sim | Array: `fn.apply(this, [a, b])` | Resultado da função |
| `bind` | ❌ Não | Separados: `fn.bind(this, a, b)` | Nova função com this fixo |

---

## 7. Erros Comuns

### Closure captura referência, não valor

```javascript
function criarFuncoes() {
  const fns = [];
  for (var i = 0; i < 3; i++) {
    fns.push(() => i); // captura REFERÊNCIA de i
  }
  return fns;
}

const [a, b, c] = criarFuncoes();
console.log(a(), b(), c()); // 3, 3, 3 ← todas retornam 3!

// Solução: use let
function criarFuncoes() {
  const fns = [];
  for (let i = 0; i < 3; i++) {
    fns.push(() => i);
  }
  return fns;
}
const [a, b, c] = criarFuncoes();
console.log(a(), b(), c()); // 0, 1, 2 ✅
```

### Recursão sem caso base

```javascript
// ❌ Sempre vai estourar a pilha
function processar(lista) {
  return processar(lista.slice(1)); // sem condição de parada!
}
```

### Performance com closures desnecessárias

```javascript
// ❌ Criar função dentro de loop (cria closure a cada iteração)
for (let i = 0; i < 10000; i++) {
  element.addEventListener("click", function() { /* ... */ });
}

// ✅ Definir a função fora
function handleClick() { /* ... */ }
for (let i = 0; i < 10000; i++) {
  element.addEventListener("click", handleClick);
}
```

---

## Resumo

| Conceito | O que é | Uso principal |
|----------|---------|--------------|
| Higher-Order Function | Recebe ou retorna função | map, filter, reduce, callbacks |
| Closure | Função que lembra do escopo onde nasceu | Dados privados, cache, contadores |
| Currying | f(a, b, c) → f(a)(b)(c) | Funções especializadas, configuração |
| Composição | Encadear funções (saída → entrada) | Pipelines de transformação |
| Recursão | Função que chama a si mesma | Árvores, divisão e conquista |

**Conexão com outros módulos:**
- Módulo 06 explica POR QUE closures funcionam (escopo léxico)
- Módulo 04 usa HOFs intensamente (métodos de array)
- Módulo 08 usa callbacks em operações assíncronas

---

> **Próximo módulo:** [04-estruturas-de-dados](../04-estruturas-de-dados/README.md) — Objetos e Arrays em profundidade.
