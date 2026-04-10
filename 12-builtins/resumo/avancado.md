# Built-ins - Visao Avancada

## Funcionamento real do JavaScript
Numeros em JS usam IEEE 754 (double). Nem toda conta decimal e representavel exatamente.

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004
```

## Date e timezone
`Date` guarda timestamp UTC, mas muitos metodos exibem em timezone local. Bugs surgem ao misturar parse local e comparacao em UTC.

## JSON limites
JSON nao preserva `undefined`, `BigInt`, `Map`, `Set`, funcoes e referencias circulares.

## Pegadinhas comuns
- `parseInt("08")` sem base pode gerar confusao historica; prefira base explicita
- `new Date("2026-03-23")` pode variar por ambiente
- `toFixed` retorna string, nao number

## Comparacoes importantes
- `Number.isNaN` e mais seguro que `isNaN`
- `Math.trunc` remove fracao sem arredondar
- `Intl` APIs podem ser preferiveis para formatacao local

## Modelo mental
Built-ins resolvem 80% dos casos, mas exigem entendimento de representacao interna (tempo, precisao, serializacao). Sem esse modelo, os erros parecem aleatorios.
