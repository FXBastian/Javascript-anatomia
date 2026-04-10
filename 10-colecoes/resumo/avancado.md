# Colecoes (Map e Set) - Visao Avancada

## Funcionamento real do JavaScript
`Map` foi desenhado para colecao. `Object` foi desenhado para modelar entidade. Essa diferenca afeta API, semantica e performance em cenarios de dados dinamicos.

```javascript
const m = new Map();
m.set({ id: 1 }, "valor"); // chave por identidade de objeto
```

## Set e comparacao de igualdade
Set usa SameValueZero:
- `NaN` e considerado igual a `NaN`
- `0` e `-0` sao equivalentes
- Objetos diferentes nunca sao iguais por conteudo

## Pegadinhas comuns
- `JSON.stringify` ignora Map/Set por padrao
- `set.add(obj)` nao deduplica objetos estruturalmente iguais
- Chave objeto em Map depende da mesma referencia

## Comparacoes importantes
- Array para sequencia
- Set para unicidade
- Object para schema fixo
- Map para dicionario dinamico

## Modelo mental
Colecoes modernas melhoram intencao do codigo. Quando a estrutura comunica a regra (ex.: "nao pode repetir"), o sistema fica menos propenso a erro.
