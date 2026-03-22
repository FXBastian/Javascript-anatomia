# Manipulação do DOM

## 1. Conteúdo

```javascript
const el = document.querySelector(".card");

// textContent — texto puro (seguro)
el.textContent = "Olá, mundo!";
console.log(el.textContent); // "Olá, mundo!"

// innerText — texto visível (respeita CSS display:none)
console.log(el.innerText);

// innerHTML — HTML como string (⚠️ cuidado com XSS)
el.innerHTML = "<strong>Negrito</strong>";
// ❌ NUNCA use innerHTML com dados do usuário sem sanitizar
// el.innerHTML = inputUsuario; // PERIGOSO — XSS
```

---

## 2. Atributos

```javascript
const img = document.querySelector("img");

img.getAttribute("src");
img.setAttribute("alt", "Logo do site");
img.removeAttribute("loading");
img.hasAttribute("data-id"); // true / false

// Atributos data-*
const card = document.querySelector("[data-id]");
card.dataset.id;     // lê data-id
card.dataset.active = "true"; // define data-active="true"
```

---

## 3. Classes com classList

```javascript
const el = document.querySelector(".menu");

el.classList.add("aberto");
el.classList.remove("fechado");
el.classList.toggle("visivel");        // adiciona ou remove
el.classList.toggle("dark", isDark);   // força com booleano
el.classList.contains("aberto");       // true / false
el.classList.replace("antigo", "novo");

// Múltiplas classes de uma vez
el.classList.add("a", "b", "c");
el.classList.remove("a", "b");
```

---

## 4. Estilos Inline

```javascript
const box = document.querySelector(".box");

// Definir estilos individuais
box.style.backgroundColor = "blue";
box.style.padding = "1rem";
box.style.display = "none";

// Definir vários estilos de uma vez
Object.assign(box.style, {
  color: "white",
  fontSize: "1.2rem",
  borderRadius: "8px",
});

// Ler estilo computado (inclui CSS externo)
const computed = getComputedStyle(box);
console.log(computed.width); // "300px"
```

---

## 5. Criar e Inserir Elementos

```javascript
// Crear elemento
const li = document.createElement("li");
li.textContent = "Novo item";
li.classList.add("item");

// Inserir
const lista = document.querySelector("ul");
lista.appendChild(li);             // no final
lista.prepend(li);                 // no início
lista.append(li, outroLi);        // múltiplos no final
lista.insertBefore(li, referencia); // antes de outro nó

// insertAdjacentHTML — inserir HTML em posição específica
lista.insertAdjacentHTML("beforeend", "<li>Item via HTML</li>");
// Posições: "beforebegin" | "afterbegin" | "beforeend" | "afterend"

// insertAdjacentElement
lista.insertAdjacentElement("afterbegin", li);
```

---

## 6. Remover e Substituir

```javascript
const el = document.querySelector(".remover");

el.remove(); // remove o próprio elemento

// Substituir
const novo = document.createElement("div");
novo.textContent = "Substituto";
el.replaceWith(novo);

// Remover todos os filhos
const container = document.querySelector("#app");
container.innerHTML = ""; // rápido mas destrói listeners internos
// Alternativa segura:
while (container.firstChild) {
  container.removeChild(container.firstChild);
}
```

---

## 7. Clonar Elementos

```javascript
const original = document.querySelector(".template");

const clone = original.cloneNode(false); // só o elemento
const cloneDeep = original.cloneNode(true); // elemento + filhos

document.querySelector("#destino").appendChild(cloneDeep);
```

---

## 8. Fragment (Performance)

```javascript
// ❌ Inserir 100 itens um por um (100 reflows)
for (let i = 0; i < 100; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  lista.appendChild(li); // reflow a cada iteração
}

// ✅ DocumentFragment — insere tudo de uma vez (1 reflow)
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
lista.appendChild(fragment); // um único reflow
```

---

## Resumo Rápido

| Operação           | Método                          |
|:------------------:|:-------------------------------:|
| Texto seguro       | `textContent`                   |
| HTML (⚠️)         | `innerHTML`                     |
| Classe             | `classList.add/remove/toggle`   |
| Estilo             | `style.prop` ou `Object.assign`|
| Criar              | `createElement` + `appendChild` |
| Remover            | `el.remove()`                   |
| Clonar             | `cloneNode(true)`               |
| Batch insert       | `DocumentFragment`              |

---

> **Próximo módulo:** [14-web-apis](../14-web-apis/README.md)
