# Estruturas de Dados - Visao Avancada

## Funcionamento real do JavaScript
Arrays em JS sao objetos especiais com indice numerico e propriedade `length`. Nem todo "array com buraco" se comporta como lista densa.

```javascript
const arr = [1, 2];
arr[5] = 9;
console.log(arr.length); // 6
```

## Objetos: mapa de propriedades
Objetos comuns herdam de `Object.prototype`. Isso importa em verificacoes de chave e colisao com nomes herdados.

```javascript
const obj = Object.create(null); // sem prototipo herdado
obj.chave = "valor";
```

## Pegadinhas comuns
- `for...in` percorre chaves enumeraveis, inclusive herdadas
- Copia rasa (`{ ...obj }`) nao clona niveis internos
- `delete` em arrays cria lacunas; nao reindexa

## Comparacoes importantes
- Array: ordem e indice
- Objeto: identidade por chave
- Para busca frequente por chave dinamica, Map pode ser melhor

## Modelo mental
Escolha estrutura pela operacao dominante: acesso por indice, por chave, por ordem ou por transformacao. Estrutura errada gera codigo cheio de remendos.
