# Eventos

## 1. addEventListener

```javascript
const btn = document.querySelector("#enviar");

// Sintaxe: elemento.addEventListener(tipo, callback, opcoes?)
btn.addEventListener("click", function (event) {
  console.log("Clicou!", event.target);
});

// Arrow function
btn.addEventListener("click", (e) => {
  console.log(e.type); // "click"
});

// Remover listener (precisa da mesma referência)
function handleClick(e) {
  console.log("clicou");
}
btn.addEventListener("click", handleClick);
btn.removeEventListener("click", handleClick);
```

---

## 2. O Objeto Event

```javascript
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // impede comportamento padrão (submit, link, etc.)

  console.log(e.type);          // "submit"
  console.log(e.target);        // elemento que disparou o evento
  console.log(e.currentTarget); // elemento onde o listener foi registrado
  console.log(e.timeStamp);     // quando ocorreu
});

document.addEventListener("keydown", (e) => {
  console.log(e.key);     // "Enter", "a", "Escape"
  console.log(e.code);    // "KeyA", "Enter"
  console.log(e.ctrlKey); // true se Ctrl estava pressionado
});

document.addEventListener("mousemove", (e) => {
  console.log(e.clientX, e.clientY); // posição no viewport
  console.log(e.pageX, e.pageY);     // posição na página
});
```

---

## 3. Bubbling e Capturing

Eventos propagam em 3 fases: **Capturing** (descendo) → **Target** → **Bubbling** (subindo).

```javascript
// Por padrão, listeners executam na fase de BUBBLING
document.querySelector(".pai").addEventListener("click", () => {
  console.log("pai clicado");
});

document.querySelector(".filho").addEventListener("click", () => {
  console.log("filho clicado");
});
// Clicando no filho: "filho clicado" → "pai clicado" (bubbling)

// Capturing: { capture: true } ou terceiro argumento true
document.querySelector(".pai").addEventListener(
  "click",
  () => console.log("pai (capturing)"),
  { capture: true }
);
// Agora: "pai (capturing)" → "filho clicado" → "pai clicado"

// Parar propagação
document.querySelector(".filho").addEventListener("click", (e) => {
  e.stopPropagation(); // não sobe mais
});
```

---

## 4. Event Delegation (Delegação)

Em vez de um listener por item, coloque UM listener no contêiner:

```javascript
// ❌ Um listener por botão (ineficiente para muitos elementos)
document.querySelectorAll(".btn-delete").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.target.closest("li").remove();
  });
});

// ✅ Delegação: um listener no pai
document.querySelector("#lista").addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".btn-delete");
  if (!deleteBtn) return; // clicou fora de um botão

  const item = deleteBtn.closest("li");
  item.remove();
});
```

### Vantagens da delegação

| Aspecto        | Listener por elemento | Delegação            |
|:--------------:|:---------------------:|:--------------------:|
| Memória        | N listeners           | 1 listener           |
| Itens dinâmicos| Precisa adicionar novo| Funciona automaticamente |
| Performance    | Lenta com muitos itens| Eficiente            |

---

## 5. Eventos Comuns

| Categoria  | Eventos                          |
|:----------:|:--------------------------------:|
| Mouse      | `click`, `dblclick`, `contextmenu`, `mouseenter`, `mouseleave` |
| Teclado    | `keydown`, `keyup`, `keypress` (deprecated)                   |
| Formulário | `submit`, `input`, `change`, `focus`, `blur`                  |
| Janela     | `load`, `DOMContentLoaded`, `resize`, `scroll`                |
| Touch      | `touchstart`, `touchmove`, `touchend`                         |

```javascript
// DOMContentLoaded vs load
document.addEventListener("DOMContentLoaded", () => {
  // HTML parseado, DOM pronto (imagens podem não ter carregado)
});

window.addEventListener("load", () => {
  // Tudo carregado (imagens, CSS, iframes)
});
```

---

## 6. Opções do addEventListener

```javascript
btn.addEventListener("click", handler, {
  once: true,    // executa UMA vez e remove automaticamente
  passive: true, // indica que NÃO chamará preventDefault (perf. scroll)
  capture: true, // executa na fase de capturing
  signal: controller.signal, // permite cancelar com AbortController
});

// AbortController para remover listener
const controller = new AbortController();
btn.addEventListener("click", handler, { signal: controller.signal });
controller.abort(); // remove o listener
```

---

> **Próximo arquivo:** [manipulacao.md](manipulacao.md)
