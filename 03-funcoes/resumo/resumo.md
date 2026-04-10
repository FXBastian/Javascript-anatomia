# Funcoes - Resumo

## Visao geral
Funcao encapsula comportamento reutilizavel. Ela recebe entrada (parametros), processa e opcionalmente devolve saida (retorno).

## Conceitos principais
- Declaracao e expressao de funcao
- Parametros padrao
- Retorno explicito com `return`
- Arrow functions para sintaxe curta

## Exemplo
```javascript
function saudacao(nome = "visitante") {
  return `Ola, ${nome}!`;
}

const dobrar = n => n * 2;
```

## Boas praticas
- Uma funcao, uma responsabilidade
- Nomeie com verbo que indique acao
- Evite efeitos colaterais desnecessarios

## Fluxo Mental
Pense em funcoes como contratos: entrada esperada, transformacao definida e saida previsivel. Quanto mais claro o contrato, mais facil compor funcoes maiores.
