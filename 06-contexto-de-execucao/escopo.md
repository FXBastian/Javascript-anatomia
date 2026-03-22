# Escopo (Scope)

## Definição

**Escopo** é o conjunto de regras que determina **onde e como** uma variável pode ser acessada no código. É o "campo de visão" de cada parte do programa — uma variável declarada em um lugar pode ou não ser visível em outro.

O escopo em JavaScript é **léxico** (estático) — ele é definido pela **posição** do código no arquivo, não pela forma como é chamado em tempo de execução.

---

## 1. Tipos de Escopo

```
┌──────────────────────────────────────────────────────────┐
│                    ESCOPO GLOBAL                         │
│  var globalVar = "visível em todo lugar"                 │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │              ESCOPO DE FUNÇÃO                      │  │
│  │  function exemplo() {                              │  │
│  │    var funcVar = "visível só na função"             │  │
│  │                                                    │  │
│  │    ┌──────────────────────────────────────────┐    │  │
│  │    │          ESCOPO DE BLOCO                 │    │  │
│  │    │  if (true) {                             │    │  │
│  │    │    let blocoVar = "só nesse bloco"       │    │  │
│  │    │    const outra = "também só aqui"        │    │  │
│  │    │  }                                       │    │  │
│  │    │  // blocoVar e outra NÃO existem aqui    │    │  │
│  │    └──────────────────────────────────────────┘    │  │
│  │                                                    │  │
│  │  }                                                 │  │
│  │  // funcVar NÃO existe aqui                        │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### 1.1 Escopo Global

Variáveis declaradas fora de qualquer função ou bloco. Acessíveis em **todo** o código.

```javascript
var globalVar = "global com var";
let globalLet = "global com let";
const GLOBAL_CONST = "global com const";

function qualquerFuncao() {
  console.log(globalVar);    // ✓ acessível
  console.log(globalLet);    // ✓ acessível
  console.log(GLOBAL_CONST); // ✓ acessível
}
```

**Diferença importante no browser:**

```javascript
var a = 1;    // window.a = 1        (cria propriedade no objeto global)
let b = 2;    // window.b = undefined (NÃO cria propriedade no objeto global)
const c = 3;  // window.c = undefined (NÃO cria propriedade no objeto global)

// var polui o objeto global; let/const não
```

> ⚠️ **Evite variáveis globais.** Elas podem causar conflitos de nome, são difíceis de rastrear e tornam o código imprevisível.

---

### 1.2 Escopo de Função

Cada função cria seu próprio escopo. Variáveis declaradas dentro da função **não existem** fora dela.

```javascript
function calcular() {
  var x = 10;
  let y = 20;
  const z = 30;

  console.log(x + y + z); // 60
}

calcular();
console.log(x); // ReferenceError
console.log(y); // ReferenceError
console.log(z); // ReferenceError
```

```javascript
// Cada chamada cria um escopo NOVO e independente
function contador() {
  var count = 0;
  count++;
  console.log(count);
}

contador(); // 1
contador(); // 1 (não 2! — count é criado do zero a cada chamada)
```

---

### 1.3 Escopo de Bloco

Introduzido com `let` e `const` no ES6. Qualquer par de `{}` cria um escopo de bloco.

```javascript
if (true) {
  var varDentro = "var ignora blocos";
  let letDentro = "let respeita blocos";
  const constDentro = "const respeita blocos";
}

console.log(varDentro);   // "var ignora blocos" ← var VAZA do bloco!
console.log(letDentro);   // ReferenceError
console.log(constDentro); // ReferenceError
```

```javascript
// Blocos em loops
for (let i = 0; i < 3; i++) {
  // i existe apenas aqui
}
console.log(i); // ReferenceError

for (var j = 0; j < 3; j++) {
  // j existe fora também!
}
console.log(j); // 3 ← var não respeita bloco
```

```javascript
// Blocos puros (sem if/for/while)
{
  let privado = "só existe neste bloco";
  console.log(privado); // ✓
}
console.log(privado); // ReferenceError
```

---

## 2. Escopo Léxico (Lexical Scope)

O conceito **mais fundamental** de escopo em JavaScript.

**Escopo léxico** significa que o escopo de uma função é determinado por **onde ela foi escrita no código** (em tempo de definição), e **não** por onde ou como ela é chamada.

```javascript
const lingua = "pt-BR";

function saudar() {
  // saudar "enxerga" lingua porque foi DEFINIDA no mesmo escopo
  console.log(`Idioma: ${lingua}`);
}

function executar() {
  const lingua = "en-US"; // variável local — NÃO afeta saudar()
  saudar(); // Idioma: pt-BR ← usa o escopo onde foi DEFINIDA
}

executar();
```

```
Por que "pt-BR" e não "en-US"?

saudar() foi DEFINIDA no escopo global
→ seu outer environment é o escopo global
→ lingua no escopo global = "pt-BR"

NÃO importa que executar() tem sua própria lingua = "en-US"
saudar() não foi definida dentro de executar()

ESCOPO LÉXICO = ONDE FOI ESCRITO, NÃO ONDE É CHAMADO
```

### Escopo Léxico Aninhado

```javascript
function nivel1() {
  const a = "A";

  function nivel2() {
    const b = "B";

    function nivel3() {
      const c = "C";
      console.log(a, b, c); // "A", "B", "C" ← enxerga TODOS os níveis acima
    }

    nivel3();
    // console.log(c); // ReferenceError — não enxerga para dentro
  }

  nivel2();
}

nivel1();
```

---

## 3. Scope Chain (Cadeia de Escopos)

Quando o motor precisa resolver uma variável, ele busca:

1. No escopo **atual** (local)
2. Se não encontra → sobe para o escopo **pai** (outer)
3. Continua subindo até chegar ao **escopo global**
4. Se não encontra no global → `ReferenceError`

```javascript
const global = "G";

function externa() {
  const ext = "E";

  function interna() {
    const int = "I";

    console.log(int);    // "I"  ← encontra no escopo local
    console.log(ext);    // "E"  ← sobe 1 nível → escopo de externa()
    console.log(global); // "G"  ← sobe 2 níveis → escopo global
    console.log(naoExiste); // ReferenceError ← não encontra em lugar nenhum
  }

  interna();
}

externa();
```

```
SCOPE CHAIN de interna():

interna() scope  →  externa() scope  →  global scope  →  ReferenceError
   int="I"             ext="E"            global="G"
```

### Shadowing (Sombreamento)

Uma variável local pode "esconder" uma variável de escopo superior com o mesmo nome:

```javascript
const cor = "azul";

function pintar() {
  const cor = "vermelho"; // SHADOW: esconde a cor global
  console.log(cor); // "vermelho"
}

pintar();
console.log(cor); // "azul" — a global não foi afetada
```

```javascript
// Shadowing com parâmetros
const x = 100;

function exemplo(x) { // parâmetro x faz shadow do global x
  console.log(x);
}

exemplo(42); // 42 (parâmetro)
console.log(x); // 100 (global intacta)
```

---

## 4. Closures

Uma **closure** acontece quando uma função "lembra" do escopo onde foi criada, mesmo depois que esse escopo já terminou.

### Como funciona

```javascript
function criarContador() {
  let count = 0; // variável do escopo de criarContador

  return function incrementar() {
    count++; // acessa count via closure
    return count;
  };
  // criarContador() retorna e seu EC é removido da stack...
  // MAS count continua vivo porque incrementar() referencia ele
}

const contador = criarContador(); // criarContador() já retornou!

console.log(contador()); // 1
console.log(contador()); // 2
console.log(contador()); // 3

// count NÃO foi destruído porque a closure mantém a referência
```

### Por que a closure existe?

```
ANTES de criarContador() retornar:
┌─────────────────────────────┐
│ EC: criarContador()         │
│   count = 0                 │
│   incrementar → function    │  ← incrementar referencia count
│   outer → global            │
└─────────────────────────────┘

DEPOIS que criarContador() retorna:
  O EC é removido da stack...
  MAS o Lexical Environment com count é PRESERVADO
  porque incrementar() ainda tem uma referência (outer) para ele.

┌────────────────────────────────────────────────┐
│ incrementar() [closure]                        │
│   outer → { count: 0 }  ← escopo preservado!  │
└────────────────────────────────────────────────┘
```

### Casos de uso reais

#### Encapsulamento (variáveis "privadas")

```javascript
function criarUsuario(nome) {
  let saldo = 0; // "privado" — não acessível de fora

  return {
    depositar(valor) {
      if (valor > 0) saldo += valor;
    },
    getSaldo() {
      return saldo;
    },
    getNome() {
      return nome;
    }
  };
}

const user = criarUsuario("Felix");
user.depositar(100);
console.log(user.getSaldo()); // 100
console.log(user.saldo);      // undefined — NÃO tem acesso direto!
```

#### Factory functions com estado

```javascript
function criarLogger(prefixo) {
  let logCount = 0;

  return function(mensagem) {
    logCount++;
    console.log(`[${prefixo}] #${logCount}: ${mensagem}`);
  };
}

const apiLog = criarLogger("API");
const dbLog = criarLogger("DB");

apiLog("Requisição recebida"); // [API] #1: Requisição recebida
apiLog("Resposta enviada");    // [API] #2: Resposta enviada
dbLog("Query executada");      // [DB] #1: Query executada

// Cada closure tem sua PRÓPRIA cópia das variáveis
```

#### Event handlers com dados

```javascript
function configurarBotoes() {
  const cores = ["vermelho", "azul", "verde"];

  cores.forEach(cor => {
    const btn = document.createElement("button");
    btn.textContent = cor;

    btn.addEventListener("click", () => {
      // Closure captura a variável cor de cada iteração
      document.body.style.backgroundColor = cor;
    });

    document.body.appendChild(btn);
  });
}
```

### Armadilha clássica de closure com `var`

```javascript
// ❌ Todas as funções compartilham o MESMO i
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 3, 3, 3
  }, 100);
}

// ✅ let cria um novo binding por iteração
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 0, 1, 2
  }, 100);
}
```

---

## 5. Módulos e Escopo

### Escopo de módulo (ES Modules)

Cada arquivo `.js` importado como módulo tem seu **próprio escopo** — variáveis do topo do arquivo **não vazam** para o global.

```javascript
// utils.js
const API_URL = "https://api.exemplo.com"; // NÃO é global
export function fetchData() { /* ... */ }

// main.js
import { fetchData } from "./utils.js";
console.log(API_URL); // ReferenceError — não está no escopo de main
```

### IIFE (padrão pré-módulos)

Antes de ES Modules, a IIFE era usada para criar escopos privados:

```javascript
// Padrão Module (IIFE)
const MeuModulo = (function() {
  // Tudo aqui é privado
  let privado = "não acessível";

  function funcaoPrivada() {
    return privado;
  }

  // Só o que for retornado é público
  return {
    getValor: funcaoPrivada
  };
})();

MeuModulo.getValor();  // ✓
MeuModulo.privado;     // undefined
```

---

## 6. Resumo Visual — Regras de Escopo

```
VARIÁVEL DECLARADA COM:

var    → escopo de FUNÇÃO (ignora blocos como if, for)
let    → escopo de BLOCO
const  → escopo de BLOCO
function → escopo de FUNÇÃO (hoisted por completo)

RESOLUÇÃO DE VARIÁVEIS (Scope Chain):

  local → pai → avô → ... → global → ReferenceError

ESCOPO LÉXICO:
  Determinado por ONDE a função está escrita no código.
  NÃO muda em runtime. NÃO depende de quem chama.

CLOSURE:
  Função que acessa variáveis do escopo pai
  MESMO DEPOIS que o escopo pai já terminou.
  O Lexical Environment é preservado pelo Garbage Collector.
```

| Conceito | Definição Rápida |
|----------|-----------------|
| Escopo Global | Acessível em todo o código |
| Escopo de Função | Criado por cada `function` — `var` respeita |
| Escopo de Bloco | Criado por `{}` — `let`/`const` respeitam |
| Escopo Léxico | Determinado pela posição no código-fonte |
| Scope Chain | Busca variável: local → pai → global |
| Shadowing | Variável local "esconde" uma de escopo superior |
| Closure | Função que "lembra" variáveis do escopo onde nasceu |

---

## 7. Erros Comuns

### Achar que `var` respeita blocos

```javascript
if (true) {
  var x = 10;
}
console.log(x); // 10 ← var VAZA do bloco!
// Use let ou const para ter escopo de bloco
```

### Modificar variável global acidentalmente

```javascript
function definirNome() {
  nome = "Felix"; // ❌ Sem var/let/const → cria global implícita!
}
definirNome();
console.log(nome); // "Felix" — poluiu o escopo global

// "use strict" previne isso:
"use strict";
function definirNome() {
  nome = "Felix"; // ReferenceError: nome is not defined
}
```

### Confundir escopo léxico com escopo dinâmico

```javascript
// JavaScript usa escopo LÉXICO, não dinâmico
const valor = "global";

function mostrar() {
  console.log(valor); // sempre olha onde foi DEFINIDA
}

function executar() {
  const valor = "local";
  mostrar(); // "global" — NÃO "local"
}

executar();
```

---

> **Próximo módulo:** [08-assincrono](../08-assincrono/README.md) — Event Loop, Callbacks, Promises e Async/Await.
