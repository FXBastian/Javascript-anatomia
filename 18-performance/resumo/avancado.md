# Performance em JavaScript - Visao Avancada

## Funcionamento real do JavaScript
Normalmente o gargalo nao esta em microdetalhe de sintaxe, mas em algoritmo, I/O, renderizacao e excesso de alocacao.

## Memoria e GC
Criar muitos objetos de vida curta pressiona coletor de lixo e pode causar pausas perceptiveis.

```javascript
// evita criar array intermediario gigante quando nao precisa
let soma = 0;
for (const n of numeros) {
  if (n > 0) soma += n;
}
```

## Pegadinhas comuns
- Otimizar microbenchmark sem impacto real
- Re-renderizar DOM em cada evento de alta frequencia
- N+1 requests por falta de agregacao

## Comparacoes importantes
- Debounce: executa apos pausa
- Throttle: limita frequencia
- Memoization: troca CPU por memoria

## Modelo mental
Otimizacao profissional prioriza latencia percebida pelo usuario. Ataque primeiro o caminho critico da experiencia, nao o detalhe mais facil de mexer.
