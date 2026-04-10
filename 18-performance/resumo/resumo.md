# Performance em JavaScript - Resumo

## Visao geral
Performance e entregar resposta rapida com uso eficiente de CPU, memoria e rede.

## Conceitos principais
- Evitar trabalho desnecessario
- Reduzir renderizacoes e reprocessamentos
- Entender custo de alocacao de memoria
- Medir antes de otimizar

## Exemplo
```javascript
const ativos = usuarios.filter(u => u.ativo);
const nomes = ativos.map(u => u.nome);
```

## Boas praticas
- Evite otimizar no escuro
- Prefira algoritmos simples e bons
- Reutilize estruturas quando fizer sentido

## Fluxo Mental
Performance e ciclo: medir, identificar gargalo, aplicar mudanca pequena, medir novamente. Sem medicao, otimizacao vira suposicao.
