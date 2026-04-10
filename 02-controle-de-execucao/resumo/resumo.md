# Controle de Execucao - Resumo

## Visao geral
Controle de execucao define para onde o programa vai: continuar, desviar, repetir ou encerrar um bloco.

## Conceitos principais
- `if`, `else if`, `else` para decisoes
- `switch` para multiplos caminhos por valor
- `for`, `while`, `do...while` para repeticao
- `break` e `continue` para ajuste fino do fluxo

## Exemplo
```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  console.log(i);
}
```

## Boas praticas
- Mantenha condicoes pequenas e legiveis
- Evite aninhamento excessivo; use retorno antecipado
- Escolha o loop pelo objetivo, nao por habito

## Fluxo Mental
Toda execucao segue um roteiro: avaliar condicao, escolher caminho e repetir se necessario. Controle de execucao e a logica de navegacao entre blocos de codigo.
