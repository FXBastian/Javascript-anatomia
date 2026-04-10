# Modulos - Resumo

## Visao geral
Modulos organizam codigo em arquivos com fronteiras claras de importacao e exportacao.

## Conceitos principais
- `export` nomeado e default
- `import` parcial ou total
- Escopo de modulo evita poluicao global
- Reuso e manutencao ficam mais simples

## Exemplo
```javascript
// math.js
export const soma = (a, b) => a + b;

// app.js
import { soma } from "./math.js";
console.log(soma(2, 3));
```

## Boas praticas
- Prefira export nomeado para APIs explicitas
- Evite modulos gigantes
- Mantenha dependencias em uma direcao clara

## Fluxo Mental
Cada modulo deve ter responsabilidade clara e contrato de saida. O sistema cresce melhor quando as dependencias sao previsiveis.
