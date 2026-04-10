# ES6+ - Visao Avancada

## Funcionamento real do JavaScript
Destructuring pode ter custo cognitivo quando exagerado. O ganho aparece quando ele explicita contrato de dados logo na entrada da funcao.

```javascript
function formatarUsuario({ nome, perfil: { nivel = "junior" } = {} }) {
  return `${nome} - ${nivel}`;
}
```

## Spread/rest: copia rasa
Spread em objetos e arrays nao clona niveis internos.

```javascript
const original = { meta: { ativo: true } };
const copia = { ...original };
copia.meta.ativo = false;
console.log(original.meta.ativo); // false
```

## Comparacoes importantes
`?.` evita quebra de acesso e `??` preserva valores validos como `0` e string vazia.

## Pegadinhas comuns
- `||` pode substituir `0` por default sem querer
- Parametro default roda apenas para `undefined`, nao para `null`
- Destructuring de `undefined` quebra sem fallback

## Modelo mental
Recursos ES6+ devem reduzir ambiguidade. Se uma sintaxe deixa leitura opaca, simplifique mesmo que aumente algumas linhas.
