# Projetos Praticos — DOM

## Projeto 1: Componente de Lista Reativa

```javascript
function criarListaReativa(container) {
  let items = [];

  function renderizar() {
    container.innerHTML = "";

    if (items.length === 0) {
      container.innerHTML = '<p class="vazio">Nenhum item</p>';
      return;
    }

    const ul = document.createElement("ul");
    items.forEach((item, i) => {
      const li = document.createElement("li");
      li.textContent = item;

      const btnRemover = document.createElement("button");
      btnRemover.textContent = "X";
      btnRemover.addEventListener("click", () => remover(i));

      li.appendChild(btnRemover);
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  function adicionar(item) {
    items.push(item);
    renderizar();
  }

  function remover(indice) {
    items.splice(indice, 1);
    renderizar();
  }

  function limpar() {
    items = [];
    renderizar();
  }

  renderizar();
  return { adicionar, remover, limpar, get items() { return [...items]; } };
}

// Uso:
// const lista = criarListaReativa(document.getElementById("app"));
// lista.adicionar("Estudar JS");
// lista.adicionar("Praticar DOM");
```

---

## Projeto 2: Delegacao de Eventos

```javascript
function delegarEvento(container, seletor, evento, handler) {
  container.addEventListener(evento, function (e) {
    const alvo = e.target.closest(seletor);
    if (alvo && container.contains(alvo)) {
      handler.call(alvo, e);
    }
  });
}

// Funciona mesmo para elementos adicionados depois:
// delegarEvento(document.getElementById("lista"), "li", "click", function(e) {
//   console.log("Clicou em:", this.textContent);
// });
```

---

## Projeto 3: Mini Framework de Componentes

```javascript
function criarComponente({ template, estado, metodos, montarEm }) {
  let _estado = { ...estado };

  function renderizar() {
    const container = document.querySelector(montarEm);
    if (!container) return;

    let html = template;
    for (const [chave, valor] of Object.entries(_estado)) {
      html = html.replace(new RegExp(`{{${chave}}}`, "g"), valor);
    }
    container.innerHTML = html;

    // Religar eventos
    container.querySelectorAll("[data-evento]").forEach(el => {
      const [evento, metodo] = el.dataset.evento.split(":");
      if (api[metodo]) {
        el.addEventListener(evento, api[metodo]);
      }
    });
  }

  const api = {
    estado(novoEstado) {
      _estado = { ..._estado, ...novoEstado };
      renderizar();
    },
    ...metodos
  };

  renderizar();
  return api;
}

// Uso:
// const contador = criarComponente({
//   montarEm: "#app",
//   estado: { contagem: 0 },
//   template: `
//     <h1>Contagem: {{contagem}}</h1>
//     <button data-evento="click:incrementar">+</button>
//     <button data-evento="click:decrementar">-</button>
//   `,
//   metodos: {
//     incrementar() { /* ... */ },
//     decrementar() { /* ... */ }
//   }
// });
```

**Conexao**: Eventos (modulo 13), Web APIs (modulo 14), Performance (modulo 18).
