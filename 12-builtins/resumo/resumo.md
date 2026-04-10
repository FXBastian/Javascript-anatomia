# Built-ins (Date, Math, Number, String, JSON) - Resumo

## Visao geral
Built-ins sao objetos nativos da linguagem para tarefas comuns de data, numero, texto e serializacao.

## Conceitos principais
- `Math`: operacoes matematicas
- `Number`: validacao e formatacao numerica
- `String`: manipulacao de texto
- `Date`: datas e tempo
- `JSON`: serializar e desserializar

## Exemplo
```javascript
const preco = 19.9;
console.log(preco.toFixed(2));
console.log(JSON.stringify({ preco }));
```

## Boas praticas
- Sempre valide entrada antes de converter
- Cuidado com timezone em Date
- Trate erro de `JSON.parse` com try/catch

## Fluxo Mental
Built-ins sao ferramentas basicas: voce escolhe a API nativa certa para transformar dados com menos dependencia externa e maior previsibilidade.
