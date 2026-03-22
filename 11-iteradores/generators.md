# Generators

## Definição

Uma **generator function** (`function*`) é uma função que pode **pausar** sua execução com `yield` e **retomar** depois. Retorna um objeto Generator que implementa o Iterator Protocol.

---

## 1. Sintaxe Básica

```javascript
function* gerador() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = gerador(); // NÃO executa o corpo — retorna um Generator

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Funciona com for...of
for (const val of gerador()) {
  console.log(val); // 1, 2, 3
}

console.log([...gerador()]); // [1, 2, 3]
```

---

## 2. Lazy Evaluation (Avaliação Preguiçosa)

Generators produzem valores **sob demanda** — não calculam tudo de uma vez.

```javascript
// Sequência infinita — só gera quando pedido
function* naturais() {
  let n = 1;
  while (true) {
    yield n++;
  }
}

const gen = naturais();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
// Pode continuar infinitamente sem estourar memória

// Pegar os primeiros N
function take(generator, n) {
  const result = [];
  for (const val of generator) {
    result.push(val);
    if (result.length >= n) break;
  }
  return result;
}

console.log(take(naturais(), 5)); // [1, 2, 3, 4, 5]
```

### Fibonacci

```javascript
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

console.log(take(fibonacci(), 8)); // [0, 1, 1, 2, 3, 5, 8, 13]
```

---

## 3. `yield*` — Delegar para outro iterável

```javascript
function* letras() {
  yield* "abc";     // delega para o iterador de string
  yield* [1, 2, 3]; // delega para o iterador de array
}

console.log([...letras()]); // ["a", "b", "c", 1, 2, 3]

// Útil para compor generators
function* menu() {
  yield* entradas();
  yield* pratos();
  yield* sobremesas();
}
```

---

## 4. Comunicação Bidirecional

`yield` pode **receber** valores de quem chama `.next(valor)`:

```javascript
function* dialogo() {
  const nome = yield "Qual seu nome?";
  const idade = yield `Olá, ${nome}! Quantos anos?`;
  return `${nome} tem ${idade} anos.`;
}

const gen = dialogo();
console.log(gen.next());        // { value: "Qual seu nome?", done: false }
console.log(gen.next("Felix")); // { value: "Olá, Felix! Quantos anos?", done: false }
console.log(gen.next(30));      // { value: "Felix tem 30 anos.", done: true }
```

---

## 5. Async Generators (`async function*`)

Combinam generators com assincronismo — ideal para streams de dados.

```javascript
async function* fetchPaginas(baseURL) {
  let pagina = 1;
  while (true) {
    const response = await fetch(`${baseURL}?page=${pagina}`);
    const data = await response.json();
    if (data.items.length === 0) return; // fim
    yield data.items;
    pagina++;
  }
}

// for await...of — itera sobre async iterável
async function processarTudo() {
  for await (const itens of fetchPaginas("/api/produtos")) {
    itens.forEach(item => console.log(item.nome));
  }
}
```

---

## 6. Resumo

```
function* gen() { yield valor; }  → cria generator function
gen.next()                        → executa até próximo yield
gen.next(val)                     → envia valor para o yield atual
gen.return(val)                   → força finalização
yield*                            → delega para outro iterável
async function* + for await...of  → iteração assíncrona
```

| Característica | Iterator Manual | Generator |
|----------------|----------------|-----------|
| Sintaxe | Verbosa (next/done) | Concisa (yield) |
| Estado | Gerenciar manualmente | Automático |
| Lazy | Sim | Sim |
| Infinito | Sim | Sim (mais simples) |
| Async | Não | Sim (async function*) |

---

> **Próximo módulo:** [12-builtins](../12-builtins/README.md) — Objetos nativos do JavaScript.
