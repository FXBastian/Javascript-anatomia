# Desafios — Web APIs

## Desafio 1: Fetch com AbortController

Implemente um fetch cancelavel com timeout:

```javascript
async function fetchComTimeout(url, tempoMs) {
  // Use AbortController para cancelar o fetch apos tempoMs
  // Implemente aqui
}
```

---

## Desafio 2: Sincronizar Abas com Storage

Use o evento `storage` para comunicar entre abas do navegador:

```javascript
// Aba 1: envia mensagem
function enviar(canal, mensagem) {
  localStorage.setItem(canal, JSON.stringify({ dados: mensagem, timestamp: Date.now() }));
}

// Aba 2: escuta mensagens
function escutar(canal, callback) {
  window.addEventListener("storage", (e) => {
    if (e.key === canal && e.newValue) {
      callback(JSON.parse(e.newValue).dados);
    }
  });
}
```

---

## Desafio 3: requestAnimationFrame

Crie uma animacao suave de contagem de 0 a 1000 usando requestAnimationFrame ao inves de setInterval:

```javascript
function animarContagem(elemento, de, ate, duracaoMs) {
  // Usar requestAnimationFrame para atualizar o numero suavemente
}
```

---

## Desafio 4: Service Worker Basico

Crie um service worker que:
1. Cacheia respostas de fetch
2. Serve do cache quando offline
3. Atualiza o cache em background

---

## Desafio 5: Intersection Observer

```javascript
function lazyLoad(seletor) {
  // Use IntersectionObserver para carregar imagens apenas quando visiveis
  // Trocar data-src por src quando o elemento entrar na viewport
}
```
