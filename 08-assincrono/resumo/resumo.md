# Assincrono - Resumo

## Visao geral
Codigo assincrono permite iniciar uma tarefa e continuar executando outras partes enquanto aguarda resultado.

## Conceitos principais
- Callback: funcao executada no futuro
- Promise: representa sucesso ou falha futura
- async/await: sintaxe linear sobre Promises
- Event loop coordena ordem de execucao

## Exemplo
```javascript
async function carregarUsuario() {
  const res = await fetch("/api/usuario");
  return res.json();
}
```

## Boas praticas
- Sempre trate erros assincronos
- Evite callback hell com composicao de Promises
- Use `Promise.all` para concorrencia independente

## Fluxo Mental
No assincrono, voce descreve dependencias de tempo: o que pode rodar agora e o que precisa esperar. O event loop costura essas etapas.
