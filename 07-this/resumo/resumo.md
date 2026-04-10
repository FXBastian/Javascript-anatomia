# this - Resumo

## Visao geral
`this` representa o contexto de chamada da funcao, nao o local onde ela foi escrita (com excecao de arrow function).

## Regras principais
- Chamada como metodo: `obj.metodo()` -> `this` e `obj`
- Chamada simples: depende de strict mode (no browser pode cair no global)
- `call`, `apply`, `bind` forcam o contexto
- Arrow function herda `this` do escopo externo

## Exemplo
```javascript
const pessoa = {
  nome: "Rafa",
  falar() {
    console.log(this.nome);
  }
};

pessoa.falar(); // Rafa
```

## Boas praticas
- Evite ambiguidade de contexto
- Prefira arrow em callbacks internos de metodo
- Use bind quando passar metodo como callback solto

## Fluxo Mental
Antes de usar `this`, pergunte: "como essa funcao sera chamada?". O valor de `this` nasce da chamada, nao da declaracao.
