# Controle de Execucao - Visao Avancada

## Funcionamento real do JavaScript
Cada `if` cria uma bifurcacao cognitiva. Quanto mais caminhos, maior custo de manutencao. O foco avancado e reduzir complexidade ciclomatica sem perder clareza.

## Guard clauses
Troque blocos profundos por saidas antecipadas:

```javascript
function calcularFrete(pedido) {
  if (!pedido) throw new Error("Pedido obrigatorio");
  if (!pedido.itens.length) return 0;
  if (pedido.total > 300) return 0;
  return 25;
}
```

## Looping com intencao
- `for` quando voce controla indice
- `for...of` para iterar valores
- metodos (`map`, `filter`, `reduce`) para transformar colecoes

## Pegadinhas comuns
- `switch` sem `break` causa fall-through
- `while` com condicao mal atualizada vira loop infinito
- `continue` em excesso pode esconder regras de negocio

## Comparacoes importantes
Controle imperativo (`for`, `if`) da poder total. Controle declarativo (`map`, `some`, `every`) reduz erro acidental. Em codigo de negocio, declarativo tende a ser mais legivel.

## Modelo mental
Pense no fluxo como uma arvore de decisao: cada condicao abre caminhos. O codigo avancado reduz bifurcacoes desnecessarias e torna cada caminho facil de entender e testar.
