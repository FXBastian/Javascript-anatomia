# Fundamentos de JavaScript - Visao Avancada

## Funcionamento real do JavaScript
Primitivos (string, number, boolean, null, undefined, bigint, symbol) sao copiados por valor. Objetos sao acessados por referencia. Essa diferenca explica bugs classicos de mutacao compartilhada.

```javascript
const a = { pontos: 10 };
const b = a;      // b referencia o mesmo objeto
b.pontos += 5;
console.log(a.pontos); // 15
```

## Coercao: quando ajuda e quando atrapalha
A engine tenta converter tipos para completar a operacao. Isso pode ser util ou perigoso.

```javascript
console.log("5" * 2);   // 10 (string vira number)
console.log("5" + 2);   // "52" (number vira string)
console.log(Boolean("")); // false
```

## Pegadinhas comuns
- `NaN !== NaN`; para testar use `Number.isNaN(...)`
- `typeof null` retorna `"object"` (legado historico)
- `==` aplica regras de coercao que podem esconder erro

## Comparacoes importantes
- `===` compara tipo e valor
- `Object.is` trata casos especiais como `NaN` e `-0`
- Referencias de objeto so sao iguais se apontarem para o mesmo endereco logico

## Modelo mental
Pense em duas etapas: 1) representar dados corretamente, 2) escolher operacoes com regras previsiveis. Se a representacao estiver errada, todo o resto do codigo parece "misteriosamente" quebrado.
