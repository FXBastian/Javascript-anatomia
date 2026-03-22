# Async/Await

## Definição

`async/await` é **açúcar sintático** sobre Promises. Permite escrever código assíncrono com aparência de código síncrono — linear, legível, sem encadeamento de `.then()`.

Introduzido no **ES2017**, é o padrão moderno para lidar com assincronismo em JavaScript.

> **Importante:** async/await **não** substitui Promises — ele **usa** Promises por baixo. Uma async function **sempre** retorna uma Promise.

---

## 1. Sintaxe Básica

### `async` — Marca a função como assíncrona

```javascript
// A keyword async faz a função SEMPRE retornar uma Promise
async function buscarDados() {
  return "dados"; // automaticamente envolto em Promise.resolve("dados")
}

buscarDados().then(valor => console.log(valor)); // "dados"

// Equivalente a:
function buscarDados() {
  return Promise.resolve("dados");
}
```

### `await` — Pausa até a Promise resolver

```javascript
async function obterUsuario() {
  // await PAUSA a execução desta função até a Promise resolver
  const response = await fetch("https://api.exemplo.com/user/1");
  const usuario = await response.json();

  console.log(usuario.nome); // executa DEPOIS que ambas as Promises resolveram
  return usuario;
}

// A função é assíncrona — não bloqueia o rest do programa
obterUsuario();
console.log("Isso executa ANTES do console.log dentro da função!");
```

> ⚠️ `await` só pode ser usado **dentro** de uma `async function` (ou no top-level de um módulo ES).

---

## 2. Comparação: Promises vs Async/Await

### Com `.then()` chain

```javascript
function processarPedido(id) {
  return buscarPedido(id)
    .then(pedido => validarEstoque(pedido))
    .then(pedido => calcularTotal(pedido))
    .then(total => cobrar(total))
    .then(pagamento => confirmar(pagamento))
    .catch(erro => console.error("Erro:", erro.message));
}
```

### Com async/await

```javascript
async function processarPedido(id) {
  try {
    const pedido = await buscarPedido(id);
    const pedidoValidado = await validarEstoque(pedido);
    const total = await calcularTotal(pedidoValidado);
    const pagamento = await cobrar(total);
    const confirmacao = await confirmar(pagamento);
    return confirmacao;
  } catch (erro) {
    console.error("Erro:", erro.message);
  }
}
```

```
COMPARAÇÃO VISUAL:

.then() chain:     buscar → .then(validar) → .then(calcular) → .then(cobrar)
                   Lê de cima para baixo MAS flui dentro de callbacks

async/await:       const x = await buscar()
                   const y = await validar(x)
                   const z = await calcular(y)
                   Lê EXATAMENTE como código síncrono
```

---

## 3. Tratamento de Erros

### `try/catch` — O padrão principal

```javascript
async function buscarDados() {
  try {
    const response = await fetch("https://api.exemplo.com/dados");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const dados = await response.json();
    return dados;
  } catch (erro) {
    console.error("Falha ao buscar:", erro.message);
    throw erro; // re-throw para que quem chamou também possa tratar
  } finally {
    console.log("Busca finalizada"); // sempre executa
  }
}
```

### Capturando erros específicos por etapa

```javascript
async function fluxoCompleto(userId) {
  let usuario;
  try {
    usuario = await buscarUsuario(userId);
  } catch (erro) {
    throw new Error(`Usuário não encontrado: ${erro.message}`);
  }

  let pedidos;
  try {
    pedidos = await buscarPedidos(usuario.id);
  } catch (erro) {
    throw new Error(`Pedidos indisponíveis: ${erro.message}`);
  }

  return { usuario, pedidos };
}
```

### `.catch()` diretamente no await

```javascript
// Alternativa: tratar erro inline com .catch() no await
async function buscarComFallback() {
  // Se falhar, usa o valor padrão do .catch()
  const dados = await fetch("/api/dados")
    .then(r => r.json())
    .catch(() => ({ fallback: true, items: [] }));

  console.log(dados); // dados da API ou fallback
}
```

---

## 4. Execução em Paralelo

### ❌ Sequencial desnecessário

```javascript
// Cada await espera o anterior terminar — LENTO!
async function buscarTudo() {
  const users = await fetch("/api/users").then(r => r.json());       // 2s
  const products = await fetch("/api/products").then(r => r.json()); // 2s
  const orders = await fetch("/api/orders").then(r => r.json());     // 2s
  // Total: ~6 segundos (sequencial)

  return { users, products, orders };
}
```

### ✅ Paralelo com `Promise.all()`

```javascript
// Todas iniciam ao mesmo tempo
async function buscarTudo() {
  const [users, products, orders] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/products").then(r => r.json()),
    fetch("/api/orders").then(r => r.json())
  ]);
  // Total: ~2 segundos (paralelo — tempo da mais lenta)

  return { users, products, orders };
}
```

### Paralelo + tratamento individual

```javascript
async function buscarTudo() {
  const resultados = await Promise.allSettled([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/products").then(r => r.json()),
    fetch("/api/orders").then(r => r.json())
  ]);

  const [users, products, orders] = resultados.map(r =>
    r.status === "fulfilled" ? r.value : null
  );

  return { users, products, orders };
}
```

```
REGRA DE OURO:
  Operações INDEPENDENTES → Promise.all() (paralelo)
  Operações DEPENDENTES   → await sequencial
```

---

## 5. Padrões Avançados

### Async IIFE (para uso fora de async function)

```javascript
// Em scripts que não são módulos, await não funciona no top-level
// Solução: async IIFE

(async () => {
  const dados = await fetch("/api/dados").then(r => r.json());
  console.log(dados);
})();
```

### Top-Level Await (ES Modules)

```javascript
// Em módulos ES (.mjs ou type="module"), await funciona no topo
// config.mjs
const response = await fetch("/api/config");
export const config = await response.json();
```

### Async em métodos de classe

```javascript
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  async post(endpoint, data) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }
}

const api = new ApiClient("https://api.exemplo.com");
const users = await api.get("/users");
```

### Loop com await (sequencial por natureza)

```javascript
// Processar itens UM POR VEZ
async function processarSequencial(itens) {
  const resultados = [];

  for (const item of itens) {
    const resultado = await processar(item); // espera cada um
    resultados.push(resultado);
  }

  return resultados;
}

// Processar itens EM PARALELO
async function processarParalelo(itens) {
  const resultados = await Promise.all(
    itens.map(item => processar(item))
  );
  return resultados;
}
```

### ⚠️ forEach NÃO funciona com await

```javascript
// ❌ forEach não espera os awaits!
async function errado(urls) {
  urls.forEach(async (url) => {
    const data = await fetch(url); // forEach não espera isso
    console.log(data);
  });
  console.log("Terminou"); // executa ANTES dos fetches!
}

// ✅ Use for...of para sequencial
async function correto(urls) {
  for (const url of urls) {
    const data = await fetch(url);
    console.log(data);
  }
  console.log("Terminou"); // executa DEPOIS de todos
}

// ✅ Ou Promise.all + map para paralelo
async function corretoParalelo(urls) {
  const resultados = await Promise.all(
    urls.map(url => fetch(url))
  );
  console.log("Terminou"); // executa DEPOIS de todos
}
```

---

## 6. Retry com Async/Await

```javascript
async function comRetry(fn, tentativas = 3, delay = 1000) {
  for (let i = 0; i < tentativas; i++) {
    try {
      return await fn();
    } catch (erro) {
      if (i === tentativas - 1) throw erro; // última tentativa — desiste

      console.log(`Tentativa ${i + 1} falhou. Retentando em ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // exponential backoff
    }
  }
}

// Uso:
const dados = await comRetry(
  () => fetch("/api/instavel").then(r => r.json()),
  3,
  1000
);
```

---

## 7. Async/Await vs .then() — Quando Usar Cada

| Cenário | Recomendação |
|---------|-------------|
| Operações sequenciais | `async/await` ✅ |
| Operações paralelas | `Promise.all()` com `await` ✅ |
| Cadeia simples (1–2 passos) | `.then()` é suficiente |
| Tratamento de erro complexo | `try/catch` com `async/await` ✅ |
| Event handlers curtos | `.then()` pode ser mais conciso |
| Lógica com condicionais | `async/await` ✅ (muito mais legível) |

### Condicionais — onde async/await brilha

```javascript
// Com .then() — confuso
function buscarDados(tipo) {
  return fetch("/api/check")
    .then(r => r.json())
    .then(check => {
      if (check.cached) {
        return buscarDoCache(tipo);
      } else {
        return fetch(`/api/${encodeURIComponent(tipo)}`)
          .then(r => r.json())
          .then(data => {
            return salvarNoCache(tipo, data).then(() => data);
          });
      }
    });
}

// Com async/await — LINEAR e claro
async function buscarDados(tipo) {
  const check = await fetch("/api/check").then(r => r.json());

  if (check.cached) {
    return buscarDoCache(tipo);
  }

  const data = await fetch(`/api/${encodeURIComponent(tipo)}`).then(r => r.json());
  await salvarNoCache(tipo, data);
  return data;
}
```

---

## 8. Erros Comuns

### Esquecer `await`

```javascript
// ❌ Sem await — response é uma Promise, não o valor!
async function errado() {
  const response = fetch("/api/dados"); // faltou await
  console.log(response); // Promise { <pending> }
}

// ✅
async function correto() {
  const response = await fetch("/api/dados");
  console.log(response.status); // 200
}
```

### Usar await em função não-async

```javascript
// ❌ SyntaxError
function naoAsync() {
  const data = await fetch("/api"); // erro!
}

// ✅
async function simAsync() {
  const data = await fetch("/api");
}
```

### Não tratar erros

```javascript
// ❌ Se falhar, a Promise rejeita silenciosamente
async function semTratamento() {
  const data = await fetch("/api/instavel").then(r => r.json());
  return data;
}

// ✅ Sempre trate erros em async functions
async function comTratamento() {
  try {
    const data = await fetch("/api/instavel").then(r => r.json());
    return data;
  } catch (erro) {
    console.error("Falha:", erro.message);
    return null;
  }
}
```

---

## 9. Resumo

```
ASYNC FUNCTION:
  - Sempre retorna uma Promise
  - Permite usar await dentro dela

AWAIT:
  - Pausa a função até a Promise resolver
  - Retorna o valor resolvido
  - Se rejeitar → throw (capturável com try/catch)

TRATAMENTO DE ERROS:
  try/catch/finally → igual código síncrono

PARALELO:
  const [a, b, c] = await Promise.all([p1, p2, p3])

REGRAS:
  1. await SÓ dentro de async function (ou top-level module)
  2. forEach NÃO funciona com await → use for...of ou Promise.all
  3. Operações independentes → Promise.all() (paralelo)
  4. Operações dependentes → await sequencial
  5. SEMPRE trate erros com try/catch
```

---

> **Próximo arquivo:** [event-loop.md](event-loop.md) — O mecanismo que faz tudo funcionar: Call Stack + Web APIs + Task Queue + Microtask Queue.
