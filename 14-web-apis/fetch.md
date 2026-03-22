# Fetch API

## 1. GET — Buscar Dados

```javascript
// Sintaxe básica
const response = await fetch("https://api.exemplo.com/users");

// fetch retorna uma Response — precisamos extrair o corpo
const data = await response.json(); // parse JSON
console.log(data);

// Verificar se deu certo (fetch NÃO rejeita em 404/500!)
if (!response.ok) {
  throw new Error(`HTTP ${response.status}: ${response.statusText}`);
}
```

### Padrão Completo com Tratamento de Erro

```javascript
async function buscarUsuarios() {
  try {
    const response = await fetch("https://api.exemplo.com/users");

    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }

    const usuarios = await response.json();
    return usuarios;
  } catch (error) {
    // Erros de rede (offline, DNS) + erros que lançamos
    console.error("Falha ao buscar:", error.message);
    return [];
  }
}
```

---

## 2. POST — Enviar Dados

```javascript
async function criarUsuario(dados) {
  const response = await fetch("https://api.exemplo.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    throw new Error(`Erro ${response.status}`);
  }

  return await response.json();
}

await criarUsuario({ nome: "Ana", email: "ana@email.com" });
```

---

## 3. Outros Métodos HTTP

```javascript
// PUT — substituir recurso
await fetch("/api/users/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nome: "Ana Maria", email: "ana@email.com" }),
});

// PATCH — atualização parcial
await fetch("/api/users/1", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "novo@email.com" }),
});

// DELETE
await fetch("/api/users/1", { method: "DELETE" });
```

---

## 4. Headers e Autenticação

```javascript
const headers = new Headers();
headers.append("Authorization", "Bearer token_aqui");
headers.append("Accept", "application/json");

const response = await fetch("/api/protegido", { headers });

// Ler headers da resposta
console.log(response.headers.get("Content-Type"));
```

---

## 5. AbortController — Cancelar Requisições

```javascript
const controller = new AbortController();

// Timeout de 5 segundos
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch("/api/dados", {
    signal: controller.signal,
  });
  clearTimeout(timeoutId);
  const data = await response.json();
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Requisição cancelada");
  } else {
    throw error;
  }
}
```

---

## 6. Tipos de Resposta

```javascript
const res = await fetch(url);

await res.json();        // JSON → objeto
await res.text();        // texto puro
await res.blob();        // arquivo binário (imagem, PDF)
await res.arrayBuffer(); // dados binários brutos
await res.formData();    // FormData
```

---

## 7. Enviar FormData (upload de arquivos)

```javascript
const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  // NÃO defina Content-Type — o browser gera o boundary automaticamente

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
});
```

---

## Armadilhas Comuns

| Armadilha                        | Solução                              |
|:--------------------------------:|:------------------------------------:|
| fetch não rejeita em 404/500     | Checar `response.ok`                 |
| Esquecer `await response.json()` | Sempre awaitar a extração do corpo   |
| CORS bloqueado                   | Configurar headers no servidor       |
| Body lido duas vezes             | O body é stream — só pode ler 1x     |

---

> **Próximo arquivo:** [storage.md](storage.md)
