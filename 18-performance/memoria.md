# Memória e Performance

## 1. Como a Memória Funciona no JavaScript

```
┌─────────────────────────────────────────┐
│               HEAP (memória)            │
│  Onde objetos, arrays e funções vivem   │
│                                         │
│  { nome: "Ana" }    [1, 2, 3]          │
│  function() {}      new Map()           │
└─────────────────────────────────────────┘

┌──────────────────┐
│   STACK (pilha)  │
│  Primitivos e    │
│  referências     │
│  let x = 42      │  ← valor direto
│  let obj = •──────── referência para o Heap
└──────────────────┘
```

### Valor vs Referência

```javascript
// Primitivos → cópia do valor
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (não mudou)

// Objetos → cópia da referência
let obj1 = { x: 1 };
let obj2 = obj1;
obj2.x = 99;
console.log(obj1.x); // 99 ⚠️ (mesma referência)
```

---

## 2. Garbage Collector (GC)

O motor JS remove automaticamente objetos que **não possuem referências alcançáveis**.

### Algoritmo: Mark-and-Sweep

1. **Mark** — parte da raiz (`window`, `global`) e marca tudo alcançável
2. **Sweep** — remove tudo que não foi marcado

```javascript
function processar() {
  const dados = new Array(1000000); // alocado no heap
  // ... usa dados
} // dados fica sem referência → GC pode coletar

let referencia = { grande: new Array(1000000) };
referencia = null; // agora o objeto pode ser coletado
```

---

## 3. Memory Leaks (Vazamentos Comuns)

### 1. Variáveis globais acidentais

```javascript
// ❌ Sem "use strict", cria global implícita
function salvar() {
  cache = {}; // variável global! Nunca será coletada
}

// ✅ Declare explicitamente
function salvar() {
  const cache = {};
}
```

### 2. Listeners não removidos

```javascript
// ❌ Listeners acumulam a cada chamada
function setup() {
  document.addEventListener("scroll", onScroll);
}

// ✅ Remover quando não precisar mais
function cleanup() {
  document.removeEventListener("scroll", onScroll);
}

// ✅ Ou usar AbortController
const controller = new AbortController();
document.addEventListener("scroll", onScroll, { signal: controller.signal });
controller.abort(); // remove o listener
```

### 3. Closures retendo referências

```javascript
// ❌ A closure mantém `dados` vivo enquanto `handler` existir
function init() {
  const dados = carregarDadosGrandes();
  const btn = document.querySelector("#btn");
  btn.addEventListener("click", () => {
    console.log(dados.length); // closure retém `dados`
  });
}

// ✅ Extrair só o que precisa
function init() {
  const dados = carregarDadosGrandes();
  const total = dados.length; // copia só o primitivo
  const btn = document.querySelector("#btn");
  btn.addEventListener("click", () => {
    console.log(total); // closure leve
  });
}
```

### 4. Timers esquecidos

```javascript
// ❌ setInterval roda para sempre
const id = setInterval(atualizarDados, 1000);

// ✅ Limpar quando o componente/contexto for destruído
clearInterval(id);
```

### 5. Referências a elementos DOM removidos

```javascript
// ❌ Variável mantém referência ao elemento removido
const botao = document.querySelector("#btn");
botao.remove(); // removido do DOM mas `botao` ainda aponta para ele

// ✅ Anule a referência
botao.remove();
// botao = null; // se não precisar mais (use let, não const)
```

---

## 4. WeakRef e FinalizationRegistry

Para referências que **não impedem** a coleta de lixo:

```javascript
// WeakRef — referência fraca (GC pode coletar o alvo)
let objeto = { dados: "importante" };
const ref = new WeakRef(objeto);

objeto = null; // agora o GC pode coletar

const alvo = ref.deref(); // retorna o objeto OU undefined
if (alvo) {
  console.log(alvo.dados);
}

// FinalizationRegistry — callback quando objeto for coletado
const registry = new FinalizationRegistry((valor) => {
  console.log(`Objeto "${valor}" foi coletado pelo GC`);
});

let obj = { grande: new Array(1000000) };
registry.register(obj, "meu-objeto-grande");
obj = null; // eventualmente: "Objeto meu-objeto-grande foi coletado pelo GC"
```

---

## 5. Dicas de Performance

### Evitar reflows desnecessários

```javascript
// ❌ Leitura + escrita alternadas forçam reflow
for (const el of elementos) {
  el.style.width = el.offsetWidth + 10 + "px"; // lê + escreve em loop
}

// ✅ Ler tudo primeiro, depois escrever
const larguras = [...elementos].map(el => el.offsetWidth);
elementos.forEach((el, i) => {
  el.style.width = larguras[i] + 10 + "px";
});
```

### Estruturas de dados adequadas

```javascript
// Busca por chave: Map > Object > Array
const mapa = new Map();  // O(1) para get/set/delete
const set = new Set();   // O(1) para has/add/delete

// ❌ Array para busca frequente
const index = lista.findIndex(u => u.id === id); // O(n)

// ✅ Map por ID
const porId = new Map(lista.map(u => [u.id, u]));
porId.get(id); // O(1)
```

### Object Pool (reutilizar objetos)

```javascript
// Para cenários de alta frequência (games, animação)
const pool = [];

function obter() {
  return pool.pop() || { x: 0, y: 0 };
}

function devolver(obj) {
  obj.x = 0;
  obj.y = 0;
  pool.push(obj);
}
```

---

## Checklist de Performance

| Item                                  | Ação                              |
|:-------------------------------------:|:---------------------------------:|
| Listeners acumulando                  | Remover no cleanup                |
| setInterval sem clearInterval         | Sempre limpar                     |
| Closures pesadas                      | Extrair só valores necessários    |
| DOM manipulado em loop                | Usar DocumentFragment             |
| Busca em array grande                 | Usar Map/Set                      |
| Objetos grandes em escopo externo     | Anular referência quando possível |

---

> **Parabéns!** Você completou todos os 18 módulos do **JavaScript — Anatomia da Linguagem**.  
> Volte ao [README principal](../README.md) para revisão geral.
