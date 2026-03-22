# Módulo 11 — Iteradores e Generators

## Sobre este módulo

O **Iterator Protocol** é o mecanismo que permite que `for...of` funcione. **Generators** são funções especiais que podem pausar e retomar sua execução. Juntos, desbloquem padrões poderosos de iteração e controle de fluxo.

## O que você vai aprender

- O Iterator Protocol (`Symbol.iterator`, `next()`)
- Como criar iteráveis personalizados
- Generator functions (`function*`, `yield`)
- Generators como produtores de dados sob demanda

## Arquivos deste módulo

| Arquivo | Conteúdo |
|---------|----------|
| [iterators.md](iterators.md) | Iterator protocol, Symbol.iterator, iteráveis personalizados |
| [generators.md](generators.md) | function*, yield, yield*, lazy evaluation, async generators |

## Conexão com outros módulos

- Depende do **Módulo 02** (`for...of`) e **Módulo 03** (funções)
- **Módulo 10** — Map e Set implementam o iterator protocol
- **Módulo 08** — Generators podem ser usados em padrões assíncronos
- **Módulo 04** — Arrays são iteráveis nativos
