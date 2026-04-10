# Projetos Praticos — Iteradores e Generators

## Projeto 1: Lazy Evaluation com Generators

```javascript
function* range(inicio, fim, passo = 1) {
  for (let i = inicio; i <= fim; i += passo) {
    yield i;
  }
}

function* map(iteravel, fn) {
  for (const item of iteravel) {
    yield fn(item);
  }
}

function* filter(iteravel, fn) {
  for (const item of iteravel) {
    if (fn(item)) yield item;
  }
}

function* take(iteravel, n) {
  let count = 0;
  for (const item of iteravel) {
    if (count >= n) return;
    yield item;
    count++;
  }
}

function toArray(iteravel) {
  return [...iteravel];
}

// Pipeline lazy: nada executa ate consumir
const numeros = range(1, 1000000);
const pares = filter(numeros, n => n % 2 === 0);
const dobrados = map(pares, n => n * 2);
const primeiros10 = take(dobrados, 10);

// So agora os valores sao calculados (sob demanda)
console.log(toArray(primeiros10)); // [4, 8, 12, 16, 20, 24, 28, 32, 36, 40]
```

---

## Projeto 2: Paginacao Infinita com Generator

```javascript
async function* paginar(urlBase, tamanhoPagina = 10) {
  let pagina = 1;
  let temMais = true;

  while (temMais) {
    // Simulacao de fetch
    const dados = await simularFetch(urlBase, pagina, tamanhoPagina);
    yield dados.items;
    temMais = dados.items.length === tamanhoPagina;
    pagina++;
  }
}

// Simulacao
async function simularFetch(url, pagina, tamanho) {
  const total = 35;
  const inicio = (pagina - 1) * tamanho;
  const items = [];
  for (let i = inicio; i < Math.min(inicio + tamanho, total); i++) {
    items.push({ id: i + 1, titulo: `Item ${i + 1}` });
  }
  return { items, pagina };
}

// Uso
(async () => {
  const paginador = paginar("/api/items", 10);

  for await (const pagina of paginador) {
    console.log(`Pagina com ${pagina.length} items:`, pagina.map(i => i.id));
    // Em app real: renderizar e esperar scroll/click para proxima
  }
})();
```

---

## Projeto 3: Iterador Customizado para Arvore

```javascript
class No {
  constructor(valor, filhos = []) {
    this.valor = valor;
    this.filhos = filhos;
  }

  *[Symbol.iterator]() {
    yield this.valor;
    for (const filho of this.filhos) {
      yield* filho; // delegacao de generator
    }
  }
}

const arvore = new No("raiz", [
  new No("A", [
    new No("A1"),
    new No("A2")
  ]),
  new No("B", [
    new No("B1", [
      new No("B1a"),
      new No("B1b")
    ])
  ]),
  new No("C")
]);

// Iterar toda a arvore com for...of
for (const valor of arvore) {
  console.log(valor);
}
// raiz, A, A1, A2, B, B1, B1a, B1b, C

console.log([...arvore]); // Spread tambem funciona!
```

**Conexao**: ES6+ (modulo 09), Colecoes (modulo 10), Assincrono (modulo 08).
