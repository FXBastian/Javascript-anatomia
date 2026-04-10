# 📘 JavaScript — Anatomia Completa da Linguagem

> Material profissional de estudo de JavaScript, do básico ao avançado.
> Organizado como documentação técnica modular, pronto para leitura no VS Code e exportação para PDF.

---

## 🧭 Visão Geral

Este repositório é um **guia completo de JavaScript** estruturado como um livro técnico. Cada módulo é uma pasta contendo arquivos `.md` independentes que cobrem subtemas com:

- Definição clara
- Explicação detalhada
- Estrutura interna (como funciona por baixo dos panos)
- Exemplos de código comentados
- Casos de uso reais
- Boas práticas e erros comuns

---

## 📂 Estrutura do Projeto

```
javascript-estudo/
│
├── 01-fundamentos/
│   ├── README.md
│   ├── sintaxe.md
│   ├── tipos-de-dados.md
│   ├── variaveis.md
│   ├── operadores.md
│   ├── treino-fundamentos.js
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 02-controle-de-execucao/
│   ├── README.md
│   ├── condicionais.md
│   ├── loops.md
│   ├── controle-de-fluxo.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 03-funcoes/
│   ├── README.md
│   ├── declaracao.md
│   ├── parametros-retorno.md
│   ├── arrow-functions.md
│   ├── funcoes-avancadas.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 04-estruturas-de-dados/
│   ├── README.md
│   ├── objetos.md
│   ├── arrays.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 05-orientacao-a-objetos/
│   ├── README.md
│   ├── classes.md
│   ├── heranca.md
│   ├── prototipos.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 06-contexto-de-execucao/
│   ├── README.md
│   ├── execution-context.md
│   ├── call-stack.md
│   ├── hoisting.md
│   ├── escopo.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 07-this/
│   ├── README.md
│   ├── this.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 08-assincrono/
│   ├── README.md
│   ├── callbacks.md
│   ├── promises.md
│   ├── async-await.md
│   ├── event-loop.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 09-es6-plus/
│   ├── README.md
│   ├── destructuring.md
│   ├── spread-rest.md
│   ├── template-literals.md
│   ├── optional-chaining.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 10-colecoes/
│   ├── README.md
│   ├── map.md
│   ├── set.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 11-iteradores/
│   ├── README.md
│   ├── iterators.md
│   ├── generators.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 12-builtins/
│   ├── README.md
│   ├── string.md
│   ├── number.md
│   ├── math.md
│   ├── date.md
│   ├── json.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 13-dom/
│   ├── README.md
│   ├── selecao.md
│   ├── eventos.md
│   ├── manipulacao.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 14-web-apis/
│   ├── README.md
│   ├── fetch.md
│   ├── storage.md
│   ├── timers.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 15-modulos/
│   ├── README.md
│   ├── import-export.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 16-erros/
│   ├── README.md
│   ├── try-catch.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 17-seguranca/
│   ├── README.md
│   ├── coercoes.md
│   ├── comparacoes.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 18-performance/
│   ├── README.md
│   ├── memoria.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 19-event-loop-e-callbacks-avancado/
│   ├── README.md
│   ├── simulacao-event-loop.js
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 20-arquitetura/
│   ├── README.md
│   ├── design-patterns.md
│   ├── module-pattern.md
│   ├── observer-pattern.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 21-node-e-ambiente/
│   ├── README.md
│   ├── node-basico.md
│   ├── http-server.md
│   ├── filesystem.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 22-testes/
│   ├── README.md
│   ├── unitarios.md
│   ├── mocks.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
├── 23-engenharia/
│   ├── README.md
│   ├── debugging.md
│   ├── profiling.md
│   ├── refatoracao.md
│   ├── resumo/
│   │   ├── resumo.md
│   │   └── avancado.md
│   ├── projetos/
│   │   └── README.md
│   └── desafios/
│       └── README.md
│
└── README.md  ← você está aqui
```

---

## 📖 Índice dos Módulos

| # | Módulo | Descrição |
|---|--------|-----------|
| 01 | **Fundamentos da Linguagem** | Sintaxe, tipos, variáveis e operadores |
| 02 | **Controle de Execução** | Condicionais, loops e controle de fluxo |
| 03 | **Funções** | Declaração, parâmetros, arrow functions e funções avançadas |
| 04 | **Estruturas de Dados** | Objetos e Arrays em profundidade |
| 05 | **Orientação a Objetos** | Classes, herança e protótipos |
| 06 | **Contexto de Execução** | Execution Context, Call Stack, Hoisting e Escopo |
| 07 | **This** | Regras do `this` e diferenças entre function e arrow |
| 08 | **Assincronismo** | Callbacks, Promises, Async/Await e Event Loop |
| 09 | **ES6+** | Destructuring, Spread/Rest, Template Literals e mais |
| 10 | **Coleções Avançadas** | Map, Set, WeakMap e WeakSet |
| 11 | **Iteradores e Generators** | Iterator Protocol e Generator Functions |
| 12 | **Built-in Objects** | String, Number, Math, Date e JSON |
| 13 | **Manipulação de DOM** | Seleção, eventos e alteração de elementos |
| 14 | **Web APIs** | Fetch, Storage e Timers |
| 15 | **Módulos** | Import, Export e organização de arquivos |
| 16 | **Tratamento de Erros** | try/catch/finally e throw |
| 17 | **Segurança e Comportamento** | Strict mode, coerção e comparações |
| 18 | **Performance e Memória** | Garbage Collection e valor vs referência |
| 19 | **Event Loop e Callbacks Avançado** | Call Stack, Web APIs, Microtask/Macrotask Queue e simulação do Event Loop |
| 20 | **Arquitetura e Design Patterns** | Factory, Singleton, Observer, Strategy, Module Pattern |
| 21 | **Node.js e Ambiente** | Runtime, HTTP Server, File System |
| 22 | **Testes** | Testes unitários, Mocks, Stubs e Spies |
| 23 | **Engenharia de Software** | Debugging, Profiling e Refatoração |

---

## 🧠 Resumo Geral da Arquitetura do JavaScript

JavaScript é uma linguagem **dinâmica**, **interpretada** (ou compilada just-in-time), **baseada em protótipos**, com **tipagem fraca** e **single-threaded** com modelo de concorrência baseado em **Event Loop**.

### Pilares da Linguagem

```
┌─────────────────────────────────────────────────────────────────┐
│                    JAVASCRIPT ENGINE                            │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │  PARSER       │→│  AST          │→│  BYTECODE / JIT       │ │
│  │  (Análise     │  │  (Árvore de  │  │  (Compilação em      │ │
│  │   Léxica)     │  │   Sintaxe)   │  │   tempo de execução) │ │
│  └──────────────┘  └──────────────┘  └───────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────┐          │
│  │           EXECUTION CONTEXT                       │          │
│  │  ┌────────────┐ ┌────────────┐ ┌───────────────┐ │          │
│  │  │ Variable   │ │ Scope      │ │ this          │ │          │
│  │  │ Environment│ │ Chain      │ │ Binding       │ │          │
│  │  └────────────┘ └────────────┘ └───────────────┘ │          │
│  └──────────────────────────────────────────────────┘          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  CALL STACK  │  │  HEAP        │  │  EVENT LOOP  │         │
│  │  (Pilha de   │  │  (Memória    │  │  (Fila de    │         │
│  │   Execução)  │  │   Dinâmica)  │  │   Eventos)   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

### Camadas Fundamentais

1. **Tipos e Valores** — A base: primitivos (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) e objetos (tudo que não é primitivo).

2. **Variáveis e Escopo** — `var` (function-scoped), `let` e `const` (block-scoped). O escopo léxico define onde as variáveis são acessíveis.

3. **Funções** — Cidadãs de primeira classe. Podem ser atribuídas a variáveis, passadas como argumentos e retornadas de outras funções. São a base de closures.

4. **Protótipos** — Todo objeto tem um `[[Prototype]]`. Classes em JS são açúcar sintático sobre o sistema de protótipos.

5. **Contexto de Execução** — Cada chamada de função cria um novo contexto com seu escopo, variáveis e binding do `this`.

6. **Event Loop** — O modelo de concorrência. JavaScript é single-threaded, mas usa filas (macrotask e microtask) para lidar com operações assíncronas sem bloquear.

7. **APIs do Ambiente** — O navegador (ou Node.js) fornece APIs extras: DOM, Fetch, Timers, Storage, etc. Não fazem parte do JS puro, mas são essenciais na prática.

### Como Tudo Se Conecta

```
Código JavaScript
       │
       ▼
┌─────────────────┐
│   FUNDAMENTOS   │ ← Sintaxe, Tipos, Variáveis, Operadores
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ CONTROLE FLUXO  │ ← Condicionais, Loops, Break/Continue
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    FUNÇÕES      │ ← Declaração, Closures, Higher-Order
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌──────────┐
│ DADOS  │ │   OOP    │ ← Objetos, Arrays │ Classes, Protótipos
└───┬────┘ └────┬─────┘
    │            │
    └─────┬──────┘
          ▼
┌─────────────────┐
│   CONTEXTO      │ ← Execution Context, Scope, this, Hoisting
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  ASSÍNCRONO     │ ← Callbacks, Promises, Async/Await, Event Loop
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   ECOSSISTEMA   │ ← DOM, Web APIs, Módulos, ES6+, Built-ins
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   QUALIDADE     │ ← Erros, Segurança, Performance
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  ENGENHARIA     │ ← Arquitetura, Node.js, Testes, Debugging
└─────────────────┘
```

---

## 🗺️ Mapa Mental Textual

```
                            JAVASCRIPT
                                │
        ┌───────────┬───────────┼───────────┬───────────┐
        │           │           │           │           │
   FUNDAMENTOS   FUNÇÕES    OBJETOS    ASSÍNCRONO  AMBIENTE
        │           │           │           │           │
   ┌────┴────┐   ┌──┴──┐   ┌───┴───┐   ┌──┴──┐   ┌───┴───┐
   │         │   │     │   │       │   │     │   │       │
 Tipos    Var  Arrow  HOF  Proto  Class CB  Prom  DOM   APIs
   │       │   │     │   │       │   │     │   │       │
 Ops    Scope Clos  Map  Herança Enc Async Event Fetch  Mod
                              │         │         │
                           this      EvLoop   Storage
                                        │
                              ┌─────────┼─────────┐
                              │         │         │
                          Arquitet.   Node.js   Testes
                              │         │         │
                          Patterns  HTTP/FS   Mocks
                              │
                          Engenharia
                              │
                        Debug/Profile
```

---

## 🛤️ Guia de Estudo — Roadmap Passo a Passo

### Fase 1: Base Sólida (Semanas 1–2)
> Objetivo: Entender como a linguagem funciona no nível mais básico.

1. ✅ **Módulo 01** — Fundamentos da Linguagem
2. ✅ **Módulo 02** — Controle de Execução
3. ✅ **Módulo 03** — Funções

**Checkpoint:** Você consegue criar programas simples com lógica, loops e funções?

### Fase 2: Dados e Objetos (Semanas 3–4)
> Objetivo: Dominar manipulação de dados e entender OOP em JS.

4. ✅ **Módulo 04** — Estruturas de Dados
5. ✅ **Módulo 05** — Orientação a Objetos

**Checkpoint:** Você consegue modelar dados com objetos/classes e manipular arrays fluentemente?

### Fase 3: Motor Interno (Semanas 5–6)
> Objetivo: Entender o que acontece "por baixo do capô".

6. ✅ **Módulo 06** — Contexto de Execução
7. ✅ **Módulo 07** — This

**Checkpoint:** Você consegue prever o valor de `this` e entender hoisting sem hesitar?

### Fase 4: Assincronismo (Semanas 7–8)
> Objetivo: Dominar o modelo assíncrono — requisito obrigatório para qualquer dev JS.

8. ✅ **Módulo 08** — Assincronismo

**Checkpoint:** Você entende a diferença entre microtask/macrotask e sabe usar async/await com tratamento de erro?

### Fase 5: JavaScript Moderno (Semanas 9–10)
> Objetivo: Dominar as features do ES6+ que são padrão na indústria.

9. ✅ **Módulo 09** — ES6+
10. ✅ **Módulo 10** — Coleções Avançadas
11. ✅ **Módulo 11** — Iteradores e Generators

**Checkpoint:** Você usa destructuring, spread e Map/Set naturalmente no código?

### Fase 6: Ferramentas da Linguagem (Semanas 11–12)
> Objetivo: Conhecer os objetos nativos e saber trabalhar com DOM e APIs.

12. ✅ **Módulo 12** — Built-in Objects
13. ✅ **Módulo 13** — DOM
14. ✅ **Módulo 14** — Web APIs
15. ✅ **Módulo 15** — Módulos

**Checkpoint:** Você consegue construir uma aplicação web completa com fetch, DOM e módulos?

### Fase 7: Qualidade Profissional (Semanas 13–14)
> Objetivo: Escrever código seguro, robusto e performático.

16. ✅ **Módulo 16** — Tratamento de Erros
17. ✅ **Módulo 17** — Segurança e Comportamento
18. ✅ **Módulo 18** — Performance e Memória

**Checkpoint:** Você sabe identificar memory leaks, entende coerção e escreve código defensivo?

### Fase 8: Domínio do Motor (Semanas 15–16)
> Objetivo: Entender profundamente como o JavaScript executa código por baixo dos panos.

19. ✅ **Módulo 19** — Event Loop e Callbacks Avançado

**Checkpoint:** Você consegue prever a ordem exata de execução de qualquer código assíncrono com microtasks e macrotasks?

### Fase 9: Engenharia e Prática Profissional (Semanas 17–20)
> Objetivo: Aplicar padrões de arquitetura, trabalhar fora do navegador, testar e depurar código como profissional.

20. ✅ **Módulo 20** — Arquitetura e Design Patterns
21. ✅ **Módulo 21** — Node.js e Ambiente
22. ✅ **Módulo 22** — Testes
23. ✅ **Módulo 23** — Engenharia de Software

**Checkpoint:** Você sabe aplicar design patterns, criar servidores HTTP, escrever testes unitários e fazer profiling de código?

---

## 📋 Como Usar Este Material

1. **Estudo sequencial**: Siga o roadmap acima, módulo por módulo
2. **Consulta rápida**: Use o índice para ir direto ao tema desejado
3. **Revisão**: Cada README de módulo tem um resumo do que foi estudado
4. **Prática**: Execute os exemplos de código no console do navegador ou Node.js
5. **Projetos**: Cada módulo tem uma pasta `projetos/` com implementações guiadas
6. **Desafios**: Cada módulo tem uma pasta `desafios/` com exercícios de fixação
7. **Exportação**: Use extensões como *Markdown PDF* no VS Code para gerar PDFs

---

## 📜 Licença

Material de estudo pessoal. Uso livre para fins educacionais.

---

> *"Primeiro, aprenda os fundamentos. Depois, entenda o porquê. Por fim, domine o como."*
