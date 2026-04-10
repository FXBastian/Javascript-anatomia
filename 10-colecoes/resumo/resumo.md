# Colecoes (Map e Set) - Resumo

## Visao geral
Map e Set resolvem cenarios em que objeto e array ficam limitados.

## Conceitos principais
- `Map`: pares chave-valor com qualquer tipo de chave
- `Set`: conjunto de valores unicos
- Iteracao nativa e tamanho via `size`

## Exemplo
```javascript
const visitados = new Set([1, 2, 2, 3]);
console.log(visitados.size); // 3

const cache = new Map();
cache.set("u:1", { nome: "Ana" });
```

## Boas praticas
- Use Set para deduplicacao rapida
- Use Map para lookup por chave dinamica
- Evite converter sem necessidade entre estruturas

## Fluxo Mental
Escolha a colecao pela operacao dominante: unicidade, busca por chave, ordem de insercao e custo de acesso.
