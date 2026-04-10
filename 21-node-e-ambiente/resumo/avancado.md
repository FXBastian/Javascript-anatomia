# Node.js e Ambiente - Visao Avancada

## Funcionamento real
libuv usa 4 threads por padrao para operacoes de I/O (configuravel com UV_THREADPOOL_SIZE). DNS, fs e crypto usam thread pool. TCP/UDP usam polling do OS (epoll/kqueue/IOCP).

## Cluster e Worker Threads

```javascript
// Cluster: multiplos processos Node
const cluster = require("cluster");
const os = require("os");

if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
} else {
  // Cada worker e um processo independente
  require("./server.js");
}
```

## Pegadinhas comuns
- `__dirname` nao existe em ESM (usar `import.meta.url`)
- `process.nextTick` tem prioridade sobre microtasks
- `require` e sincrono e cached; `import()` e assincrono
- Buffer vs String: binarios (imagens, crypto) usam Buffer, texto usa string

## Modelo mental
Node e um loop de eventos com acesso ao OS. Tudo que e rapido (calculos) roda na thread principal. Tudo que e lento (I/O) roda em background e notifica via callback quando pronto.
