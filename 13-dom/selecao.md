# Seleção de Elementos

## 1. Métodos de Seleção

```javascript
// Por ID — retorna UM elemento ou null
const header = document.getElementById("header");

// Por seletor CSS — retorna o PRIMEIRO que combina
const btn = document.querySelector(".btn-primary");
const input = document.querySelector("input[type='email']");

// Por seletor CSS — retorna TODOS (NodeList estática)
const items = document.querySelectorAll(".item");
const links = document.querySelectorAll("nav a");

// Coleção ao vivo (HTMLCollection — atualiza automaticamente)
const divs = document.getElementsByClassName("card");
const paragrafos = document.getElementsByTagName("p");
```

### NodeList vs HTMLCollection

```javascript
// querySelectorAll → NodeList (estática — snapshot do momento)
const nodeList = document.querySelectorAll("p");
nodeList.forEach(p => console.log(p)); // ✅ forEach funciona

// getElementsBy... → HTMLCollection (viva — reflete mudanças)
const htmlColl = document.getElementsByTagName("p");
// htmlColl.forEach(...); // ❌ não tem forEach!
[...htmlColl].forEach(p => console.log(p)); // ✅ converter com spread
```

---

## 2. Traversal (Navegação pela Árvore)

```javascript
const el = document.querySelector(".card");

// Pai
el.parentElement;
el.closest(".container"); // sobe até encontrar o seletor

// Filhos
el.children;           // HTMLCollection de filhos (elementos)
el.firstElementChild;
el.lastElementChild;
el.childElementCount;

// Irmãos
el.nextElementSibling;
el.previousElementSibling;
```

---

## 3. Verificação

```javascript
const el = document.querySelector(".btn");

el.matches(".btn-primary"); // true se combina com o seletor
el.contains(outroEl);       // true se outroEl está dentro de el
```

---

## Boas Práticas

```javascript
// ✅ Prefira querySelector/querySelectorAll (mais flexíveis)
// ✅ Cache seleções repetidas
const container = document.querySelector("#app");
const botoes = container.querySelectorAll(".btn"); // busca dentro de container

// ❌ Evite buscar dentro de loops sem necessidade
// ❌ Evite getElementById para IDs que podem mudar
```

---

> **Próximo arquivo:** [eventos.md](eventos.md)
