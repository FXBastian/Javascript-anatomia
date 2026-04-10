# Módulo 19 — Event Loop e Callbacks Avançado

## Sobre este módulo

Este módulo vai além do básico e desmonta o **motor de execução** do JavaScript: a Call Stack, as Web APIs, a Callback Queue e o Event Loop. Aqui você vai entender **como o JavaScript pensa** — e por que ele executa código na ordem que executa.

> Se você domina o Event Loop, você domina JavaScript de verdade.

## O que você vai aprender

- Como a Call Stack executa código síncrono (LIFO)
- O papel das Web APIs como assistentes externos
- A diferença real entre Microtask Queue e Macrotask Queue
- O algoritmo do Event Loop tick a tick
- Como prever a ordem de execução de qualquer código assíncrono

## Arquivos deste módulo

| Arquivo | Conteúdo |
|---------|----------|
| [resumo/resumo.md](resumo/resumo.md) | Visão didática e direta: Call Stack, Web APIs, Queue e Event Loop |
| [resumo/avancado.md](resumo/avancado.md) | Nível profissional: Microtasks vs Macrotasks, ordem de execução, pegadinhas |
| [simulacao-event-loop.js](simulacao-event-loop.js) | Simulação comentada passo a passo da execução real |

## Conexão com outros módulos

- Depende do **Módulo 06** (Call Stack e Execution Context)
- Depende do **Módulo 08** (Callbacks, Promises, async/await)
- Conecta com **Módulo 14** (Fetch API e Timers)
- Conecta com **Módulo 13** (Eventos DOM)

## Fluxo Mental

```
Código síncrono PRIMEIRO → Microtasks (Promises) SEGUNDO → Macrotasks (setTimeout) TERCEIRO
```

> JavaScript não é assíncrono — ele **delega**. Web APIs fazem o trabalho pesado. O Event Loop decide quando cada callback volta para execução.
