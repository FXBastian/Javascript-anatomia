# Loops (Estruturas de Repetição)

## Definição

**Loops** permitem executar um bloco de código **repetidamente** enquanto uma condição for verdadeira, ou para cada item de uma coleção. São essenciais para processar dados, iterar listas e automatizar tarefas repetitivas.

```
┌──────────┐
│  Início  │
└────┬─────┘
     ▼
┌──────────────┐     false
│  Condição ?  │────────────→  FIM
└────┬─────────┘
     │ true
     ▼
┌──────────────┐
│  Executa     │
│  bloco       │
└────┬─────────┘
     │
     └───── volta para a condição
```

---

## 1. `for` — O Loop Clássico

O mais usado quando você sabe **quantas vezes** quer repetir.

### Sintaxe

```javascript
for (inicialização; condição; incremento) {
  // corpo do loop
}
```

### Anatomia detalhada

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
//   ↑           ↑       ↑
//   │           │       └─ 3. Incremento (executado APÓS cada iteração)
//   │           └───────── 2. Condição (verificada ANTES de cada iteração)
//   └───────────────────── 1. Inicialização (executada UMA vez no início)

// Saída: 0, 1, 2, 3, 4
```

### Fluxo de execução

```
1. let i = 0           (inicialização)
2. i < 5 → true        (condição)
3. console.log(0)       (corpo)
4. i++  → i = 1         (incremento)
5. i < 5 → true         (condição)
6. console.log(1)       (corpo)
7. i++  → i = 2         (incremento)
   ...
12. i < 5 → false       (condição → PARA)
```

### Exemplos práticos

```javascript
// Iterar um array por índice
const frutas = ["maçã", "banana", "uva"];
for (let i = 0; i < frutas.length; i++) {
  console.log(`${i}: ${frutas[i]}`);
}
// 0: maçã
// 1: banana
// 2: uva

// Loop reverso
for (let i = frutas.length - 1; i >= 0; i--) {
  console.log(frutas[i]);
}
// uva, banana, maçã

// Pular de 2 em 2
for (let i = 0; i < 10; i += 2) {
  console.log(i); // 0, 2, 4, 6, 8
}
```

### Loop infinito (cuidado!)

```javascript
// ❌ Loop infinito — trava o navegador/Node
// for (;;) {
//   console.log("eterno");
// }

// ❌ Condição que nunca é false
// for (let i = 0; i >= 0; i++) {
//   console.log(i);
// }
```

---

## 2. `while` — Enquanto For Verdade

Executa o bloco **enquanto** a condição for `true`. Ideal quando **não sei quantas vezes** vai repetir.

### Sintaxe

```javascript
while (condição) {
  // corpo
  // IMPORTANTE: algo deve mudar a condição, senão = loop infinito
}
```

### Exemplos

```javascript
// Contagem simples
let contador = 0;
while (contador < 5) {
  console.log(contador);
  contador++; // sem isso = loop infinito!
}
// 0, 1, 2, 3, 4
```

```javascript
// Caso de uso real: processar até condição externa
let tentativas = 0;
let sucesso = false;

while (!sucesso && tentativas < 3) {
  tentativas++;
  console.log(`Tentativa ${tentativas}...`);
  sucesso = Math.random() > 0.5; // simula sucesso/falha
}

if (sucesso) {
  console.log(`Sucesso na tentativa ${tentativas}!`);
} else {
  console.log("Falhou após 3 tentativas");
}
```

```javascript
// Dividir número até chegar a 1
let n = 1024;
let divisoes = 0;

while (n > 1) {
  n = Math.floor(n / 2);
  divisoes++;
}
console.log(`Dividiu ${divisoes} vezes`); // "Dividiu 10 vezes"
```

---

## 3. `do...while` — Executa Pelo Menos Uma Vez

A condição é verificada **depois** da primeira execução. Garante que o bloco rode **no mínimo uma vez**.

### Sintaxe

```javascript
do {
  // corpo (executa ao menos 1 vez)
} while (condição);
```

### Diferença visual

```
WHILE:                          DO...WHILE:
                                
┌──────────┐                    ┌──────────┐
│ Condição │ ← verifica ANTES   │  Executa │ ← executa ANTES
└────┬─────┘                    └────┬─────┘
     │ true                          │
     ▼                               ▼
┌──────────┐                    ┌──────────┐
│  Executa │                    │ Condição │ ← verifica DEPOIS
└──────────┘                    └──────────┘
```

### Exemplo prático

```javascript
// Menu de opções — mostra pelo menos uma vez
let opcao;
do {
  opcao = prompt("Escolha: 1-Jogar, 2-Opções, 3-Sair");

  switch (opcao) {
    case "1":
      console.log("Iniciando jogo...");
      break;
    case "2":
      console.log("Abrindo opções...");
      break;
    case "3":
      console.log("Saindo...");
      break;
    default:
      console.log("Opção inválida!");
  }
} while (opcao !== "3");
```

```javascript
// Gerar número aleatório até conseguir > 0.9
let numero;
let tentativas = 0;

do {
  numero = Math.random();
  tentativas++;
} while (numero <= 0.9);

console.log(`Obteve ${numero.toFixed(3)} após ${tentativas} tentativas`);
```

---

## 4. `for...in` — Iterar Propriedades de Objetos

Percorre as **chaves enumeráveis** (nomes das propriedades) de um objeto.

### Sintaxe

```javascript
for (let chave in objeto) {
  // chave é o NOME da propriedade (string)
}
```

### Exemplo

```javascript
const carro = {
  marca: "Toyota",
  modelo: "Corolla",
  ano: 2023
};

for (let prop in carro) {
  console.log(`${prop}: ${carro[prop]}`);
}
// marca: Toyota
// modelo: Corolla
// ano: 2023
```

### Cuidados com `for...in`

```javascript
// ⚠️ Percorre propriedades HERDADAS do protótipo também
const animal = { tipo: "mamífero" };
const cachorro = Object.create(animal);
cachorro.nome = "Rex";
cachorro.raca = "Labrador";

for (let prop in cachorro) {
  console.log(prop); // nome, raca, tipo ← "tipo" é herdado!
}

// ✅ Filtrar só propriedades próprias
for (let prop in cachorro) {
  if (Object.hasOwn(cachorro, prop)) {
    console.log(prop); // nome, raca (apenas próprias)
  }
}
```

```javascript
// ❌ NÃO use for...in em arrays
const arr = ["a", "b", "c"];
for (let i in arr) {
  console.log(typeof i); // "string" — i é "0", "1", "2" (não números!)
}
// Use for...of ou for clássico para arrays
```

---

## 5. `for...of` — Iterar Valores de Iteráveis

Percorre os **valores** de qualquer objeto iterável (arrays, strings, Map, Set, etc.).

### Sintaxe

```javascript
for (let valor of iterável) {
  // valor é o VALOR de cada item
}
```

### Exemplos

```javascript
// Arrays
const cores = ["vermelho", "verde", "azul"];
for (const cor of cores) {
  console.log(cor);
}
// vermelho, verde, azul

// Strings (itera caractere por caractere)
for (const char of "Hello") {
  console.log(char);
}
// H, e, l, l, o

// Map
const mapa = new Map([["a", 1], ["b", 2]]);
for (const [chave, valor] of mapa) {
  console.log(`${chave} = ${valor}`);
}
// a = 1
// b = 2

// Set
const unicos = new Set([1, 2, 3]);
for (const num of unicos) {
  console.log(num);
}
// 1, 2, 3
```

### `for...in` vs `for...of`

```javascript
const arr = ["a", "b", "c"];

// for...in → CHAVES (índices como strings)
for (let x in arr) {
  console.log(x); // "0", "1", "2"
}

// for...of → VALORES
for (let x of arr) {
  console.log(x); // "a", "b", "c"
}
```

| Aspecto | `for...in` | `for...of` |
|---------|-----------|-----------|
| Itera sobre | Chaves (propriedades) | Valores |
| Funciona em | Objetos | Iteráveis (Array, String, Map, Set) |
| Objetos comuns? | ✅ Sim | ❌ Não (objetos não são iteráveis por padrão) |
| Arrays? | ⚠️ Possível mas evite | ✅ Recomendado |
| Herança | Inclui propriedades herdadas | Não se aplica |

### `for...of` com índice usando `entries()`

```javascript
const nomes = ["Ana", "Carlos", "Felix"];

for (const [indice, nome] of nomes.entries()) {
  console.log(`${indice}: ${nome}`);
}
// 0: Ana
// 1: Carlos
// 2: Felix
```

---

## 6. Comparação Geral de Todos os Loops

```javascript
const frutas = ["maçã", "banana", "uva"];

// 1. for clássico — quando precisa do índice ou controle total
for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}

// 2. for...of — forma mais limpa para iterar valores
for (const fruta of frutas) {
  console.log(fruta);
}

// 3. forEach — método de array (não é loop da linguagem)
frutas.forEach((fruta, indice) => {
  console.log(`${indice}: ${fruta}`);
});

// 4. while — quando a condição de parada não é numérica
let i = 0;
while (i < frutas.length) {
  console.log(frutas[i]);
  i++;
}
```

### Quando usar cada um

| Loop | Melhor para |
|------|------------|
| `for` | Controle total do índice, loops numéricos, performance crítica |
| `for...of` | Iterar valores de arrays, strings, Map, Set |
| `for...in` | Iterar propriedades de objetos |
| `while` | Condição de parada desconhecida ou dinâmica |
| `do...while` | Precisa executar pelo menos uma vez |
| `forEach` | Iterar arrays com callback (não suporta break) |

---

## 7. Loops Aninhados

```javascript
// Tabuada de multiplicação
for (let i = 1; i <= 5; i++) {
  let linha = "";
  for (let j = 1; j <= 5; j++) {
    linha += `${(i * j).toString().padStart(3)} `;
  }
  console.log(linha);
}
//   1   2   3   4   5
//   2   4   6   8  10
//   3   6   9  12  15
//   4   8  12  16  20
//   5  10  15  20  25
```

```javascript
// Buscar em matriz (array 2D)
const matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

let alvo = 5;
for (let i = 0; i < matriz.length; i++) {
  for (let j = 0; j < matriz[i].length; j++) {
    if (matriz[i][j] === alvo) {
      console.log(`Encontrado na posição [${i}][${j}]`);
    }
  }
}
// "Encontrado na posição [1][1]"
```

---

## 8. Erros Comuns

### Off-by-one (erro de limite)

```javascript
const arr = [10, 20, 30]; // length = 3, índices 0, 1, 2

// ❌ Usa <= em vez de < → acessa índice 3 (inexistente)
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]); // 10, 20, 30, undefined ← bug!
}

// ✅ Correto
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 10, 20, 30
}
```

### Modificar array durante iteração

```javascript
// ❌ Remover itens enquanto itera pode pular elementos
let nums = [1, 2, 3, 4, 5];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 === 0) {
    nums.splice(i, 1); // remove o item, mas i continua incrementando
  }
}
console.log(nums); // [1, 3, 5]? Nem sempre! Pode pular itens.

// ✅ Use filter para criar um novo array
let nums2 = [1, 2, 3, 4, 5];
let impares = nums2.filter(n => n % 2 !== 0);
console.log(impares); // [1, 3, 5]
```

### Loop infinito por erro na condição

```javascript
// ❌ Decremento quando deveria incrementar
// for (let i = 0; i < 10; i--) { }  // i nunca chega a 10

// ❌ Condição que nunca muda
// let x = 5;
// while (x > 0) {
//   console.log(x); // esqueceu x--
// }
```

---

## Resumo

| Loop | Sintaxe | Caso de uso |
|------|---------|-------------|
| `for` | `for (init; cond; inc)` | Repetição com controle numérico |
| `while` | `while (cond)` | Repetição com condição dinâmica |
| `do...while` | `do { } while (cond)` | Pelo menos uma execução |
| `for...in` | `for (key in obj)` | Propriedades de objetos |
| `for...of` | `for (val of iterable)` | Valores de iteráveis |

---

> **Próximo:** [controle-de-fluxo.md](controle-de-fluxo.md) — break, continue, return e labels.
