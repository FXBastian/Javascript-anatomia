# Modulos - Visao Avancada

## Funcionamento real do JavaScript
ES Modules sao analisados antes da execucao. Isso permite tree-shaking e validacao antecipada de imports/exports.

## Live bindings
Import nao copia valor; cria ligacao viva com o export.

```javascript
// contador.js
export let total = 0;
export function inc() { total++; }

// uso.js
import { total, inc } from "./contador.js";
inc();
console.log(total); // 1
```

## Pegadinhas comuns
- Ciclos de dependencia podem gerar valores parcialmente inicializados
- Misturar CommonJS e ESM exige cuidado no ambiente
- Caminhos relativos mal definidos quebram portabilidade

## Comparacoes importantes
- ESM: padrao moderno, estatico
- CommonJS: dinamico, historico do Node

## Modelo mental
Modulos sao grafo de dependencias. Quanto mais aciclico e coeso o grafo, mais facil escalar build, testes e manutencao.
