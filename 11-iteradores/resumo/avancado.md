# Iteradores e Generators - Visao Avancada

## Funcionamento real do JavaScript
Um iteravel retorna iterador por `Symbol.iterator`. O iterador precisa respeitar contrato de `next()`, incluindo termino com `done: true`.

```javascript
const intervalo = {
  inicio: 1,
  fim: 3,
  [Symbol.iterator]() {
    let atual = this.inicio;
    return {
      next: () => ({ value: atual, done: atual++ > this.fim })
    };
  }
};
```

## Generator como maquina de estado
`yield` pausa execucao e preserva contexto interno. Cada `next()` retoma exatamente de onde parou.

## Pegadinhas comuns
- Consumir iterador uma vez pode esgota-lo
- Misturar efeitos colaterais dentro de generator dificulta depuracao
- `for...of` ignora valor final de `return` do generator

## Comparacoes importantes
- Array: materializado
- Iterador: fluxo incremental
- Generator: forma declarativa de descrever o fluxo incremental

## Modelo mental
Use iteracao lazy quando o custo de gerar tudo antecipadamente e alto em memoria, tempo ou ambos.
