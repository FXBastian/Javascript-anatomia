# Sintaxe do JavaScript

## Definição

A **sintaxe** é o conjunto de regras que define como o código JavaScript deve ser escrito para que o interpretador (engine) consiga entendê-lo. Assim como a gramática de um idioma, a sintaxe determina a ordem das palavras, os símbolos obrigatórios e a estrutura das instruções.

---

## 1. Estrutura Básica de um Programa

Um programa JavaScript é composto por **instruções (statements)** executadas de cima para baixo, da esquerda para a direita.

```javascript
// Isto é um programa JavaScript válido
let nome = "Felix";
console.log("Olá, " + nome);
```

Cada instrução é uma ação que o interpretador executa:
- Declarar uma variável
- Chamar uma função
- Atribuir um valor
- Controlar o fluxo

---

## 2. Ponto e Vírgula (`;`)

### Regra

O ponto e vírgula marca o **fim de uma instrução**. JavaScript tem um mecanismo chamado **ASI (Automatic Semicolon Insertion)** que insere ponto e vírgula automaticamente em muitos casos — mas confiar nisso pode causar bugs.

### Recomendação profissional

**Sempre use ponto e vírgula explicitamente.**

```javascript
// ✅ Correto — explícito
let x = 10;
let y = 20;
console.log(x + y);

// ⚠️ Funciona, mas perigoso
let x = 10
let y = 20
console.log(x + y)
```

### Caso real onde ASI causa bug

```javascript
// Você espera que retorne um objeto
function criarUsuario() {
  return
  {
    nome: "Felix"
  }
}

console.log(criarUsuario()); // undefined! 😱

// O ASI insere ; depois do return, transformando em:
// return;
// { nome: "Felix" }  ← bloco ignorado
```

### Correção

```javascript
function criarUsuario() {
  return {
    nome: "Felix"
  };
}

console.log(criarUsuario()); // { nome: "Felix" } ✅
```

---

## 3. Comentários

Comentários são ignorados pelo interpretador. Servem para documentar ou desativar código temporariamente.

### Comentário de linha

```javascript
// Isto é um comentário de uma linha
let idade = 25; // Também pode ser no final da linha
```

### Comentário de bloco

```javascript
/*
  Isto é um comentário de bloco.
  Pode ocupar várias linhas.
  Útil para documentação.
*/
let ativo = true;
```

### Boas práticas

```javascript
// ❌ Comentário inútil — repete o que o código já diz
let nome = "Felix"; // Define a variável nome como Felix

// ✅ Comentário útil — explica o PORQUÊ
let tentativas = 3; // Limite definido pela regra de negócio do cliente
```

---

## 4. Identificadores (Nomes)

Um **identificador** é o nome dado a variáveis, funções, classes, parâmetros, etc.

### Regras obrigatórias

| Regra | Exemplo válido | Exemplo inválido |
|-------|---------------|------------------|
| Deve começar com letra, `_` ou `$` | `nome`, `_id`, `$valor` | `1nome`, `-id` |
| Pode conter letras, números, `_`, `$` | `nome2`, `valor_total` | `nome-total`, `val or` |
| Não pode ser uma palavra reservada | `minhaVar` | `class`, `return` |
| É **case-sensitive** | `nome` ≠ `Nome` ≠ `NOME` | — |

### Convenções de nomenclatura

```javascript
// camelCase — variáveis e funções (PADRÃO em JS)
let nomeCompleto = "Felix Santos";
function calcularTotal() { }

// PascalCase — classes e construtores
class ContaBancaria { }

// UPPER_SNAKE_CASE — constantes de configuração
const MAX_TENTATIVAS = 5;
const API_BASE_URL = "https://api.exemplo.com";

// _prefixo — convenção de privado (não obrigatório)
let _idInterno = 42;
```

---

## 5. Palavras Reservadas

São palavras que o JavaScript usa internamente e que **não podem ser usadas como identificadores**.

### Lista completa com significado e exemplo

#### Controle de fluxo

| Palavra | Significado | Exemplo |
|---------|------------|---------|
| `if` | "Se" — executa um bloco se a condição for verdadeira | `if (x > 0) { }` |
| `else` | "Senão" — executa se o `if` for falso | `if (x > 0) { } else { }` |
| `switch` | Seleciona entre múltiplos casos com base em um valor | `switch (cor) { case "azul": ... }` |
| `case` | Define um caso dentro do `switch` | `case "azul": console.log("azul"); break;` |
| `default` | Caso padrão do `switch` (quando nenhum `case` combina) | `default: console.log("outro");` |
| `break` | Interrompe um loop ou `switch` | `for (...) { if (x) break; }` |
| `continue` | Pula para a próxima iteração do loop | `for (...) { if (x) continue; }` |
| `return` | Retorna um valor e encerra a função | `function soma(a, b) { return a + b; }` |

#### Loops (repetição)

| Palavra | Significado | Exemplo |
|---------|------------|---------|
| `for` | Loop com contador (inicialização, condição, incremento) | `for (let i = 0; i < 5; i++) { }` |
| `while` | Loop que repete enquanto a condição for verdadeira | `while (x > 0) { x--; }` |
| `do` | Loop que executa pelo menos uma vez, depois testa a condição | `do { x--; } while (x > 0);` |
| `in` | Itera sobre as chaves (propriedades) de um objeto | `for (let chave in obj) { }` |

#### Funções e variáveis

| Palavra | Significado | Exemplo |
|---------|------------|---------|
| `function` | Declara uma função | `function saudar() { }` |
| `var` | Declara variável com escopo de função (legado) | `var nome = "Felix";` |
| `let` | Declara variável com escopo de bloco (reatribuível) | `let idade = 25;` |
| `const` | Declara constante com escopo de bloco (não reatribuível) | `const PI = 3.14;` |
| `void` | Avalia uma expressão e retorna `undefined` | `void 0` → `undefined` |

#### Tratamento de erros

| Palavra | Significado | Exemplo |
|---------|------------|---------|
| `try` | Tenta executar um bloco que pode gerar erro | `try { JSON.parse(texto); }` |
| `catch` | Captura o erro gerado dentro do `try` | `catch (erro) { console.log(erro); }` |
| `finally` | Executa sempre, com ou sem erro | `finally { conexao.fechar(); }` |
| `throw` | Lança um erro manualmente | `throw new Error("deu ruim");` |

#### Tipos e verificação

| Palavra | Significado | Exemplo |
|---------|------------|---------|
| `typeof` | Retorna o tipo de um valor como string | `typeof 42` → `"number"` |
| `instanceof` | Verifica se um objeto é instância de uma classe | `[] instanceof Array` → `true` |
| `delete` | Remove uma propriedade de um objeto | `delete obj.nome;` |

#### Orientação a objetos

| Palavra | Significado | Exemplo |
|---------|------------|---------|
| `class` | Declara uma classe (modelo para criar objetos) | `class Animal { }` |
| `new` | Cria uma nova instância de uma classe/construtor | `new Animal("Rex")` |
| `this` | Referência ao objeto atual (contexto de execução) | `this.nome = "Felix";` |
| `extends` | Faz uma classe herdar de outra | `class Gato extends Animal { }` |
| `super` | Chama o construtor/método da classe pai | `super("Rex");` |
| `static` | Define método/propriedade da classe (não da instância) | `static criar() { }` |

#### Módulos (ES6+)

| Palavra | Significado | Exemplo |
|---------|------------|---------|
| `import` | Importa funcionalidade de outro módulo | `import { soma } from "./math.js";` |
| `export` | Exporta funcionalidade para outros módulos | `export function soma(a, b) { }` |

#### Assíncrono

| Palavra | Significado | Exemplo |
|---------|------------|---------|
| `async` | Marca uma função como assíncrona (retorna Promise) | `async function buscar() { }` |
| `await` | Pausa a função async até a Promise resolver | `const dados = await fetch(url);` |

#### Iteradores e generators

| Palavra | Significado | Exemplo |
|---------|------------|---------|
| `yield` | Pausa um generator e retorna um valor | `function* gen() { yield 1; }` |

#### Depuração

| Palavra | Significado | Exemplo |
|---------|------------|---------|
| `debugger` | Para a execução e abre o depurador do navegador | `debugger;` |

#### Contexto especial

| Palavra | Significado | Exemplo |
|---------|------------|---------|
| `with` | Estende o escopo (⚠️ **proibido** em strict mode, evite sempre) | `with (obj) { }` — não use |

#### Reservadas para o futuro (não usáveis ainda)

| Palavra | Para que será usada |
|---------|-------------------|
| `enum` | Enumerações (como em TypeScript) |
| `implements` | Interfaces (reservada para uso futuro) |
| `interface` | Declaração de contratos de tipo |
| `package` | Organização de código em pacotes |
| `private` | Membro privado de classe (já existe com `#`) |
| `protected` | Membro protegido (visível só na classe e filhas) |
| `public` | Membro público (padrão atual) |

### Exemplo de erro

```javascript
// ❌ Erro de sintaxe — "class" é reservada
let class = "JavaScript"; // SyntaxError

// ✅ Correto
let classe = "JavaScript";
let nomeDaClasse = "JavaScript";
```

---

## 6. Blocos de Código (`{ }`)

Um **bloco** é um grupo de instruções delimitado por chaves. Blocos são usados em funções, condicionais, loops, classes, etc.

```javascript
// Bloco de função
function saudar() {
  let mensagem = "Olá!";
  console.log(mensagem);
}

// Bloco de condicional
if (true) {
  console.log("Verdadeiro");
}

// Bloco de loop
for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

### Escopo de bloco

Com `let` e `const`, variáveis declaradas dentro de um bloco **não existem fora dele**:

```javascript
{
  let dentroDoBloco = "só aqui";
  console.log(dentroDoBloco); // "só aqui"
}

console.log(dentroDoBloco); // ReferenceError: dentroDoBloco is not defined
```

> **Nota:** `var` não respeita escopo de bloco — isso é explicado em [variaveis.md](variaveis.md).

---

## 7. Expressões vs Instruções (Expressions vs Statements)

### Expressão (Expression)

Produz um **valor**. Pode ser usada em qualquer lugar onde um valor é esperado.

```javascript
// Estas são expressões — cada uma retorna um valor
5 + 3           // → 8
"Olá"           // → "Olá"
true && false   // → false
x > 10 ? "sim" : "não"  // → "sim" ou "não"
```

### Instrução (Statement)

Realiza uma **ação**. Não produz um valor que possa ser atribuído.

```javascript
// Estas são instruções
let x = 10;              // declaração
if (x > 5) { }           // condicional
for (let i = 0; i < 3; i++) { }  // loop
function saudar() { }    // declaração de função
```

### Diferença prática

```javascript
// Você pode atribuir uma expressão a uma variável
let resultado = 5 + 3;  // ✅

// Você NÃO pode atribuir uma instrução a uma variável
let resultado = if (true) { 1 }; // ❌ SyntaxError
```

---

## 8. Modo Estrito (`"use strict"`)

O **strict mode** ativa um conjunto de regras mais rígidas que evitam erros silenciosos.

```javascript
"use strict";

// ❌ Sem strict mode, isso cria uma variável global acidentalmente
// ✅ Com strict mode, gera um erro
x = 10; // ReferenceError: x is not defined

// ❌ Sem strict mode, deletar variáveis é ignorado silenciosamente
// ✅ Com strict mode, gera um erro
let y = 20;
delete y; // SyntaxError
```

### Onde ativar

```javascript
// No início do arquivo (afeta tudo)
"use strict";
let nome = "Felix";

// Ou dentro de uma função (afeta só a função)
function processar() {
  "use strict";
  // código estrito aqui
}
```

> **Nota:** Módulos ES6 (`import`/`export`) são **automaticamente strict**.

---

## 9. Estrutura Interna — Como a Engine Lê o Código

Quando o JavaScript é executado, a engine passa por estas fases:

```
Código Fonte (texto)
       │
       ▼
┌─────────────────┐
│ 1. TOKENIZAÇÃO  │  Quebra o texto em tokens:
│   (Lexer)       │  let, nome, =, "Felix", ;
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. PARSING      │  Monta a AST (Abstract Syntax Tree)
│   (Parser)      │  Árvore que representa a estrutura lógica
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. EXECUÇÃO     │  Interpreta (ou compila JIT) e executa
│   (Engine)      │  o código com base na AST
└─────────────────┘
```

### Exemplo de tokenização

```javascript
let total = preco * quantidade;
```

Tokens gerados:
```
[let] [total] [=] [preco] [*] [quantidade] [;]
 ↑      ↑     ↑     ↑     ↑       ↑         ↑
keyword ident  op  ident  op    ident     punct
```

---

## 10. Erros Comuns de Sintaxe

### Missing semicolon (em configurações estritas)

```javascript
let x = 10  // ← pode funcionar, mas é arriscado
let y = 20
```

### Chaves não fechadas

```javascript
function saudar() {
  console.log("Olá");
// ← faltou fechar }  → SyntaxError
```

### Palavra reservada como nome

```javascript
let return = 5; // SyntaxError: Unexpected token 'return'
```

### String não fechada

```javascript
let nome = "Felix; // SyntaxError: Invalid or unexpected token
```

### Parênteses desbalanceados

```javascript
console.log("Olá"; // SyntaxError: missing ) after argument list
```

---

## Resumo

| Conceito | Regra |
|----------|-------|
| Ponto e vírgula | Use sempre explicitamente |
| Comentários | `//` para linha, `/* */` para bloco |
| Identificadores | Começam com letra, `_` ou `$`; são case-sensitive |
| Palavras reservadas | Não podem ser usadas como nomes |
| Blocos `{ }` | Agrupam instruções; criam escopo com `let`/`const` |
| Expressão vs Instrução | Expressão produz valor; instrução executa ação |
| Strict mode | Ativa regras rígidas; módulos ES6 são strict por padrão |

---

> **Próximo:** [tipos-de-dados.md](tipos-de-dados.md) — Os tipos de dados que o JavaScript reconhece.
