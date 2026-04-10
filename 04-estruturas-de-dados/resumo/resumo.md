# Estruturas de Dados - Resumo

## Visao geral
No modulo, o foco principal e arrays e objetos, que sao as estruturas mais usadas no JavaScript.

## Conceitos principais
- Arrays organizam dados por posicao
- Objetos organizam dados por chave
- Acesso, insercao, remocao e iteracao
- Diferenca entre mutar e criar copia

## Exemplo
```javascript
const usuario = { nome: "Lia", ativo: true };
const tags = ["js", "web", "api"];

console.log(usuario.nome);
console.log(tags[0]);
```

## Boas praticas
- Use objeto para entidade, array para lista
- Evite mutacao quando quer previsibilidade
- Prefira nomes de chaves consistentes

## Fluxo Mental
Primeiro escolha a estrutura certa (lista ou registro), depois defina como os dados vao evoluir (mutacao ou copia). Essa decisao impacta legibilidade, bugs e performance.
