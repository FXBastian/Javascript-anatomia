# Web APIs - Visao Avancada

## Funcionamento real do JavaScript
`fetch`, `setTimeout` e DOM nao sao parte da especificacao da linguagem; pertencem ao runtime do navegador. O event loop integra callbacks dessas APIs com a call stack.

## Fetch com robustez
```javascript
async function requestJSON(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

## Storage com criterio
Storage e sincrono e bloqueia a thread principal durante acesso. Use para estado pequeno e nao sensivel.

## Pegadinhas comuns
- `setInterval` pode acumular atrasos
- Falta de timeout em fetch pode deixar UX presa
- Dados no localStorage sao legiveis por scripts da pagina

## Comparacoes importantes
- localStorage: persiste entre sessoes
- sessionStorage: dura ate fechar aba
- IndexedDB: melhor para volume e consultas mais ricas

## Modelo mental
Web APIs ampliam capacidade do JS, mas cada API traz custo e risco especifico. Escolha pelo contrato de tempo, tamanho e seguranca dos dados.
