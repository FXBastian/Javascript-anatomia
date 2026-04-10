# DOM - Visao Avancada

## Funcionamento real do JavaScript
Mudancas no DOM podem disparar recalculo de layout (reflow) e redesenho (repaint). Muitas alteracoes pequenas e intercaladas com leitura de layout degradam performance.

```javascript
const lista = document.querySelector("ul");
const frag = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  frag.appendChild(li);
}
lista.appendChild(frag); // um append grande, menos custo
```

## Comparacoes importantes
Em vez de adicionar listener em cada item, adicione no pai e identifique o alvo via bubbling.

## Pegadinhas comuns
- `innerHTML` com entrada externa abre risco de XSS
- Ler `offsetHeight` logo apos escrever estilo pode causar layout thrashing
- NodeList nem sempre e array completo

## Modelo mental
DOM e interface com custo de renderizacao. Atualize em lotes e minimize alternancia leitura/escrita para manter fluidez.
