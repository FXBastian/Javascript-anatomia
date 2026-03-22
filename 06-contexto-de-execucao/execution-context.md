# Execution Context (Contexto de Execução)

## Definição

O **Execution Context** (EC) é o ambiente abstrato onde o código JavaScript é avaliado e executado. Toda vez que o motor JS executa um trecho de código, ele cria um contexto de execução contendo **tudo** que aquele código precisa: variáveis, funções, referência ao escopo externo, valor de `this`, etc.

> **Analogia:** Pense no EC como uma "sala de trabalho" — cada vez que uma função é chamada, o motor monta uma nova sala com tudo que a função precisa (variáveis locais, parâmetros, acesso ao corredor que leva às salas anteriores). Quando a função termina, a sala é desmontada.

---

## 1. Tipos de Execution Context

Existem **três** tipos:

### 1.1 Global Execution Context (GEC)

Criado automaticamente quando o script começa a rodar. Existe **apenas um** por programa.

```
┌─────────────────────────────────────────┐
│        GLOBAL EXECUTION CONTEXT         │
│                                         │
│  • Cria o objeto global:                │
│    - Browser → window                   │
│    - Node.js → global / globalThis      │
│                                         │
│  • Define this = objeto global          │
│                                         │
│  • Aloca memória para variáveis e       │
│    funções declaradas no nível global   │
└─────────────────────────────────────────┘
```

```javascript
// Isso roda dentro do Global Execution Context
var nome = "Felix";
function saudar() {
  return `Olá, ${nome}`;
}

// No browser:
console.log(this === window);     // true (no GEC)
console.log(window.nome);         // "Felix" (var cria propriedade no global)
console.log(window.saudar);       // function saudar() {...}
```

### 1.2 Function Execution Context (FEC)

Criado **cada vez** que uma função é **chamada** (não quando é declarada).

```javascript
function soma(a, b) {
  // Um novo Function EC é criado aqui
  const resultado = a + b;
  return resultado;
  // Quando a função retorna, esse EC é destruído
}

soma(2, 3); // Cria EC #1 para soma
soma(5, 7); // Cria EC #2 para soma (novo e independente)
```

### 1.3 Eval Execution Context

Criado quando código é executado dentro de `eval()`. **Evite `eval()`** — é um risco de segurança e dificulta otimizações do motor.

---

## 2. As Duas Fases do Execution Context

Este é o conceito **mais importante** deste módulo. Todo EC passa por duas fases:

```
╔══════════════════════════════════════════════════════════╗
║              CICLO DE VIDA DO EC                        ║
║                                                         ║
║  FASE 1: CRIAÇÃO (Creation Phase)                       ║
║  ├─ 1. Cria o Environment Record (registro de variáveis)║
║  ├─ 2. Define a Scope Chain (cadeia de escopos)         ║
║  ├─ 3. Define o valor de this                           ║
║  ├─ 4. Aloca memória para declarações de função         ║
║  │     (function declarations são totalmente hoisted)   ║
║  └─ 5. Aloca memória para var (valor = undefined)       ║
║        let/const ficam na TDZ (Temporal Dead Zone)      ║
║                                                         ║
║  FASE 2: EXECUÇÃO (Execution Phase)                     ║
║  ├─ 1. Código é executado linha por linha               ║
║  ├─ 2. Variáveis recebem seus valores reais             ║
║  ├─ 3. Chamadas de função criam novos ECs               ║
║  └─ 4. Expressões são avaliadas                         ║
╚══════════════════════════════════════════════════════════╝
```

### Exemplo detalhado passo a passo

```javascript
var cor = "azul";
let tamanho = 10;

function pintar(objeto) {
  var resultado = `${objeto} pintado de ${cor}`;
  return resultado;
}

const saida = pintar("muro");
```

#### FASE 1 — Criação (antes de executar qualquer linha)

```
Global EC (Creation Phase):
┌────────────────────────────────────┐
│ cor        → undefined   (var)     │  ← hoisted com undefined
│ tamanho   → <TDZ>       (let)     │  ← hoisted mas inacessível
│ pintar    → function(){} (ref)     │  ← function declaration: hoisted POR COMPLETO
│ saida     → <TDZ>       (const)   │  ← hoisted mas inacessível
│ this      → window/global          │
│ Outer Env → null (é o global)      │
└────────────────────────────────────┘
```

#### FASE 2 — Execução (linha por linha)

```
Linha 1: cor = "azul"         → cor agora é "azul"
Linha 2: tamanho = 10         → tamanho sai da TDZ, recebe 10
Linha 3-6: pintar já foi hoisted, pula
Linha 8: saida = pintar("muro")  → CRIA NOVO EC para pintar()
```

Quando `pintar("muro")` é chamada, um **novo Function EC** é criado:

```
Function EC — pintar() (Creation Phase):
┌────────────────────────────────────┐
│ arguments → { 0: "muro" }         │
│ objeto    → "muro"    (parâmetro) │
│ resultado → undefined (var)        │
│ this      → window (não-strict)    │
│ Outer Env → Global EC              │  ← referência léxica ao escopo pai
└────────────────────────────────────┘

Function EC — pintar() (Execution Phase):
Linha 4: resultado = "muro pintado de azul"
Linha 5: return resultado → EC é removido da stack
```

---

## 3. Estrutura Interna do Execution Context

Cada EC é composto por três componentes:

### 3.1 Variable Environment (Ambiente de Variáveis)

Armazena as variáveis declaradas com `var` e as function declarations.

### 3.2 Lexical Environment (Ambiente Léxico)

Armazena as variáveis declaradas com `let` e `const`. Contém:

- **Environment Record:** armazena as variáveis e funções locais
- **Outer Lexical Environment Reference:** ponteiro para o escopo pai

```
Lexical Environment de pintar():
┌──────────────────────────────────────┐
│ Environment Record:                  │
│   objeto    → "muro"                │
│   resultado → undefined → "muro..."  │
│                                      │
│ Outer Reference → Global Lexical Env │
│   ┌──────────────────────────────┐   │
│   │ cor      → "azul"           │   │
│   │ tamanho  → 10               │   │
│   │ pintar   → fn               │   │
│   │ saida    → <TDZ>            │   │
│   │ Outer Ref → null            │   │
│   └──────────────────────────────┘   │
└──────────────────────────────────────┘
```

### 3.3 This Binding

O valor de `this` é determinado na fase de criação (exceto em arrow functions, que herdam o `this` léxico). Veja o **Módulo 07** para aprofundamento.

---

## 4. Contextos Aninhados — Visualização Completa

```javascript
var x = 10;

function externa() {
  var y = 20;

  function interna() {
    var z = 30;
    console.log(x + y + z); // 60
  }

  interna(); // cria EC para interna()
}

externa(); // cria EC para externa()
```

```
CALL STACK nesse momento (pilha):
┌──────────────────┐
│  EC: interna()   │  ← topo (executando agora)
│  z = 30          │
│  outer → externa │
├──────────────────┤
│  EC: externa()   │
│  y = 20          │
│  outer → global  │
├──────────────────┤
│  EC: Global      │  ← base (sempre presente)
│  x = 10          │
│  outer → null    │
└──────────────────┘

Para resolver x + y + z:
  z → encontra em interna()        ✓
  y → não está em interna() → sobe para externa() → encontra  ✓
  x → não está em interna() nem externa() → sobe para global → encontra  ✓
```

---

## 5. EC com let/const vs var — Diferença na Prática

```javascript
console.log(a); // undefined      ← var é hoisted com undefined
console.log(b); // ReferenceError ← let está na TDZ

var a = 1;
let b = 2;
```

Por quê? Na **fase de criação**:
- `var a` → alocada no Variable Environment com valor `undefined`
- `let b` → alocada no Lexical Environment mas marcada como **não inicializada** (TDZ)

```
Creation Phase:
┌────────────────────────────────┐
│ Variable Environment:          │
│   a → undefined                │  ← acessível (valor undefined)
│                                │
│ Lexical Environment:           │
│   b → <uninitialized>         │  ← NÃO acessível (TDZ)
└────────────────────────────────┘
```

---

## 6. Resumo Visual

```
CÓDIGO INICIA
     │
     ▼
┌─────────────────────────┐
│ GLOBAL EC é criado       │
│ (Creation → Execution)   │
└────────┬────────────────┘
         │  função chamada?
         ▼
┌─────────────────────────┐
│ FUNCTION EC é criado     │
│ (Creation → Execution)   │    ← pode criar outros Function ECs
└────────┬────────────────┘
         │  função retorna?
         ▼
┌─────────────────────────┐
│ Function EC é REMOVIDO   │
│ da Call Stack             │
└─────────────────────────┘
```

| Aspecto | Global EC | Function EC |
|---------|-----------|-------------|
| Quando é criado | Ao iniciar o script | Ao chamar a função |
| Quantos existem | Apenas 1 | 1 por chamada |
| `this` | `window` / `global` | Depende de como foi chamada |
| Outer Environment | `null` | EC onde a função foi **definida** |
| Destruído quando | Script termina | Função retorna |

---

> **Próximo arquivo:** [call-stack.md](call-stack.md) — Como o motor gerencia múltiplos contextos usando uma pilha.
