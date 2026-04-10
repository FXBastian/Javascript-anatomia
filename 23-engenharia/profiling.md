# Profiling

## O que e?

Profiling e medir onde seu codigo gasta tempo e memoria. Sem profiling, otimizacao e adivinhacao.

## Por que importa?

A regra dos 80/20: 80% do tempo e gasto em 20% do codigo. Profiling mostra ONDE esta esse 20%.

---

## Performance API

```javascript
// Marcar pontos no tempo
performance.mark("inicio-render");
// ... codigo ...
performance.mark("fim-render");

performance.measure("render", "inicio-render", "fim-render");
const medida = performance.getEntriesByName("render")[0];
console.log(`Render: ${medida.duration.toFixed(2)}ms`);
```

---

## Medir Funcoes

```javascript
function medirTempo(fn, label) {
  return function (...args) {
    const inicio = performance.now();
    const resultado = fn.apply(this, args);
    const duracao = performance.now() - inicio;
    console.log(`[${label || fn.name}] ${duracao.toFixed(2)}ms`);
    return resultado;
  };
}

// Uso
const ordenarMedido = medirTempo(
  (arr) => [...arr].sort((a, b) => a - b),
  "ordenar"
);

const grande = Array.from({ length: 100000 }, () => Math.random());
ordenarMedido(grande);
```

---

## Memory Profiling

```javascript
// No Node.js
function mostrarMemoria(label) {
  const uso = process.memoryUsage();
  console.log(`[${label}]`, {
    heapUsed: `${(uso.heapUsed / 1024 / 1024).toFixed(1)}MB`,
    heapTotal: `${(uso.heapTotal / 1024 / 1024).toFixed(1)}MB`,
    rss: `${(uso.rss / 1024 / 1024).toFixed(1)}MB`
  });
}

mostrarMemoria("antes");
const dados = new Array(1000000).fill({ x: 1, y: 2 });
mostrarMemoria("depois de alocar");
dados.length = 0;
global.gc?.(); // node --expose-gc
mostrarMemoria("depois de limpar");
```

---

## DevTools Performance Tab (Browser)

1. Abrir DevTools → Performance
2. Click em Record
3. Interagir com a pagina
4. Parar gravacao
5. Analisar:
   - **Flame Chart**: quais funcoes levaram mais tempo
   - **Bottom-Up**: funcoes ordenadas por tempo total
   - **Call Tree**: hierarquia de chamadas
   - **Summary**: distribuicao (Scripting, Rendering, Painting)

---

## DevTools Memory Tab

1. **Heap Snapshot**: foto da memoria em um momento
2. **Allocation Timeline**: alocacoes ao longo do tempo
3. **Allocation Sampling**: amostragem por funcao

Para encontrar leaks: tirar 2 snapshots, comparar, e ver objetos que so crescem.

---

## Gargalos Comuns

| Problema | Sintoma | Solucao |
|----------|---------|---------|
| Reflow excessivo | Layout lento | Batch DOM reads/writes |
| Closures grandes | Heap crescente | Liberar referencias |
| Loops O(n²) | CPU alta | Usar Map/Set ou algoritmo melhor |
| JSON.parse grande | Pausa longa | Streams ou Web Worker |
| Regex catastrofica | Trava | Simplificar regex |

---

## Erros Comuns

- Otimizar sem medir (premature optimization)
- Medir em modo de desenvolvimento (dev mode e mais lento)
- Ignorar o garbage collector (pode causar pausas)
- Focar em microbenchmarks ao inves do fluxo real do usuario

## Modelo Mental

Primeiro MEDIR, depois OTIMIZAR, depois MEDIR de novo. Sem dados, otimizacao e adivinhacao. Com dados, e engenharia.
