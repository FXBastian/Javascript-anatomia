# Assincrono - Visao Avancada

## Funcionamento real do JavaScript
A engine executa uma call stack unica. Quando a stack esvazia, o runtime puxa tarefas das filas:
- Microtasks: `Promise.then`, `queueMicrotask`
- Macrotasks: `setTimeout`, I/O, eventos

Microtasks sao drenadas antes da proxima macrotask.

```javascript
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("microtask"));
console.log("sync");
// sync -> microtask -> timeout
```

## Comparacoes importantes
JS no main thread e concorrente por agendamento, nao paralelo por padrao. Paralelismo real exige workers ou recursos externos.

## Pegadinhas comuns
- `await` em loop pode serializar sem necessidade
- Falha em `Promise.all` aborta o conjunto
- Promises nao cancelam sozinhas; use AbortController quando possivel

## Modelo mental
Pense em pipeline de dependencias: agrupe tarefas independentes em concorrencia e preserve sequencia apenas onde existe dependencia real.
