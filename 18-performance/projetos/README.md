# Projetos Praticos — Performance e Memoria

## Projeto 1: Memory Leak Detector

```javascript
class MemoryTracker {
  #snapshots = [];

  tirarSnapshot(label) {
    if (typeof performance !== "undefined" && performance.memory) {
      this.#snapshots.push({
        label,
        timestamp: Date.now(),
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize
      });
    } else {
      // Node.js
      const mem = process.memoryUsage();
      this.#snapshots.push({
        label,
        timestamp: Date.now(),
        heapUsed: mem.heapUsed,
        heapTotal: mem.heapTotal,
        rss: mem.rss
      });
    }
  }

  comparar() {
    if (this.#snapshots.length < 2) return "Precisa de pelo menos 2 snapshots";
    const primeiro = this.#snapshots[0];
    const ultimo = this.#snapshots[this.#snapshots.length - 1];
    const chave = primeiro.heapUsed !== undefined ? "heapUsed" : "usedJSHeapSize";

    return {
      de: primeiro.label,
      para: ultimo.label,
      diferenca: `${((ultimo[chave] - primeiro[chave]) / 1024 / 1024).toFixed(2)} MB`,
      cresceu: ultimo[chave] > primeiro[chave]
    };
  }

  relatorio() {
    return this.#snapshots.map((s, i) => {
      const chave = s.heapUsed !== undefined ? "heapUsed" : "usedJSHeapSize";
      return `[${s.label}] ${(s[chave] / 1024 / 1024).toFixed(2)} MB`;
    }).join("\n");
  }
}

// Demonstrar memory leak
const tracker = new MemoryTracker();
tracker.tirarSnapshot("inicio");

const leaks = [];
for (let i = 0; i < 100000; i++) {
  leaks.push({ dados: new Array(100).fill("x") });
}

tracker.tirarSnapshot("apos 100k objetos");
console.log(tracker.relatorio());
console.log(tracker.comparar());
```

---

## Projeto 2: Object Pool

```javascript
class ObjectPool {
  #criar;
  #resetar;
  #pool = [];
  #emUso = new Set();

  constructor(criar, resetar, tamanhoInicial = 10) {
    this.#criar = criar;
    this.#resetar = resetar;
    for (let i = 0; i < tamanhoInicial; i++) {
      this.#pool.push(this.#criar());
    }
  }

  adquirir() {
    let obj = this.#pool.pop();
    if (!obj) obj = this.#criar();
    this.#emUso.add(obj);
    return obj;
  }

  liberar(obj) {
    if (!this.#emUso.has(obj)) return;
    this.#emUso.delete(obj);
    this.#resetar(obj);
    this.#pool.push(obj);
  }

  get stats() {
    return {
      disponiveis: this.#pool.length,
      emUso: this.#emUso.size,
      total: this.#pool.length + this.#emUso.size
    };
  }
}

// Exemplo: pool de vetores (evita garbage collection constante)
const vetorPool = new ObjectPool(
  () => ({ x: 0, y: 0 }),
  (v) => { v.x = 0; v.y = 0; },
  50
);

const v = vetorPool.adquirir();
v.x = 100; v.y = 200;
console.log(v);
vetorPool.liberar(v);
console.log(vetorPool.stats);
```

---

## Projeto 3: Performance Benchmark Utility

```javascript
class Benchmark {
  static medir(nome, fn, iteracoes = 1000) {
    // Warmup
    for (let i = 0; i < 10; i++) fn();

    const tempos = [];
    for (let i = 0; i < iteracoes; i++) {
      const inicio = performance.now();
      fn();
      tempos.push(performance.now() - inicio);
    }

    tempos.sort((a, b) => a - b);
    return {
      nome,
      iteracoes,
      media: (tempos.reduce((a, b) => a + b, 0) / iteracoes).toFixed(4) + "ms",
      mediana: tempos[Math.floor(iteracoes / 2)].toFixed(4) + "ms",
      min: tempos[0].toFixed(4) + "ms",
      max: tempos[iteracoes - 1].toFixed(4) + "ms"
    };
  }

  static comparar(testes) {
    const resultados = testes.map(({ nome, fn }) => Benchmark.medir(nome, fn));
    console.table(resultados);
    return resultados;
  }
}

// Comparar: for vs forEach vs for...of
const arr = Array.from({ length: 10000 }, (_, i) => i);

Benchmark.comparar([
  { nome: "for classico", fn: () => { let s = 0; for (let i = 0; i < arr.length; i++) s += arr[i]; } },
  { nome: "forEach", fn: () => { let s = 0; arr.forEach(v => s += v); } },
  { nome: "for...of", fn: () => { let s = 0; for (const v of arr) s += v; } },
  { nome: "reduce", fn: () => arr.reduce((a, b) => a + b, 0) }
]);
```
