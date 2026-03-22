# Módulo 06 — Contexto de Execução

## Sobre este módulo

Este é um dos módulos mais importantes para entender JavaScript de verdade. O **Contexto de Execução** é o mecanismo interno que a engine usa para gerenciar a execução do código. Entender isso explica hoisting, escopo, closures e muitos comportamentos "estranhos" da linguagem.

## O que você vai aprender

- O que é um Execution Context e como ele é criado
- Como a Call Stack gerencia a execução de funções
- Por que hoisting acontece e como evitar armadilhas
- Como o escopo léxico funciona e por que closures existem

## Arquivos deste módulo

| Arquivo | Conteúdo |
|---------|----------|
| [execution-context.md](execution-context.md) | Global EC, Function EC, fases de criação e execução |
| [call-stack.md](call-stack.md) | Pilha de chamadas, stack overflow, debugging |
| [hoisting.md](hoisting.md) | Hoisting de var, let, const, functions e classes |
| [escopo.md](escopo.md) | Escopo global, local, de bloco, léxico, closures |

## Conexão com outros módulos

- Depende do **Módulo 01** (variáveis) e **Módulo 03** (funções)
- **Módulo 07** é uma extensão natural — o `this` é definido no contexto de execução
- **Módulo 08** conecta a Call Stack com o Event Loop
- **Módulo 03** (closures) é explicado pelo escopo léxico deste módulo
