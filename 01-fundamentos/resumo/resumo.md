# Fundamentos de JavaScript - Resumo

## Visao geral
JavaScript e uma linguagem dinamica, interpretada e multiparadigma. No dia a dia, voce escreve expressoes, instrucoes e blocos que a engine executa na ordem definida pelo fluxo do programa.

## Conceitos principais
- Variaveis guardam referencias para valores
- Tipos primitivos sao imutaveis
- Objetos e arrays sao estruturas mutaveis por referencia
- Operadores transformam e comparam valores
- Coercao pode converter tipos automaticamente

## Exemplo
```javascript
let nome = "Ana";
let idade = 20;
const maiorDeIdade = idade >= 18;
console.log(`${nome} pode entrar?`, maiorDeIdade);
```

## Boas praticas
- Prefira const por padrao e use let quando houver reatribuicao
- Evite comparacoes frouxas sem intencao clara
- Nomeie variaveis com semantica, nao por tipo

## Fluxo Mental
Primeiro voce define dados (variaveis e tipos), depois aplica operacoes (operadores), em seguida interpreta o resultado (booleanos) e so entao decide o proximo passo no fluxo. Fundamentos sao a camada que sustenta tudo o resto do JavaScript.
