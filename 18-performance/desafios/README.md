# Desafios — Performance e Memoria

## Desafio 1: Identificar Memory Leaks

Encontre os memory leaks em cada exemplo e corrija:

```javascript
// Leak 1: Event listeners nao removidos
function setupComponent() {
  const handler = () => console.log("clicou");
  document.addEventListener("click", handler);
  // Componente e destruido mas handler continua...
}

// Leak 2: Closures segurando referencias grandes
function processarDados() {
  const dadosGrandes = new Array(1000000).fill("x");
  return function() {
    return dadosGrandes.length; // closure mantem dadosGrandes vivo
  };
}

// Leak 3: Timer esquecido
function iniciar() {
  setInterval(() => {
    const el = document.getElementById("output");
    if (el) el.textContent = Date.now();
    // E se o elemento for removido do DOM?
  }, 1000);
}
```

---

## Desafio 2: Otimizar Manipulacao de DOM

Reescreva para melhor performance:

```javascript
// LENTO: causa reflow a cada iteracao
function renderizarLista(items) {
  const container = document.getElementById("lista");
  items.forEach(item => {
    const div = document.createElement("div");
    div.style.color = "blue";
    div.style.fontSize = "14px";
    div.style.marginBottom = "8px";
    div.textContent = item;
    container.appendChild(div); // reflow!
  });
}

// Otimize usando: DocumentFragment, classList, e batch de estilos
```

---

## Desafio 3: Valor vs Referencia — Implicacoes de Memoria

```javascript
// Quanto de memoria cada abordagem usa?
const a = "texto repetido ".repeat(10000);
const b = a;           // Quanto memoria extra?
const c = a.slice();   // E agora?
const d = [...a].join(""); // E agora?

// Como verificar se duas variaveis apontam para o mesmo lugar na memoria?
```

---

## Desafio 4: Web Worker para CPU Intensivo

Mova um calculo pesado para um Web Worker:

```javascript
// Main thread (travando UI):
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Mova para Web Worker usando Blob URL (sem arquivo separado)
function fibonacciWorker(n) {
  // Implemente aqui
}
```

---

## Desafio 5: requestIdleCallback

Use requestIdleCallback para processar tarefas em lote sem travar a UI:

```javascript
function processarEmLotes(tarefas, callback) {
  // Processar tarefas nos momentos ociosos do browser
  // Respeitar o deadline de cada frame
}
```
