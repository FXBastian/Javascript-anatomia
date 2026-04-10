# Desafios — Node.js

## Desafio 1: Grep em JavaScript

Crie uma versao simplificada do `grep` que busca texto em arquivos:

```javascript
// Uso: node grep.js "termo" ./pasta
// Deve buscar recursivamente em todos os arquivos
// Mostrar: arquivo:linha:conteudo
```

---

## Desafio 2: CSV Parser

```javascript
async function parseCSV(caminho) {
  // Ler arquivo CSV
  // Retornar array de objetos usando a primeira linha como headers
  // Tratar campos com virgulas entre aspas
}
```

---

## Desafio 3: Servidor com Rate Limiting

Adicione rate limiting ao servidor HTTP (max N requests por IP por minuto).

---

## Desafio 4: Streams Pipeline

Use streams para processar um arquivo de log de 1GB sem estourar memoria:
- Ler linha por linha
- Filtrar linhas com "ERROR"
- Escrever resultado em novo arquivo

---

## Desafio 5: process.env Seguro

Crie um loader de variaveis de ambiente que:
- Le de `.env` file
- Valida campos obrigatorios
- Aplica tipos (number, boolean)
- Lanca erro claro se algo falta
