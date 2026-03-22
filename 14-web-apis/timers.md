# Timers

## 1. setTimeout

Executa uma função **uma vez** após o delay (em milissegundos).

```javascript
const id = setTimeout(() => {
  console.log("Executou após 2 segundos");
}, 2000);

// Cancelar antes de executar
clearTimeout(id);
```

### Delay zero

```javascript
setTimeout(() => console.log("depois"), 0);
console.log("antes");
// "antes" → "depois"
// setTimeout(fn, 0) agenda para o PRÓXIMO ciclo do event loop
```

---

## 2. setInterval

Executa repetidamente a cada N milissegundos.

```javascript
let contador = 0;

const id = setInterval(() => {
  contador++;
  console.log(`Tick ${contador}`);

  if (contador >= 5) {
    clearInterval(id); // parar após 5 execuções
  }
}, 1000);
```

### Problema de drift

`setInterval` não garante intervalo exato — o tempo de execução da callback se soma.

```javascript
// ✅ setTimeout recursivo para intervalos mais precisos
function poll() {
  fazerAlgo();
  setTimeout(poll, 1000); // agenda o próximo DEPOIS de terminar
}
poll();
```

---

## 3. requestAnimationFrame

Sincronizado com a taxa de atualização do monitor (~60fps). Ideal para **animações**.

```javascript
function animar(timestamp) {
  // timestamp = tempo em ms desde o início da página

  const elemento = document.querySelector(".box");
  const progresso = (timestamp % 2000) / 2000; // ciclo de 2s
  elemento.style.transform = `translateX(${progresso * 300}px)`;

  requestAnimationFrame(animar); // agenda o próximo frame
}

const frameId = requestAnimationFrame(animar);

// Cancelar
cancelAnimationFrame(frameId);
```

### Por que usar em vez de setInterval?

| Aspecto       | setInterval            | requestAnimationFrame     |
|:-------------:|:----------------------:|:-------------------------:|
| Sincronização | Tempo fixo             | Sincronizado com o display|
| Aba inativa   | Continua executando    | Pausa automaticamente     |
| Performance   | Pode causar jank       | Otimizado pelo browser    |
| Uso           | Polling, contadores    | Animações visuais         |

---

## 4. Patterns Comuns

### Debounce — espera parar de disparar

```javascript
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Uso: busca só após o usuário parar de digitar
const input = document.querySelector("#busca");
input.addEventListener(
  "input",
  debounce((e) => {
    console.log("Buscando:", e.target.value);
  }, 300)
);
```

### Throttle — no máximo 1x a cada N ms

```javascript
function throttle(fn, limit) {
  let esperando = false;
  return (...args) => {
    if (esperando) return;
    fn(...args);
    esperando = true;
    setTimeout(() => (esperando = false), limit);
  };
}

// Uso: scroll handler otimizado
window.addEventListener(
  "scroll",
  throttle(() => {
    console.log("Scroll:", window.scrollY);
  }, 100)
);
```

---

## Resumo

| Timer                    | Uso                            | Cancelar                  |
|:------------------------:|:------------------------------:|:-------------------------:|
| `setTimeout`             | Executar uma vez após delay    | `clearTimeout(id)`        |
| `setInterval`            | Repetir a cada N ms            | `clearInterval(id)`       |
| `requestAnimationFrame`  | Animações sincronizadas        | `cancelAnimationFrame(id)`|

---

> **Próximo módulo:** [15-modulos](../15-modulos/README.md)
