# Funcoes - Visao Avancada

## Funcionamento real do JavaScript
Em JavaScript, funcoes podem ser passadas como argumento, retornadas de outras funcoes e armazenadas em estruturas.

```javascript
function criarMultiplicador(fator) {
  return function (valor) {
    return valor * fator; // closure sobre "fator"
  };
}

const triplicar = criarMultiplicador(3);
console.log(triplicar(4)); // 12
```

## Closure como modelo mental
Closure e a capacidade de uma funcao lembrar do ambiente onde foi criada, mesmo executando depois. Isso sustenta factories, currying e encapsulamento sem classe.

## Pegadinhas comuns
- Arrow function nao tem `arguments`
- Arrow function nao cria proprio `this`
- Retorno implicito em arrow com objeto exige parenteses: `() => ({ ok: true })`

## Comparacoes importantes
- `function` tradicional: melhor quando precisa de `this` dinamico
- arrow: melhor para callbacks e funcoes pequenas

## Modelo mental
Projete funcoes pequenas e composiveis. Composicao reduz acoplamento e facilita testes.
