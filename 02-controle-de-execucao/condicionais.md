# Condicionais

## Definição

**Condicionais** são estruturas que permitem ao programa **tomar decisões** — executar um bloco de código apenas se uma condição for verdadeira. São o mecanismo fundamental de lógica em qualquer linguagem de programação.

```javascript
// A forma mais básica de decisão
if (usuario.autenticado) {
  mostrarDashboard();
} else {
  redirecionarParaLogin();
}
```

---

## 1. `if` / `else if` / `else`

### Estrutura

```javascript
if (condição) {
  // executa se condição for TRUE
} else if (outraCondição) {
  // executa se a primeira for false E esta for true
} else {
  // executa se TODAS as anteriores forem false
}
```

### Estrutura interna — como a engine avalia

```
Início
  │
  ▼
┌─────────────────┐
│ condição 1 ?    │──── true ───→ executa bloco 1 ──→ FIM
└────────┬────────┘
         │ false
         ▼
┌─────────────────┐
│ condição 2 ?    │──── true ───→ executa bloco 2 ──→ FIM
└────────┬────────┘
         │ false
         ▼
┌─────────────────┐
│ else (fallback) │──────────────→ executa bloco 3 ──→ FIM
└─────────────────┘
```

> **Importante:** Assim que uma condição é `true`, as demais são **ignoradas**. A ordem importa.

### Exemplos práticos

```javascript
// Exemplo 1: Classificação de nota
let nota = 85;

if (nota >= 90) {
  console.log("Conceito A");
} else if (nota >= 80) {
  console.log("Conceito B"); // ← executa este
} else if (nota >= 70) {
  console.log("Conceito C");
} else if (nota >= 60) {
  console.log("Conceito D");
} else {
  console.log("Reprovado");
}
```

```javascript
// Exemplo 2: Validação de entrada
function validarIdade(idade) {
  if (typeof idade !== "number") {
    console.log("Idade deve ser um número");
    return;
  }

  if (idade < 0 || idade > 150) {
    console.log("Idade inválida");
    return;
  }

  if (idade >= 18) {
    console.log("Maior de idade");
  } else {
    console.log("Menor de idade");
  }
}

validarIdade(25);     // "Maior de idade"
validarIdade("abc");  // "Idade deve ser um número"
validarIdade(-5);     // "Idade inválida"
```

### `if` sem chaves (evite)

```javascript
// Funciona, mas é perigoso
if (true) console.log("ok");

// Problema: ao adicionar uma segunda linha, ela NÃO faz parte do if
if (false)
  console.log("não executa");
  console.log("EXECUTA — não está dentro do if!"); // ← sempre executa

// ✅ Sempre use chaves
if (false) {
  console.log("não executa");
  console.log("também não executa");
}
```

---

## 2. Avaliação Truthy / Falsy em Condicionais

JavaScript converte automaticamente o valor da condição para boolean. Isso permite condicionais mais concisas, mas exige atenção.

### Valores Falsy (viram `false`)

```javascript
if (false) { }       // false
if (0) { }           // false
if (-0) { }          // false
if ("") { }          // false (string vazia)
if (null) { }        // false
if (undefined) { }   // false
if (NaN) { }         // false
```

### Valores Truthy (viram `true`)

```javascript
if (true) { }        // true
if (1) { }           // true
if ("texto") { }     // true
if ([]) { }          // true ← CUIDADO: array vazio é truthy!
if ({}) { }          // true ← CUIDADO: objeto vazio é truthy!
if ("0") { }         // true ← CUIDADO: string "0" é truthy!
if ("false") { }     // true ← CUIDADO: string "false" é truthy!
```

### Caso de uso: verificar se variável tem valor

```javascript
let nome = obterNomeDoUsuario(); // pode retornar string ou null/undefined

// Padrão comum: verificar truthy
if (nome) {
  console.log(`Olá, ${nome}`);
} else {
  console.log("Olá, visitante");
}

// ⚠️ Problema: se nome for "" (string vazia), entra no else
// Se "" for um valor válido, use verificação explícita:
if (nome !== null && nome !== undefined) {
  console.log(`Olá, ${nome}`);
}
// Ou com nullish coalescing:
console.log(`Olá, ${nome ?? "visitante"}`);
```

---

## 3. Operador Ternário (`? :`)

Forma compacta de `if/else` que **retorna um valor**. Ideal para atribuições condicionais simples.

### Sintaxe

```javascript
// condição ? valorSeTrue : valorSeFalse
let resultado = condicao ? "sim" : "não";
```

### Exemplos

```javascript
// Atribuição condicional
let idade = 20;
let tipo = idade >= 18 ? "adulto" : "menor";
console.log(tipo); // "adulto"

// Dentro de template literals
let itens = 3;
console.log(`${itens} ${itens === 1 ? "item" : "itens"} no carrinho`);
// "3 itens no carrinho"

// Como argumento de função
console.log(nota >= 60 ? "Aprovado" : "Reprovado");
```

### Ternários aninhados (use com moderação)

```javascript
// Legível até 2 níveis, mas evite mais que isso
let sinal = velocidade > 120 ? "vermelho"
          : velocidade > 80  ? "amarelo"
          : "verde";

// Se ficar complexo, use if/else — legibilidade > concisão
```

### Quando NÃO usar ternário

```javascript
// ❌ Ternário para efeitos colaterais (não retorna valor)
condicao ? fazAlgo() : fazOutraCoisa(); // Use if/else

// ❌ Ternário com lógica complexa
let x = a > b ? (c + d) * (e - f) : (g / h) + (i * j); // Ilegível

// ✅ Use ternário apenas para atribuições simples
let label = isAdmin ? "Administrador" : "Usuário";
```

---

## 4. `switch` / `case`

Ideal quando você compara **um mesmo valor** contra múltiplas opções. Mais legível que vários `else if` para valores discretos.

### Sintaxe

```javascript
switch (expressão) {
  case valor1:
    // executa se expressão === valor1
    break;
  case valor2:
    // executa se expressão === valor2
    break;
  default:
    // executa se nenhum case combinou
}
```

> **ATENÇÃO:** `switch` usa **comparação estrita (`===`)**. `"1"` não combina com `1`.

### Exemplo prático

```javascript
function traduzirDia(dia) {
  switch (dia) {
    case 0:
      return "Domingo";
    case 1:
      return "Segunda";
    case 2:
      return "Terça";
    case 3:
      return "Quarta";
    case 4:
      return "Quinta";
    case 5:
      return "Sexta";
    case 6:
      return "Sábado";
    default:
      return "Dia inválido";
  }
}

console.log(traduzirDia(3)); // "Quarta"
console.log(traduzirDia(9)); // "Dia inválido"
```

### O perigo do `break` esquecido (fall-through)

```javascript
let fruta = "maçã";

switch (fruta) {
  case "maçã":
    console.log("R$ 5,00");
    // SEM BREAK! Execução "cai" para o próximo case
  case "banana":
    console.log("R$ 3,00");
    // SEM BREAK! Continua caindo
  case "uva":
    console.log("R$ 8,00");
    break;
}

// Saída:
// "R$ 5,00"
// "R$ 3,00"  ← não deveria aparecer!
// "R$ 8,00"  ← não deveria aparecer!
```

### Fall-through intencional (agrupar cases)

```javascript
function tipoAnimal(animal) {
  switch (animal) {
    case "cachorro":
    case "gato":
    case "hamster":
      return "doméstico";

    case "leão":
    case "tigre":
    case "urso":
      return "selvagem";

    default:
      return "desconhecido";
  }
}

console.log(tipoAnimal("gato"));  // "doméstico"
console.log(tipoAnimal("leão"));  // "selvagem"
```

### Switch com blocos (variáveis locais)

```javascript
let comando = "criar";

switch (comando) {
  case "criar": {
    let mensagem = "Criando..."; // let precisa de bloco no switch
    console.log(mensagem);
    break;
  }
  case "deletar": {
    let mensagem = "Deletando..."; // OK — escopo diferente
    console.log(mensagem);
    break;
  }
}
```

---

## 5. Alternativa Moderna: Objeto de Mapeamento

Para muitos casos de `switch`, um **objeto de mapeamento** é mais limpo e extensível.

```javascript
// Em vez de switch grande:
function obterPreco(fruta) {
  const precos = {
    maçã: 5.00,
    banana: 3.00,
    uva: 8.00,
    manga: 6.50
  };

  return precos[fruta] ?? "Fruta não encontrada";
}

console.log(obterPreco("banana")); // 3.00
console.log(obterPreco("kiwi"));   // "Fruta não encontrada"
```

```javascript
// Para ações (com funções):
const acoes = {
  salvar: () => salvarDados(),
  deletar: () => deletarDados(),
  exportar: () => exportarDados()
};

let comando = "salvar";
const acao = acoes[comando];
if (acao) {
  acao();
} else {
  console.log("Comando desconhecido");
}
```

---

## 6. Padrões e Boas Práticas

### Early return (retorno antecipado)

Em vez de aninhar vários `if`, inverta as condições e retorne cedo:

```javascript
// ❌ Aninhamento profundo
function processar(usuario) {
  if (usuario) {
    if (usuario.ativo) {
      if (usuario.permissao === "admin") {
        // finalmente o código principal
        return `Bem-vindo, ${usuario.nome}`;
      } else {
        return "Sem permissão";
      }
    } else {
      return "Usuário inativo";
    }
  } else {
    return "Usuário não encontrado";
  }
}

// ✅ Early return — mesma lógica, muito mais legível
function processar(usuario) {
  if (!usuario) return "Usuário não encontrado";
  if (!usuario.ativo) return "Usuário inativo";
  if (usuario.permissao !== "admin") return "Sem permissão";

  return `Bem-vindo, ${usuario.nome}`;
}
```

### Evitar condições complexas — extraia em variáveis

```javascript
// ❌ Condição difícil de ler
if (usuario.idade >= 18 && usuario.documento && !usuario.bloqueado && usuario.saldo > 0) {
  aprovarCompra();
}

// ✅ Extrair em variáveis com nomes descritivos
const maiorDeIdade = usuario.idade >= 18;
const temDocumento = Boolean(usuario.documento);
const contaAtiva = !usuario.bloqueado;
const temSaldo = usuario.saldo > 0;

if (maiorDeIdade && temDocumento && contaAtiva && temSaldo) {
  aprovarCompra();
}
```

---

## 7. Erros Comuns

### Usar `=` em vez de `===` na condição

```javascript
let x = 10;

// ❌ Atribuição em vez de comparação
if (x = 5) {
  console.log("Sempre entra aqui!"); // x agora é 5, que é truthy
}

// ✅ Comparação correta
if (x === 5) {
  console.log("x é 5");
}
```

### Esquecer que `switch` usa `===`

```javascript
let valor = "1";

switch (valor) {
  case 1:
    console.log("número 1");
    break;
  case "1":
    console.log("string 1"); // ← este executa
    break;
}
```

### Confundir `else if` com `else { if }`

```javascript
// São equivalentes, mas else if é a convenção
if (a) {
  // ...
} else if (b) {
  // ...
}

// Isto é desnecessariamente aninhado:
if (a) {
  // ...
} else {
  if (b) {
    // ...
  }
}
```

---

## Resumo

| Estrutura | Quando usar |
|-----------|------------|
| `if/else` | Decisões com condições complexas ou variadas |
| Ternário `? :` | Atribuições condicionais simples |
| `switch/case` | Comparar um valor contra múltiplas opções discretas |
| Objeto de mapeamento | Substituir switch com muitos cases de retorno |
| Early return | Evitar aninhamento profundo em funções |

**Regras de ouro:**
1. Sempre use `===`, nunca `==` nas condições
2. Sempre use chaves `{ }` nos blocos
3. Prefira early return a aninhamento
4. Extraia condições complexas em variáveis descritivas

---

> **Próximo:** [loops.md](loops.md) — Todas as formas de repetição em JavaScript.
