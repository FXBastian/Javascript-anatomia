# DOM - Resumo

## Visao geral
DOM e a representacao em arvore do documento HTML que o JavaScript pode ler e alterar.

## Conceitos principais
- Selecionar elementos
- Ler e alterar conteudo
- Criar/remover nos
- Trabalhar com eventos do usuario

## Exemplo
```javascript
const titulo = document.querySelector("h1");
titulo.textContent = "Novo titulo";
```

## Boas praticas
- Cache seletores usados com frequencia
- Evite manipular DOM em excesso dentro de loops
- Separe logica de dados da logica de interface

## Fluxo Mental
Primeiro voce encontra o no certo, depois aplica mudanca minima necessaria e por fim observa o impacto visual na pagina.
