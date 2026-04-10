# Engenharia de Software - Resumo

## Conceitos-chave

### Debugging
Processo sistematico: observar → hipotetizar → testar → confirmar. Ferramentas: console avancado, DevTools breakpoints, node --inspect.

### Profiling
Medir antes de otimizar. Performance API, DevTools Performance/Memory tabs, flame charts. Regra 80/20.

### Refatoracao
Mudar estrutura sem mudar comportamento. Pre-requisito: testes. Code smells: funcao longa, duplicacao, magic numbers, condicionais complexas.

## Fluxo Mental

Bug → Debug (encontrar causa) → Fix → Test → Refactor (se necessario) → Profile (se lento) → Optimize
