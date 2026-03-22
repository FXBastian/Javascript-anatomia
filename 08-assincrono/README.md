# Módulo 08 — Assincronismo

## Sobre este módulo

JavaScript é **single-threaded**, mas consegue lidar com operações demoradas (rede, timers, I/O) sem travar. O segredo está no **modelo assíncrono** baseado em Event Loop. Este módulo é **obrigatório** para qualquer desenvolvedor JavaScript.

## O que você vai aprender

- Como callbacks funcionam e por que causam "callback hell"
- O que são Promises e como encadear operações
- Como `async/await` simplifica código assíncrono
- O Event Loop em detalhes: macrotasks, microtasks e ordem de execução

## Arquivos deste módulo

| Arquivo | Conteúdo |
|---------|----------|
| [callbacks.md](callbacks.md) | Conceito, padrões, callback hell, inversão de controle |
| [promises.md](promises.md) | Criação, then/catch/finally, encadeamento, Promise.all/race |
| [async-await.md](async-await.md) | Sintaxe, tratamento de erros, padrões avançados |
| [event-loop.md](event-loop.md) | Call Stack + Web APIs + Task Queue + Microtask Queue |

## Conexão com outros módulos

- Depende do **Módulo 03** (funções como callbacks) e **Módulo 06** (Call Stack)
- **Módulo 14** usa Promises com a Fetch API
- **Módulo 16** cobre tratamento de erros em código assíncrono
- **Módulo 11** conecta generators com iteração assíncrona
