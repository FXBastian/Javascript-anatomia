# Contexto de Execucao - Resumo

## Visao geral
Contexto de execucao e o "ambiente" criado quando codigo roda: variaveis locais, acesso externo e valor de `this`.

## Conceitos principais
- Contexto global
- Contexto de funcao
- Escopo lexico
- Hoisting de declaracoes
- Call stack organizando chamadas

## Exemplo
```javascript
const nome = "global";

function mostrar() {
  const nome = "local";
  console.log(nome);
}

mostrar(); // local
```

## Boas praticas
- Evite depender de variavel global
- Prefira escopos pequenos
- Entenda onde cada identificador e resolvido

## Fluxo Mental
A engine cria contexto, registra declaracoes, depois executa linha a linha. Quando uma funcao chama outra, nova camada entra na stack. Ao retornar, a camada sai.
