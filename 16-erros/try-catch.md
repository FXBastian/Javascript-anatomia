# Try / Catch / Finally

## 1. Sintaxe Básica

```javascript
try {
  // código que pode falhar
  const dados = JSON.parse(textoInvalido);
} catch (error) {
  // executado se ocorrer erro no try
  console.error(error.message);
  console.error(error.name);  // "SyntaxError"
  console.error(error.stack); // stack trace completo
} finally {
  // SEMPRE executa (com ou sem erro)
  console.log("Limpeza aqui");
}
```

---

## 2. throw — Lançar Erros

```javascript
function dividir(a, b) {
  if (b === 0) {
    throw new Error("Divisão por zero");
  }
  return a / b;
}

try {
  dividir(10, 0);
} catch (e) {
  console.error(e.message); // "Divisão por zero"
}
```

---

## 3. Tipos de Erro Built-in

| Tipo             | Quando ocorre                          |
|:----------------:|:--------------------------------------:|
| `Error`          | Erro genérico                          |
| `SyntaxError`    | Código mal formado                     |
| `TypeError`      | Operação em tipo errado                |
| `ReferenceError` | Variável não declarada                 |
| `RangeError`     | Valor fora do intervalo permitido      |
| `URIError`       | Uso incorreto de funções URI           |

```javascript
// TypeError
null.toString(); // Cannot read properties of null

// ReferenceError
console.log(naoExiste); // naoExiste is not defined

// RangeError
new Array(-1); // Invalid array length

// SyntaxError (em JSON.parse, eval)
JSON.parse("{invalido}");
```

---

## 4. Erros Customizados

```javascript
class ValidacaoError extends Error {
  constructor(campo, mensagem) {
    super(mensagem);
    this.name = "ValidacaoError";
    this.campo = campo;
  }
}

class NaoEncontradoError extends Error {
  constructor(recurso, id) {
    super(`${recurso} com id ${id} não encontrado`);
    this.name = "NaoEncontradoError";
    this.recurso = recurso;
    this.id = id;
  }
}

// Uso
function buscarUsuario(id) {
  const usuario = banco.get(id);
  if (!usuario) {
    throw new NaoEncontradoError("Usuário", id);
  }
  return usuario;
}
```

### Captura seletiva

```javascript
try {
  buscarUsuario(999);
} catch (error) {
  if (error instanceof NaoEncontradoError) {
    console.log(`${error.recurso} não existe`);
  } else if (error instanceof ValidacaoError) {
    console.log(`Campo inválido: ${error.campo}`);
  } else {
    throw error; // re-lançar erros inesperados
  }
}
```

---

## 5. Erros em Código Assíncrono

### Promises

```javascript
// .catch() captura rejeições
fetch("/api/dados")
  .then(res => res.json())
  .catch(error => console.error("Falha:", error.message));
```

### async/await

```javascript
async function carregarDados() {
  try {
    const res = await fetch("/api/dados");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Erro ao carregar:", error.message);
    return null;
  }
}
```

### Promise.allSettled — nunca rejeita

```javascript
const resultados = await Promise.allSettled([
  fetch("/api/a"),
  fetch("/api/b"),
  fetch("/api/c"),
]);

resultados.forEach((r) => {
  if (r.status === "fulfilled") {
    console.log("OK:", r.value);
  } else {
    console.error("Falhou:", r.reason.message);
  }
});
```

---

## 6. Padrões Úteis

### Erro como valor (sem try/catch)

```javascript
async function seguro(promise) {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

// Uso
const [dados, erro] = await seguro(fetch("/api/dados").then(r => r.json()));
if (erro) {
  console.error(erro.message);
}
```

### Handler global (último recurso)

```javascript
// Browser
window.addEventListener("error", (event) => {
  console.error("Erro global:", event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Promise não tratada:", event.reason);
});

// Node.js
process.on("uncaughtException", (error) => {
  console.error("Exceção não capturada:", error);
  process.exit(1);
});
```

---

## Boas Práticas

- **Capture apenas erros que você sabe tratar** — re-lance os demais
- **Nunca engula erros silenciosamente** (`catch {}` vazio)
- **Use erros customizados** para distinguir tipos de falha
- **Valide na fronteira** (input do usuário, APIs externas)
- **finally** para limpeza (fechar conexões, esconder loading)

---

> **Próximo módulo:** [17-seguranca](../17-seguranca/README.md)
