# Web Storage

## 1. localStorage

Armazena dados **persistentes** (sobrevive ao fechar o navegador).

```javascript
// Salvar
localStorage.setItem("tema", "dark");

// Ler
const tema = localStorage.getItem("tema"); // "dark"

// Remover um item
localStorage.removeItem("tema");

// Limpar tudo
localStorage.clear();

// Quantidade de itens
console.log(localStorage.length);

// Acessar por índice
const chave = localStorage.key(0);
```

---

## 2. sessionStorage

Mesma API, mas os dados duram **apenas enquanto a aba estiver aberta**.

```javascript
sessionStorage.setItem("filtro", "ativos");
const filtro = sessionStorage.getItem("filtro");
sessionStorage.removeItem("filtro");
```

### Quando usar cada um

| Recurso          | localStorage       | sessionStorage       |
|:----------------:|:------------------:|:--------------------:|
| Duração          | Permanente         | Enquanto a aba abrir |
| Escopo           | Mesma origem       | Mesma aba + origem   |
| Tamanho          | ~5-10 MB           | ~5-10 MB             |
| Uso típico       | Preferências, tema | Dados temporários    |

---

## 3. Armazenando Objetos e Arrays

Storage só aceita **strings**. Use JSON para objetos:

```javascript
const usuario = { nome: "Ana", idade: 25 };

// Salvar
localStorage.setItem("usuario", JSON.stringify(usuario));

// Recuperar
const salvo = JSON.parse(localStorage.getItem("usuario"));
console.log(salvo.nome); // "Ana"

// ⚠️ getItem retorna null se não existir
const dados = localStorage.getItem("inexistente");
console.log(dados); // null
console.log(JSON.parse(dados)); // null (ok, JSON.parse(null) = null)
```

---

## 4. Padrão de Helper

```javascript
const storage = {
  get(chave) {
    const valor = localStorage.getItem(chave);
    if (valor === null) return null;
    try {
      return JSON.parse(valor);
    } catch {
      return valor; // retorna string se não for JSON
    }
  },
  set(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
  },
  remove(chave) {
    localStorage.removeItem(chave);
  },
};

// Uso
storage.set("config", { tema: "dark", idioma: "pt-BR" });
const config = storage.get("config"); // { tema: "dark", idioma: "pt-BR" }
```

---

## 5. Evento storage (sincronizar abas)

```javascript
// Dispara quando OUTRA aba da mesma origem altera o localStorage
window.addEventListener("storage", (e) => {
  console.log(e.key);       // chave alterada
  console.log(e.oldValue);  // valor anterior
  console.log(e.newValue);  // novo valor
  console.log(e.url);       // URL da aba que fez a alteração
});
```

---

## Limitações e Cuidados

- **Somente strings** — sempre serialize com JSON
- **Síncrono** — bloqueia a thread principal (evite dados grandes)
- **Sem expiração** — implemente manualmente se necessário
- **Sem segurança** — qualquer JS na página acessa (não guarde tokens sensíveis)
- **Limite ~5-10 MB** — varia por navegador

---

> **Próximo arquivo:** [timers.md](timers.md)
