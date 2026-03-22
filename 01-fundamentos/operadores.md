# Operadores

## Definição

**Operadores** são símbolos que realizam operações sobre valores (operandos). São os verbos da linguagem — somam, comparam, atribuem, combinam lógicas e transformam dados.

```javascript
// Anatomia de uma operação
let resultado = 10 + 5;
//     ↑         ↑  ↑  ↑
//  variável  op1 op op2
//           (operandos + operador)
```

---

## 1. Operadores Aritméticos

Realizam cálculos matemáticos.

| Operador | Nome | Exemplo | Resultado |
|----------|------|---------|-----------|
| `+` | Adição | `10 + 5` | `15` |
| `-` | Subtração | `10 - 5` | `5` |
| `*` | Multiplicação | `10 * 5` | `50` |
| `/` | Divisão | `10 / 3` | `3.333...` |
| `%` | Módulo (resto) | `10 % 3` | `1` |
| `**` | Exponenciação | `2 ** 3` | `8` |

### Exemplos práticos

```javascript
// Divisão inteira — JS não tem operador nativo, use Math.floor
let divisao = Math.floor(10 / 3); // 3

// Módulo — verificar par/ímpar
let numero = 7;
if (numero % 2 === 0) {
  console.log("Par");
} else {
  console.log("Ímpar"); // ← este
}

// Exponenciação — substituiu Math.pow
console.log(2 ** 10);       // 1024
console.log(Math.pow(2, 10)); // 1024 (equivalente antigo)
```

### Cuidado com o `+` e strings

```javascript
// + com números → adição
console.log(5 + 3);       // 8

// + com strings → concatenação
console.log("5" + 3);     // "53" (string!)
console.log(5 + "3");     // "53" (string!)
console.log("5" + "3");   // "53"

// Outros operadores forçam conversão para número
console.log("5" - 3);     // 2 (number)
console.log("5" * 3);     // 15 (number)
console.log("5" / 1);     // 5 (number)
```

---

## 2. Operadores de Atribuição

Atribuem valores a variáveis, opcionalmente combinando com uma operação.

| Operador | Equivale a | Exemplo |
|----------|-----------|---------|
| `=` | Atribuição simples | `x = 10` |
| `+=` | `x = x + y` | `x += 5` |
| `-=` | `x = x - y` | `x -= 5` |
| `*=` | `x = x * y` | `x *= 5` |
| `/=` | `x = x / y` | `x /= 5` |
| `%=` | `x = x % y` | `x %= 5` |
| `**=` | `x = x ** y` | `x **= 2` |
| `&&=` | `x = x && y` | `x &&= "novo"` |
| `\|\|=` | `x = x \|\| y` | `x \|\|= "padrão"` |
| `??=` | `x = x ?? y` | `x ??= "padrão"` |

### Exemplos práticos

```javascript
let pontos = 0;
pontos += 10;   // 10
pontos += 5;    // 15
pontos *= 2;    // 30
pontos -= 8;    // 22

// Atribuição lógica (ES2021)
let config = null;
config ??= { tema: "escuro" }; // atribui se for null/undefined
console.log(config); // { tema: "escuro" }

let nome = "";
nome ||= "Anônimo"; // atribui se for falsy
console.log(nome); // "Anônimo"

let usuario = { ativo: true };
usuario.ativo &&= false; // atribui se for truthy
console.log(usuario.ativo); // false
```

---

## 3. Operadores de Comparação

Comparam dois valores e retornam `true` ou `false`.

| Operador | Nome | Exemplo | Resultado |
|----------|------|---------|-----------|
| `==` | Igualdade frouxa | `5 == "5"` | `true` |
| `===` | Igualdade estrita | `5 === "5"` | `false` |
| `!=` | Diferença frouxa | `5 != "5"` | `false` |
| `!==` | Diferença estrita | `5 !== "5"` | `true` |
| `>` | Maior que | `10 > 5` | `true` |
| `<` | Menor que | `10 < 5` | `false` |
| `>=` | Maior ou igual | `10 >= 10` | `true` |
| `<=` | Menor ou igual | `5 <= 10` | `true` |

### `==` vs `===` — Regra de Ouro

```javascript
// == faz COERÇÃO de tipo antes de comparar
console.log(5 == "5");       // true  (string vira number)
console.log(0 == false);     // true  (false vira 0)
console.log("" == false);    // true  (ambos viram 0)
console.log(null == undefined); // true (caso especial)

// === NÃO faz coerção — compara tipo E valor
console.log(5 === "5");      // false (tipos diferentes)
console.log(0 === false);    // false
console.log("" === false);   // false
console.log(null === undefined); // false
```

**Regra:** **Sempre use `===` e `!==`.** Esqueça que `==` existe.

### Comparação de objetos

```javascript
// Objetos são comparados por REFERÊNCIA, não por conteúdo
let a = { nome: "Felix" };
let b = { nome: "Felix" };
let c = a;

console.log(a === b); // false — objetos diferentes na memória
console.log(a === c); // true  — mesma referência
```

---

## 4. Operadores Lógicos

Combinam expressões booleanas ou usam lógica de curto-circuito.

| Operador | Nome | Descrição |
|----------|------|-----------|
| `&&` | E (AND) | Retorna o primeiro falsy, ou o último valor |
| `\|\|` | OU (OR) | Retorna o primeiro truthy, ou o último valor |
| `!` | NÃO (NOT) | Inverte o valor booleano |

### Tabela verdade

```
A       B       A && B    A || B    !A
true    true    true      true      false
true    false   false     true      false
false   true    false     true      true
false   false   false     false     true
```

### Curto-circuito (Short-circuit)

Os operadores `&&` e `||` não necessariamente retornam `true`/`false` — eles retornam **o valor** que determinou o resultado.

```javascript
// && retorna o PRIMEIRO FALSY ou o ÚLTIMO valor
console.log("Felix" && 42);      // 42 (ambos truthy → retorna o último)
console.log(0 && "Felix");       // 0 (primeiro é falsy → retorna ele)
console.log("" && "Felix");      // "" (primeiro é falsy)
console.log("a" && "b" && "c");  // "c" (todos truthy → último)

// || retorna o PRIMEIRO TRUTHY ou o ÚLTIMO valor
console.log("Felix" || 42);      // "Felix" (primeiro é truthy)
console.log(0 || "Felix");       // "Felix" (primeiro é falsy, segundo é truthy)
console.log("" || 0 || null);    // null (todos falsy → último)
console.log(null || "backup");   // "backup"
```

### Casos de uso reais

```javascript
// Valor padrão com ||
let nomeUsuario = inputDoFormulario || "Anônimo";

// Executar só se existir com &&
let usuario = { nome: "Felix" };
usuario && console.log(usuario.nome); // "Felix"

// Dupla negação para converter para boolean
console.log(!!0);        // false
console.log(!!"texto");  // true
console.log(!!null);     // false
console.log(!!{});       // true
```

---

## 5. Operador Nullish Coalescing (`??`)

Retorna o lado direito **apenas** se o lado esquerdo for `null` ou `undefined`. Diferente de `||`, que reage a qualquer valor falsy.

```javascript
// || considera 0 e "" como falsy
console.log(0 || "padrão");     // "padrão" (0 é falsy)
console.log("" || "padrão");    // "padrão" ("" é falsy)

// ?? só reage a null/undefined
console.log(0 ?? "padrão");     // 0 ✅ (0 NÃO é null/undefined)
console.log("" ?? "padrão");    // "" ✅ ("" NÃO é null/undefined)
console.log(null ?? "padrão");  // "padrão"
console.log(undefined ?? "padrão"); // "padrão"
```

### Caso de uso real

```javascript
// Configuração onde 0 é um valor válido
function configurarTimeout(opcoes) {
  // ❌ Com || — se timeout for 0, vira 3000
  // const timeout = opcoes.timeout || 3000;

  // ✅ Com ?? — 0 é preservado
  const timeout = opcoes.timeout ?? 3000;
  return timeout;
}

console.log(configurarTimeout({ timeout: 0 }));    // 0 ✅
console.log(configurarTimeout({ timeout: null }));  // 3000
console.log(configurarTimeout({}));                  // 3000
```

---

## 6. Operadores Unários

Operam sobre um único valor.

### Incremento e Decremento

```javascript
let x = 5;

// Pré-incremento: incrementa ANTES de usar o valor
console.log(++x); // 6 (incrementa, depois retorna)

// Pós-incremento: incrementa DEPOIS de usar o valor
let y = 5;
console.log(y++); // 5 (retorna, depois incrementa)
console.log(y);   // 6

// Pré-decremento e pós-decremento: mesma lógica
let z = 10;
console.log(--z); // 9
console.log(z--); // 9 (retorna 9, depois z vira 8)
console.log(z);   // 8
```

### `typeof`

```javascript
console.log(typeof "hello");    // "string"
console.log(typeof 42);         // "number"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" (bug histórico)
console.log(typeof {});         // "object"
console.log(typeof function(){}); // "function"
```

### `delete`

Remove uma propriedade de um objeto.

```javascript
let obj = { nome: "Felix", idade: 30 };
delete obj.idade;
console.log(obj); // { nome: "Felix" }
```

### `void`

Avalia uma expressão e retorna `undefined`.

```javascript
console.log(void 0); // undefined
// Uso raro — mais comum em links HTML: href="javascript:void(0)"
```

---

## 7. Operador Ternário (`? :`)

Forma compacta de `if/else` que retorna um valor.

```javascript
// Sintaxe: condição ? valorSeTrue : valorSeFalse

let idade = 20;
let status = idade >= 18 ? "adulto" : "menor";
console.log(status); // "adulto"

// Equivalente com if/else:
let status2;
if (idade >= 18) {
  status2 = "adulto";
} else {
  status2 = "menor";
}
```

### Ternários aninhados (use com moderação)

```javascript
let nota = 85;
let conceito = nota >= 90 ? "A"
             : nota >= 80 ? "B"
             : nota >= 70 ? "C"
             : nota >= 60 ? "D"
             : "F";

console.log(conceito); // "B"

// Se ficar complexo, prefira if/else ou switch
```

### Caso de uso real

```javascript
// Renderizar texto condicional
let itens = 5;
console.log(`Você tem ${itens} ${itens === 1 ? "item" : "itens"} no carrinho`);
// "Você tem 5 itens no carrinho"
```

---

## 8. Operador Spread (`...`) e Rest (`...`)

O mesmo símbolo `...` tem dois significados dependendo do contexto.

### Spread — Espalha elementos

```javascript
// Em arrays
let a = [1, 2, 3];
let b = [...a, 4, 5];
console.log(b); // [1, 2, 3, 4, 5]

// Em objetos
let base = { cor: "azul", tamanho: "M" };
let produto = { ...base, preco: 99 };
console.log(produto); // { cor: "azul", tamanho: "M", preco: 99 }

// Em chamadas de função
let numeros = [5, 2, 8, 1];
console.log(Math.max(...numeros)); // 8
```

### Rest — Coleta o restante

```javascript
// Em parâmetros de função
function somar(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}
console.log(somar(1, 2, 3, 4)); // 10

// Em desestruturação
let [primeiro, ...resto] = [1, 2, 3, 4, 5];
console.log(primeiro); // 1
console.log(resto);    // [2, 3, 4, 5]
```

> **Aprofundamento:** Módulo 09 (ES6+) cobre spread/rest em detalhes.

---

## 9. Operadores de Tipo

### `typeof`

Retorna uma string com o tipo do valor (veja tabela em tipos-de-dados.md).

```javascript
console.log(typeof 42);        // "number"
console.log(typeof "hello");   // "string"
```

### `instanceof`

Verifica se um objeto é instância de uma classe/construtor.

```javascript
let data = new Date();
console.log(data instanceof Date);    // true
console.log(data instanceof Object);  // true (Date herda de Object)

let arr = [1, 2, 3];
console.log(arr instanceof Array);    // true
console.log(arr instanceof Object);   // true
```

### `in`

Verifica se uma propriedade existe em um objeto.

```javascript
let carro = { marca: "Toyota", ano: 2023 };
console.log("marca" in carro);  // true
console.log("cor" in carro);    // false
console.log("toString" in carro); // true (herdado do protótipo)
```

---

## 10. Operador Vírgula (`,`)

Avalia múltiplas expressões e retorna a última.

```javascript
// Raramente usado fora de loops for
let x = (1, 2, 3);
console.log(x); // 3

// Uso prático em for
for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(i, j); // 0 10, 1 9, 2 8, 3 7, 4 6
}
```

---

## 11. Operadores Bitwise (Bit a Bit)

Operam nos bits individuais de números inteiros. Uso raro em aplicações web, mas comum em performance crítica, flags e manipulação binária.

| Operador | Nome | Exemplo | Resultado |
|----------|------|---------|-----------|
| `&` | AND | `5 & 3` | `1` |
| `\|` | OR | `5 \| 3` | `7` |
| `^` | XOR | `5 ^ 3` | `6` |
| `~` | NOT | `~5` | `-6` |
| `<<` | Shift left | `5 << 1` | `10` |
| `>>` | Shift right | `5 >> 1` | `2` |
| `>>>` | Unsigned shift right | `-1 >>> 0` | `4294967295` |

### Caso de uso: flags com bitwise

```javascript
const LEITURA  = 0b001; // 1
const ESCRITA  = 0b010; // 2
const EXECUCAO = 0b100; // 4

// Combinar permissões com OR
let permissao = LEITURA | ESCRITA; // 3 (0b011)

// Verificar permissão com AND
console.log(permissao & LEITURA);  // 1 (truthy → tem leitura)
console.log(permissao & EXECUCAO); // 0 (falsy → não tem execução)

// Adicionar permissão
permissao = permissao | EXECUCAO; // 7 (0b111)

// Remover permissão
permissao = permissao & ~ESCRITA; // 5 (0b101)
```

---

## 12. Operador Optional Chaining (`?.`)

Acessa propriedades de objetos sem causar erro se alguma parte do caminho for `null` ou `undefined`.

```javascript
let usuario = {
  nome: "Felix",
  endereco: {
    cidade: "São Paulo"
  }
};

// Sem optional chaining — pode dar erro
// console.log(usuario.contato.email); // TypeError!

// Com optional chaining — retorna undefined se não existir
console.log(usuario.contato?.email);     // undefined (sem erro)
console.log(usuario.endereco?.cidade);   // "São Paulo"

// Em métodos
console.log(usuario.getNome?.());  // undefined (método não existe)

// Em arrays
let arr = null;
console.log(arr?.[0]); // undefined (sem erro)
```

> **Aprofundamento:** Módulo 09 (ES6+) cobre optional chaining em detalhes.

---

## 13. Precedência de Operadores

A **precedência** determina a ordem em que os operadores são avaliados.

| Prioridade | Operador | Descrição |
|------------|----------|-----------|
| 1 (mais alta) | `()` | Agrupamento |
| 2 | `!`, `typeof`, `++`, `--` | Unários |
| 3 | `**` | Exponenciação |
| 4 | `*`, `/`, `%` | Multiplicação/Divisão |
| 5 | `+`, `-` | Adição/Subtração |
| 6 | `<`, `>`, `<=`, `>=`, `instanceof`, `in` | Comparação |
| 7 | `===`, `!==`, `==`, `!=` | Igualdade |
| 8 | `&&` | AND lógico |
| 9 | `\|\|` | OR lógico |
| 10 | `??` | Nullish coalescing |
| 11 | `? :` | Ternário |
| 12 (mais baixa) | `=`, `+=`, `-=`, etc. | Atribuição |

### Exemplo prático

```javascript
// Sem parênteses — depende da precedência
let resultado = 2 + 3 * 4;  // 14 (não 20)
// * tem precedência sobre +, então: 2 + (3 * 4) = 2 + 12 = 14

// Com parênteses — explícito e mais legível
let resultado2 = (2 + 3) * 4; // 20

// Boa prática: use parênteses quando a intenção não for óbvia
let pode = idade >= 18 && (temCarteira || estaAcompanhado);
```

---

## Resumo

| Categoria | Operadores | Uso principal |
|-----------|-----------|---------------|
| Aritméticos | `+`, `-`, `*`, `/`, `%`, `**` | Cálculos |
| Atribuição | `=`, `+=`, `-=`, `*=`, `??=`, `\|\|=` | Atribuir valores |
| Comparação | `===`, `!==`, `>`, `<`, `>=`, `<=` | Comparar valores |
| Lógicos | `&&`, `\|\|`, `!`, `??` | Combinar condições |
| Unários | `++`, `--`, `typeof`, `!`, `delete` | Operar em um valor |
| Ternário | `? :` | Condicional inline |
| Spread/Rest | `...` | Espalhar/coletar |
| Tipo | `typeof`, `instanceof`, `in` | Verificar tipos |
| Optional | `?.` | Acesso seguro |

**Regras de ouro:**
1. **Sempre use `===`**, nunca `==`
2. Use `??` para valores padrão quando `0` ou `""` são válidos
3. Use parênteses quando a precedência não for óbvia
4. Cuidado com `+` — ele concatena strings

---

> **Próximo módulo:** [02-controle-de-execucao](../02-controle-de-execucao/README.md) — Condicionais, loops e controle de fluxo.
