# Engenharia de Software - Visao Avancada

## Funcionamento real
DevTools Performance usa uma tecnica chamada sampling: a cada N milissegundos, captura a stack. Funcoes que aparecem em mais amostras sao as mais custosas. Flame charts visualizam isso como barras empilhadas.

## Source Maps
Codigo minificado/transpilado e ilegivel. Source maps (.map) conectam codigo de producao ao codigo fonte original, permitindo debugging preciso.

## Pegadinhas comuns
- Performance tab no DevTools adiciona overhead (medir sem DevTools tambem)
- Memory snapshots pausam a execucao (evitar em producao)
- `console.log` em loops apertados pode ser mais lento que o codigo medido
- Refatoracao prematura: nao abstrair o que voce nao entende ainda

## Tecnicas avancadas
- **Bisect debugging**: usar git bisect para encontrar o commit que introduziu o bug
- **Time travel debugging**: ferramentas como ReplayIO gravam e reproduzem execucao
- **Canary releases**: deploying gradual para detectar problemas em produção

## Modelo mental
Engenharia de software e resolver problemas sistematicamente. Ferramentas ajudam, mas o processo mental e o diferencial: questionar suposicoes, medir tudo, mudar uma coisa por vez.
