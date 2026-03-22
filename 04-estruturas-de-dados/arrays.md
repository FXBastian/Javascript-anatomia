# Arrays

## Definição

Um **array** é uma lista ordenada de valores acessíveis por índice numérico (começando em 0). É a estrutura de dados mais usada para coleções em JavaScript — sob o capô, arrays são objetos especiais com propriedades numéricas e a propriedade `length`.

```javascript
const frutas = ["maçã", "banana", "uva"];
console.log(frutas[0]);     // "maçã"
console.log(frutas.length); // 3
console.log(typeof frutas); // "object" — arrays são objetos!
console.log(Array.isArray(frutas)); // true ← forma correta de verificar
```

---

## 1. Criação de Arrays

```javascript
// Array literal (mais comum)
const nums = [1, 2, 3, 4, 5];

// Array.of() — cria a partir de argumentos
const arr = Array.of(1, 2, 3); // [1, 2, 3]

// Array.from() — cria a partir de iterável ou array-like
const letras = Array.from("hello"); // ["h", "e", "l", "l", "o"]
const seq = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]

// Array vazio com tamanho
const vazio = new Array(3); // [empty × 3] ← 3 slots vazios
const preenchido = new Array(3).fill(0); // [0, 0, 0]
```

---

## 2. Acesso e Modificação Básica

```javascript
const arr = [10, 20, 30, 40, 50];

// Acesso por índice
arr[0];  // 10 (primeiro)
arr[4];  // 50 (último pelo índice)
arr[-1]; // undefined ← NÃO funciona como Python!

// Último elemento
arr[arr.length - 1]; // 50
arr.at(-1);           // 50 ← (ES2022)
arr.at(-2);           // 40

// Modificar
arr[1] = 99;
console.log(arr); // [10, 99, 30, 40, 50]

// Índice fora do range
arr[10] = "longe";
console.log(arr.length); // 11 ← cria "buracos" vazios
```

---

## 3. Métodos Mutáveis (Alteram o Array Original)

### Adicionar e remover

```javascript
const arr = [2, 3, 4];

// push — adiciona no FINAL → retorna novo length
arr.push(5);       // [2, 3, 4, 5]
arr.push(6, 7);    // [2, 3, 4, 5, 6, 7]

// pop — remove do FINAL → retorna o elemento removido
arr.pop();         // retorna 7, arr = [2, 3, 4, 5, 6]

// unshift — adiciona no INÍCIO
arr.unshift(1);    // [1, 2, 3, 4, 5, 6]

// shift — remove do INÍCIO
arr.shift();       // retorna 1, arr = [2, 3, 4, 5, 6]
```

```
push/pop ──── operam no FINAL (rápido)
unshift/shift ── operam no INÍCIO (lento — desloca todos os índices)
```

### `splice()` — O canivete suíço

Remove, substitui ou insere elementos em **qualquer posição**.

```javascript
const arr = ["a", "b", "c", "d", "e"];

// splice(início, quantidadeRemover, ...elementosInserir)

// Remover 2 elementos a partir do índice 1
arr.splice(1, 2); // retorna ["b", "c"], arr = ["a", "d", "e"]

// Inserir sem remover (quantidadeRemover = 0)
arr.splice(1, 0, "x", "y"); // arr = ["a", "x", "y", "d", "e"]

// Substituir 1 elemento no índice 2
arr.splice(2, 1, "Z"); // arr = ["a", "x", "Z", "d", "e"]
```

### `sort()` — Ordenação (CUIDADO!)

```javascript
// ❌ Padrão: ordena como STRINGS
const nums = [10, 1, 21, 2];
nums.sort();
console.log(nums); // [1, 10, 2, 21] ← ordena alfabeticamente!

// ✅ Com função de comparação
nums.sort((a, b) => a - b); // [1, 2, 10, 21] — crescente
nums.sort((a, b) => b - a); // [21, 10, 2, 1] — decrescente

// Strings: localCompare para acentos corretos
const nomes = ["Álvaro", "Ana", "Ábaco"];
nomes.sort((a, b) => a.localeCompare(b, "pt-BR")); // ["Ábaco", "Álvaro", "Ana"]
```

### `reverse()` — Inverte

```javascript
const arr = [1, 2, 3];
arr.reverse(); // [3, 2, 1] — modifica o original!

// Para não modificar o original:
const invertido = [...arr].reverse();
// Ou: arr.toReversed() (ES2023)
```

### `fill()` — Preenche

```javascript
const arr = [1, 2, 3, 4, 5];
arr.fill(0);       // [0, 0, 0, 0, 0]
arr.fill(9, 1, 3); // [0, 9, 9, 0, 0] — preenche do índice 1 ao 3 (exclusivo)
```

---

## 4. Métodos Imutáveis (Retornam Novo Array)

### `map()` — Transformar cada elemento

```javascript
const nums = [1, 2, 3, 4, 5];

const dobrados = nums.map(n => n * 2);
console.log(dobrados); // [2, 4, 6, 8, 10]
console.log(nums);     // [1, 2, 3, 4, 5] — original intacto

// Com índice
const indexados = nums.map((n, i) => `${i}: ${n}`);
// ["0: 1", "1: 2", "2: 3", "3: 4", "4: 5"]

// Caso de uso: extrair propriedade
const usuarios = [
  { nome: "Felix", idade: 30 },
  { nome: "Ana", idade: 25 }
];
const nomes = usuarios.map(u => u.nome); // ["Felix", "Ana"]
```

### `filter()` — Filtrar elementos

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const pares = nums.filter(n => n % 2 === 0);
console.log(pares); // [2, 4, 6, 8, 10]

// Caso de uso: filtrar objetos
const produtos = [
  { nome: "Notebook", preco: 3500, estoque: true },
  { nome: "Mouse", preco: 80, estoque: false },
  { nome: "Teclado", preco: 200, estoque: true }
];

const disponiveis = produtos.filter(p => p.estoque);
const caros = produtos.filter(p => p.preco > 100);
```

### `reduce()` — Acumular em um único valor

O método mais poderoso e versátil. Percorre o array acumulando um resultado.

```javascript
// Sintaxe: array.reduce((acumulador, elementoAtual, indice, array) => {...}, valorInicial)

// Soma
const soma = [1, 2, 3, 4, 5].reduce((acc, n) => acc + n, 0); // 15

// Fluxo visual do reduce:
// Iteração 1: acc=0,  n=1 → 0+1  = 1
// Iteração 2: acc=1,  n=2 → 1+2  = 3
// Iteração 3: acc=3,  n=3 → 3+3  = 6
// Iteração 4: acc=6,  n=4 → 6+4  = 10
// Iteração 5: acc=10, n=5 → 10+5 = 15
```

```javascript
// Contar ocorrências
const votos = ["sim", "não", "sim", "sim", "não", "sim"];
const contagem = votos.reduce((acc, voto) => {
  acc[voto] = (acc[voto] || 0) + 1;
  return acc;
}, {});
console.log(contagem); // { sim: 4, não: 2 }

// Agrupar por categoria
const itens = [
  { nome: "Notebook", cat: "tech" },
  { nome: "Cadeira", cat: "moveis" },
  { nome: "Mouse", cat: "tech" },
  { nome: "Mesa", cat: "moveis" }
];

const agrupados = itens.reduce((acc, item) => {
  const chave = item.cat;
  if (!acc[chave]) acc[chave] = [];
  acc[chave].push(item);
  return acc;
}, {});

console.log(agrupados);
// { tech: [{...}, {...}], moveis: [{...}, {...}] }

// Object.groupBy (ES2024 — quando disponível)
// const agrupados = Object.groupBy(itens, item => item.cat);
```

### `find()` e `findIndex()` — Encontrar um elemento

```javascript
const usuarios = [
  { id: 1, nome: "Ana" },
  { id: 2, nome: "Carlos" },
  { id: 3, nome: "Felix" }
];

// find — retorna o primeiro elemento que passa no teste
const felix = usuarios.find(u => u.id === 3);
console.log(felix); // { id: 3, nome: "Felix" }

// findIndex — retorna o ÍNDICE
const indice = usuarios.findIndex(u => u.id === 3);
console.log(indice); // 2

// Se não encontrar:
console.log(usuarios.find(u => u.id === 99));      // undefined
console.log(usuarios.findIndex(u => u.id === 99)); // -1
```

### `some()` e `every()` — Testar condição

```javascript
const nums = [1, 2, 3, 4, 5];

// some — pelo menos UM passa?
nums.some(n => n > 4);  // true
nums.some(n => n > 10); // false

// every — TODOS passam?
nums.every(n => n > 0);  // true
nums.every(n => n > 3);  // false
```

### `flat()` e `flatMap()` — Achatar arrays

```javascript
// flat — achata um nível por padrão
const aninhado = [1, [2, 3], [4, [5, 6]]];
console.log(aninhado.flat());   // [1, 2, 3, 4, [5, 6]]
console.log(aninhado.flat(2));  // [1, 2, 3, 4, 5, 6]
console.log(aninhado.flat(Infinity)); // [1, 2, 3, 4, 5, 6]

// flatMap — map + flat(1) em um passo
const frases = ["Olá mundo", "Bom dia"];
const palavras = frases.flatMap(f => f.split(" "));
console.log(palavras); // ["Olá", "mundo", "Bom", "dia"]
```

### `slice()` — Extrair parte (sem modificar)

```javascript
const arr = [0, 1, 2, 3, 4, 5];

arr.slice(2);     // [2, 3, 4, 5] — do índice 2 até o final
arr.slice(1, 4);  // [1, 2, 3] — do índice 1 ao 4 (exclusivo)
arr.slice(-2);    // [4, 5] — últimos 2
arr.slice();      // [0, 1, 2, 3, 4, 5] — cópia rasa completa
```

### `concat()` — Juntar arrays

```javascript
const a = [1, 2];
const b = [3, 4];
const c = a.concat(b); // [1, 2, 3, 4]

// Spread é preferido:
const d = [...a, ...b]; // [1, 2, 3, 4]
```

### `includes()`, `indexOf()`

```javascript
const arr = [10, 20, 30, 20];

arr.includes(20);    // true
arr.includes(99);    // false

arr.indexOf(20);     // 1 (primeira ocorrência)
arr.lastIndexOf(20); // 3 (última ocorrência)
arr.indexOf(99);     // -1 (não encontrado)
```

---

## 5. Métodos ES2023+ (Versões Imutáveis)

O ES2023 introduziu versões **imutáveis** de métodos que antes modificavam o original:

```javascript
const arr = [3, 1, 2];

// Versões que NÃO modificam o original
arr.toSorted((a, b) => a - b);  // [1, 2, 3] — original intacto
arr.toReversed();                 // [2, 1, 3]
arr.toSpliced(1, 1);             // [3, 2] — removeu índice 1
arr.with(0, 99);                  // [99, 1, 2] — substituiu índice 0

console.log(arr); // [3, 1, 2] — NUNCA foi modificado
```

---

## 6. Desestruturação de Arrays

```javascript
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// Pular elementos
const [primeiro, , terceiro] = [10, 20, 30];
console.log(primeiro, terceiro); // 10 30

// Rest
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Valores padrão
const [x = 0, y = 0] = [5];
console.log(x, y); // 5 0

// Trocar valores (swap)
let m = 1, n = 2;
[m, n] = [n, m];
console.log(m, n); // 2 1
```

---

## 7. Spread com Arrays

```javascript
// Copiar
const original = [1, 2, 3];
const copia = [...original];

// Unir
const unido = [...[1, 2], ...[3, 4]]; // [1, 2, 3, 4]

// Inserir no meio
const arr = [1, 5, 6];
const inserido = [arr[0], 2, 3, 4, ...arr.slice(1)]; // [1, 2, 3, 4, 5, 6]

// Passar como argumentos
const nums = [5, 2, 8, 1, 9];
console.log(Math.max(...nums)); // 9
```

---

## 8. Iteração

```javascript
const frutas = ["maçã", "banana", "uva"];

// for clássico (quando precisa do índice)
for (let i = 0; i < frutas.length; i++) {
  console.log(`${i}: ${frutas[i]}`);
}

// for...of (mais limpo para valores)
for (const fruta of frutas) {
  console.log(fruta);
}

// for...of com entries() (índice + valor)
for (const [i, fruta] of frutas.entries()) {
  console.log(`${i}: ${fruta}`);
}

// forEach (callback — não suporta break/continue)
frutas.forEach((fruta, indice) => {
  console.log(`${indice}: ${fruta}`);
});
```

### Quando usar cada método

| Precisa | Use |
|---------|-----|
| Transformar cada item | `map()` |
| Filtrar itens | `filter()` |
| Acumular em um valor | `reduce()` |
| Encontrar um item | `find()` / `findIndex()` |
| Testar condição | `some()` / `every()` |
| Apenas iterar (efeitos) | `for...of` / `forEach` |
| Controle total (break, continue) | `for` / `for...of` |

---

## 9. Erros Comuns

### Confundir `map` e `forEach`

```javascript
// map RETORNA um novo array
const dobrados = [1, 2, 3].map(n => n * 2); // [2, 4, 6]

// forEach NÃO retorna — é para efeitos colaterais
const resultado = [1, 2, 3].forEach(n => n * 2);
console.log(resultado); // undefined!
```

### `sort()` sem comparador

```javascript
[10, 1, 21, 2].sort();            // [1, 10, 2, 21] ← strings!
[10, 1, 21, 2].sort((a, b) => a - b); // [1, 2, 10, 21] ✅
```

### Modificar array durante iteração com `forEach`

```javascript
// ❌ Comportamento imprevisível
const arr = [1, 2, 3, 4];
arr.forEach((item, i) => {
  if (item === 2) arr.splice(i, 1); // pode pular elementos
});
```

### Esquecer que `splice` modifica o original

```javascript
const arr = [1, 2, 3, 4, 5];
const removidos = arr.splice(1, 2);
console.log(removidos); // [2, 3]
console.log(arr);       // [1, 4, 5] ← modificado!

// Use toSpliced() ou slice() se quiser manter o original
```

---

## 10. Cheat Sheet — Métodos de Array

```
ADICIONAR/REMOVER:
  push(x)          → adiciona no final
  pop()            → remove do final
  unshift(x)       → adiciona no início
  shift()          → remove do início
  splice(i, n, x)  → remove/insere em qualquer posição

BUSCAR:
  find(fn)         → primeiro elemento que passa no teste
  findIndex(fn)    → índice do primeiro que passa
  indexOf(x)       → índice da primeira ocorrência
  includes(x)      → true/false se contém

TRANSFORMAR (novos arrays):
  map(fn)          → transforma cada elemento
  filter(fn)       → filtra por condição
  reduce(fn, init) → acumula em um valor
  flat(depth)      → achata arrays aninhados
  flatMap(fn)      → map + flat(1)
  slice(start,end) → extrai parte
  concat(arr)      → junta arrays

TESTAR:
  some(fn)         → pelo menos um passa?
  every(fn)        → todos passam?

ORDENAR:
  sort(fn)         → ordena (muta!)
  reverse()        → inverte (muta!)
  toSorted(fn)     → ordena (imutável, ES2023)
  toReversed()     → inverte (imutável, ES2023)

OUTROS:
  forEach(fn)      → iterar (sem retorno)
  join(sep)        → array → string
  fill(val)        → preencher
  Array.from(x)    → criar de iterável
  Array.isArray(x) → verificar se é array
```

---

> **Próximo módulo:** [06-contexto-de-execucao](../06-contexto-de-execucao/README.md) — O motor interno do JavaScript.
