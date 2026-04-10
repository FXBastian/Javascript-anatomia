# Contexto de Execucao - Visao Avancada

## Funcionamento real do JavaScript
Cada contexto passa por duas fases:
1. Criacao: registra declaracoes e prepara bindings
2. Execucao: avalia expressoes e atualiza valores

Isso explica por que algumas referencias existem antes da linha onde aparecem (hoisting).

## Comparacoes importantes
- `function declaration` sobe com implementacao
- `var` sobe inicializada com `undefined`
- `let` e `const` sobem, mas ficam em TDZ ate inicializacao

```javascript
console.log(fn()); // funciona
function fn() { return "ok"; }

console.log(x); // undefined
var x = 10;
```

## Pegadinhas comuns
- Achar que TDZ significa "nao existe"; existe, mas inacessivel
- Misturar escopo de bloco com escopo de funcao
- Esquecer que cada chamada recursiva cria novo contexto

## Modelo mental
Visualize uma pilha de contextos vivos. Resolucao de nome segue escopo lexico, nao ordem de chamada. Essa distincao e crucial para closures e debug.
