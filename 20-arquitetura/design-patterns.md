# Design Patterns em JavaScript

## O que sao Design Patterns?

Solucoes testadas e catalogadas para problemas comuns de design de software. Nao sao codigo pronto — sao modelos mentais para organizar logica.

## Por que existem?

Codigo sem patterns tende a:
- Acoplar componentes fortemente
- Dificultar testes
- Tornar mudancas perigosas
- Repetir solucoes de formas inconsistentes

## Categorias Principais

### Criacionais — Como criar objetos
- **Factory**: Criar objetos sem especificar a classe exata
- **Singleton**: Garantir uma unica instancia
- **Builder**: Construir objetos complexos passo a passo

### Estruturais — Como compor objetos
- **Decorator**: Adicionar comportamento sem alterar a classe
- **Facade**: Interface simplificada para subsistema complexo
- **Proxy**: Controlar acesso a outro objeto

### Comportamentais — Como objetos se comunicam
- **Observer**: Notificar multiplos objetos sobre mudancas
- **Strategy**: Trocar algoritmos em tempo de execucao
- **Iterator**: Percorrer colecoes sem expor estrutura interna

---

## Factory Pattern

```javascript
function criarUsuario(tipo, dados) {
  const base = { ...dados, criadoEm: new Date() };

  switch (tipo) {
    case "admin":
      return { ...base, role: "admin", permissoes: ["ler", "escrever", "deletar"] };
    case "editor":
      return { ...base, role: "editor", permissoes: ["ler", "escrever"] };
    case "leitor":
      return { ...base, role: "leitor", permissoes: ["ler"] };
    default:
      throw new Error(`Tipo "${tipo}" desconhecido`);
  }
}

const admin = criarUsuario("admin", { nome: "Ana" });
const leitor = criarUsuario("leitor", { nome: "Carlos" });
```

**Quando usar**: Quando a logica de criacao e complexa ou varia por tipo.

---

## Singleton Pattern

```javascript
// Com closure
const Configuracao = (() => {
  let instancia = null;

  function criar() {
    const config = {};
    return {
      set(chave, valor) { config[chave] = valor; },
      get(chave) { return config[chave]; },
      todos() { return { ...config }; }
    };
  }

  return {
    obter() {
      if (!instancia) instancia = criar();
      return instancia;
    }
  };
})();

const c1 = Configuracao.obter();
const c2 = Configuracao.obter();
console.log(c1 === c2); // true — mesma instancia
```

**Quando usar**: Estado global compartilhado (config, cache, connection pool).

---

## Strategy Pattern

```javascript
const estrategiasDeOrdenacao = {
  preco: (a, b) => a.preco - b.preco,
  nome: (a, b) => a.nome.localeCompare(b.nome),
  avaliacao: (a, b) => b.avaliacao - a.avaliacao,
  recente: (a, b) => new Date(b.data) - new Date(a.data)
};

function ordenarProdutos(produtos, estrategia) {
  const fn = estrategiasDeOrdenacao[estrategia];
  if (!fn) throw new Error(`Estrategia "${estrategia}" nao existe`);
  return [...produtos].sort(fn);
}

const produtos = [
  { nome: "Mouse", preco: 50, avaliacao: 4.5 },
  { nome: "Teclado", preco: 120, avaliacao: 4.8 },
  { nome: "Monitor", preco: 900, avaliacao: 4.2 }
];

console.log(ordenarProdutos(produtos, "preco"));
console.log(ordenarProdutos(produtos, "avaliacao"));
```

**Quando usar**: Multiplos algoritmos intercambiaveis para a mesma operacao.

---

## Decorator Pattern

```javascript
function comLog(fn) {
  return function (...args) {
    console.log(`Chamando ${fn.name} com:`, args);
    const resultado = fn.apply(this, args);
    console.log(`${fn.name} retornou:`, resultado);
    return resultado;
  };
}

function comCache(fn) {
  const cache = new Map();
  return function (...args) {
    const chave = JSON.stringify(args);
    if (cache.has(chave)) return cache.get(chave);
    const resultado = fn.apply(this, args);
    cache.set(chave, resultado);
    return resultado;
  };
}

function comTempo(fn) {
  return function (...args) {
    const inicio = performance.now();
    const resultado = fn.apply(this, args);
    console.log(`${fn.name}: ${(performance.now() - inicio).toFixed(2)}ms`);
    return resultado;
  };
}

// Composicao de decorators
let calcular = (x, y) => x ** y;
calcular = comLog(comCache(comTempo(calcular)));
calcular(2, 10);
calcular(2, 10); // cache hit
```

---

## Erros Comuns

1. **Over-engineering**: Aplicar patterns onde um `if` simples basta
2. **Pattern errado**: Usar Singleton quando precisa de Factory
3. **Ignorar patterns nativos**: JS ja tem Iterator, Observer (EventTarget), Proxy nativos
4. **Misturar paradigmas**: Usar patterns OOP puros em codigo funcional

## Modelo Mental

Patterns nao sao regras — sao vocabulario compartilhado. Antes de aplicar um pattern, pergunte:
1. Qual problema estou resolvendo?
2. Uma solucao simples resolve?
3. Este pattern facilita ou complica manutencao futura?
