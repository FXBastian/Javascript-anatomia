# Web APIs - Resumo

## Visao geral
Web APIs sao funcionalidades fornecidas pelo navegador, acessiveis via JavaScript, como fetch, storage, timers e eventos.

## Conceitos principais
- `fetch` para requisicoes HTTP
- `localStorage`/`sessionStorage` para persistencia simples
- `setTimeout`/`setInterval` para agendamento
- APIs de navegador funcionam fora do nucleo da linguagem

## Exemplo
```javascript
async function buscarPosts() {
  const res = await fetch("/api/posts");
  return res.json();
}
```

## Boas praticas
- Verifique `response.ok` em requisicoes
- Use storage para dados pequenos
- Limpe timers quando nao forem mais necessarios

## Fluxo Mental
Pense nas Web APIs como adaptadores entre codigo JS e recursos do ambiente do navegador: rede, tempo, armazenamento e eventos.
