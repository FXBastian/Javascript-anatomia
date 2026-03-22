# Promises

## Definição

Uma **Promise** é um objeto que representa o **resultado eventual** de uma operação assíncrona. Em vez de passar um callback para "alguém chamar de volta", a Promise **retorna um objeto** que você pode observar.

> **Analogia:** Uma Promise é como um pedido num restaurante. Você faz o pedido (inicia a operação), recebe um "número de espera" (a Promise), e eventualmente o pedido fica **pronto** (fulfilled) ou é **cancelado** (rejected). Enquanto espera, você pode fazer outras coisas.

---

## 1. Os Três Estados

```
                    ┌──── fulfilled (resolvida com um valor)
                    │
  pending ──────────┤
  (aguardando)      │
                    └──── rejected (rejeitada com um erro)

  Uma vez resolvida ou rejeitada, a Promise é "settled" (finalizada)
  e NUNCA muda de estado novamente.

  pending   → fulfilled  ✓
  pending   → rejected   ✓
  fulfilled → rejected   ✗ (impossível)
  rejected  → fulfilled  ✗ (impossível)
```

---

## 2. Criando uma Promise

```javascript
const minhaPromise = new Promise(function(resolve, reject) {
  // Código assíncrono aqui

  // Se deu certo:
  resolve("Dados obtidos com sucesso!");

  // Se deu errado:
  // reject(new Error("Algo falhou"));
});
```

### Exemplo prático

```javascript
function buscarDados(url) {
  return new Promise(function(resolve, reject) {
    // Simula uma requisição de rede
    setTimeout(function() {
      if (url.startsWith("https://")) {
        resolve({ status: 200, data: "Conteúdo da página" });
      } else {
        reject(new Error("URL inválida: deve começar com https://"));
      }
    }, 1500);
  });
}

// A Promise é RETORNADA — quem chama decide o que fazer com o resultado
const promessa = buscarDados("https://api.exemplo.com");
console.log(promessa); // Promise { <pending> }
```

---

## 3. Consumindo uma Promise: `then`, `catch`, `finally`

### `.then()` — quando **resolve**

```javascript
buscarDados("https://api.exemplo.com")
  .then(function(resultado) {
    console.log(resultado); // { status: 200, data: "..." }
  });
```

### `.catch()` — quando **rejeita**

```javascript
buscarDados("http://inseguro.com")
  .catch(function(erro) {
    console.error(erro.message); // "URL inválida: deve começar com https://"
  });
```

### `.finally()` — **sempre** executa (resolve ou rejeita)

```javascript
buscarDados("https://api.exemplo.com")
  .then(resultado => console.log("Sucesso:", resultado))
  .catch(erro => console.error("Erro:", erro.message))
  .finally(() => {
    console.log("Operação finalizada"); // sempre executa
    // Útil para: esconder loading spinner, limpar recursos
  });
```

---

## 4. Encadeamento (Chaining)

O **superpoder** das Promises: `.then()` retorna uma **nova Promise**, permitindo encadeamento linear — sem aninhamento.

```javascript
// ❌ Callback hell (pra comparar)
buscarUsuario(id, function(err, user) {
  buscarPedidos(user.id, function(err, pedidos) {
    buscarDetalhes(pedidos[0].id, function(err, detalhes) {
      console.log(detalhes);
    });
  });
});

// ✅ Promise chain — FLAT e legível
buscarUsuario(id)
  .then(user => buscarPedidos(user.id))
  .then(pedidos => buscarDetalhes(pedidos[0].id))
  .then(detalhes => console.log(detalhes))
  .catch(erro => console.error("Falha em qualquer etapa:", erro));
```

### Como o encadeamento funciona

```javascript
fetch("https://api.exemplo.com/users/1")
  .then(response => {
    console.log("Status:", response.status);
    return response.json(); // retorna uma NOVA Promise
  })
  .then(data => {
    console.log("Dados:", data);
    return data.name.toUpperCase(); // retorna um valor simples
  })
  .then(nome => {
    console.log("Nome:", nome); // recebe o valor da Promise anterior
  });
```

```
REGRA DO ENCADEAMENTO:
  O que você RETORNA no .then() determina o que o PRÓXIMO .then() recebe:

  return Promise  → próximo .then() espera a Promise resolver
  return valor    → próximo .then() recebe o valor imediatamente
  return nada     → próximo .then() recebe undefined
  throw Error     → pula para o .catch()
```

### Transformação de dados em cadeia

```javascript
function processarPedido(pedidoId) {
  return buscarPedido(pedidoId)
    .then(pedido => {
      console.log("Pedido encontrado:", pedido.id);
      return calcularTotal(pedido.itens);
    })
    .then(total => {
      console.log("Total:", total);
      return aplicarImpostos(total);
    })
    .then(totalComImpostos => {
      console.log("Com impostos:", totalComImpostos);
      return gerarNotaFiscal(totalComImpostos);
    })
    .then(nota => {
      console.log("Nota gerada:", nota.numero);
      return nota;
    });
}

// Um único .catch() captura erros de QUALQUER etapa
processarPedido("PED-001")
  .then(nota => console.log("Sucesso! Nota:", nota.numero))
  .catch(erro => console.error("Falhou no processamento:", erro.message));
```

---

## 5. Tratamento de Erros

### Propagação automática de erros

```javascript
Promise.resolve("início")
  .then(val => {
    throw new Error("Erro na etapa 2!");
    return "nunca chega aqui";
  })
  .then(val => {
    console.log("Etapa 3 — PULADA");
  })
  .then(val => {
    console.log("Etapa 4 — PULADA");
  })
  .catch(erro => {
    console.error("Capturado:", erro.message); // "Erro na etapa 2!"
    // O erro "pulou" direto para o .catch()
  });
```

```
FLUXO DO ERRO:

 .then() ──→ .then() ──→ .then() ──→ .catch()
    ↓           │           │            ↑
  throw!   ─────┼───────────┼────────────┘
         (pula todos os .then() até encontrar .catch())
```

### `.catch()` no meio da cadeia (recuperação)

```javascript
buscarCache("chave")
  .catch(erro => {
    console.log("Cache miss, buscando da API...");
    return buscarDaAPI("chave"); // recuperação — retorna nova Promise
  })
  .then(dados => {
    console.log("Dados:", dados); // funciona com cache OU API
  })
  .catch(erro => {
    console.error("API também falhou:", erro.message);
  });
```

### ⚠️ Erros não capturados

```javascript
// ❌ Promise sem .catch() — erro silencioso!
buscarDados("url-invalida")
  .then(dados => console.log(dados));
// UnhandledPromiseRejection (node) — pode crashar a aplicação

// ✅ SEMPRE adicione .catch()
buscarDados("url-invalida")
  .then(dados => console.log(dados))
  .catch(erro => console.error("Erro capturado:", erro.message));
```

---

## 6. Métodos Estáticos de Promise

### `Promise.all()` — Todas devem resolver

Executa promises em **paralelo**. Resolve quando **todas** resolvem. Rejeita se **qualquer uma** rejeitar.

```javascript
const p1 = fetch("/api/users");
const p2 = fetch("/api/products");
const p3 = fetch("/api/orders");

Promise.all([p1, p2, p3])
  .then(([users, products, orders]) => {
    console.log("Todos os dados chegaram!");
    // users, products, orders são as respostas
  })
  .catch(erro => {
    console.error("Pelo menos uma falhou:", erro);
    // Se qualquer uma rejeitar, TODAS são "canceladas"
  });
```

```
Promise.all([p1, p2, p3]):

  p1 ──────────── resolve ✓
  p2 ────── resolve ✓          → .then() recebe [r1, r2, r3]
  p3 ───────────────── resolve ✓

  Se QUALQUER uma rejeitar:
  p1 ──────────── resolve ✓
  p2 ──── reject ✗              → .catch() imediatamente
  p3 ───────────────── (ignorada)
```

### `Promise.allSettled()` — Espera todas, sem importar resultado

```javascript
const promises = [
  fetch("/api/users"),
  fetch("/api/fail"),     // pode falhar
  fetch("/api/products")
];

Promise.allSettled(promises)
  .then(resultados => {
    resultados.forEach(r => {
      if (r.status === "fulfilled") {
        console.log("Sucesso:", r.value);
      } else {
        console.log("Falha:", r.reason);
      }
    });
    // NUNCA rejeita — sempre resolve com array de resultados
  });
```

### `Promise.race()` — A primeira que resolver/rejeitar vence

```javascript
// Timeout pattern: corrida entre requisição e timer
function comTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout!")), ms)
  );
  return Promise.race([promise, timeout]);
}

comTimeout(fetch("/api/dados"), 5000)
  .then(response => console.log("Dados chegaram a tempo!"))
  .catch(erro => console.error(erro.message)); // "Timeout!" se demorar >5s
```

### `Promise.any()` — A primeira que **resolver** vence

```javascript
// Busca no servidor mais rápido
Promise.any([
  fetch("https://cdn1.exemplo.com/dados"),
  fetch("https://cdn2.exemplo.com/dados"),
  fetch("https://cdn3.exemplo.com/dados")
])
  .then(response => console.log("Servidor mais rápido respondeu:", response.url))
  .catch(erro => console.error("TODOS falharam")); // AggregateError
```

### Comparação

| Método | Resolve quando | Rejeita quando |
|--------|---------------|----------------|
| `Promise.all` | **Todas** resolvem | **Qualquer uma** rejeita |
| `Promise.allSettled` | **Todas** finalizam | **Nunca** rejeita |
| `Promise.race` | **Primeira** a finalizar (resolve ou rejeita) | — |
| `Promise.any` | **Primeira** a resolver | **Todas** rejeitam |

---

## 7. Criação Direta

```javascript
// Promise já resolvida
const resolvida = Promise.resolve(42);
resolvida.then(v => console.log(v)); // 42

// Promise já rejeitada
const rejeitada = Promise.reject(new Error("falhou"));
rejeitada.catch(e => console.log(e.message)); // "falhou"

// Útil para iniciar cadeias ou normalizar valores
function buscar(id) {
  if (!id) return Promise.reject(new Error("ID obrigatório"));
  return fetch(`/api/items/${encodeURIComponent(id)}`);
}
```

---

## 8. Padrões Comuns

### Retry (tentativas)

```javascript
function comRetry(fn, tentativas = 3) {
  return fn().catch(erro => {
    if (tentativas <= 1) throw erro;
    console.log(`Tentando novamente... (${tentativas - 1} restantes)`);
    return comRetry(fn, tentativas - 1);
  });
}

comRetry(() => fetch("/api/instavel"), 3)
  .then(response => console.log("Sucesso!"))
  .catch(erro => console.error("Falhou após 3 tentativas"));
```

### Sequência de Promises (uma após outra)

```javascript
const urls = ["/api/a", "/api/b", "/api/c"];

// Executar em SEQUÊNCIA (não paralelo)
urls.reduce((cadeia, url) => {
  return cadeia.then(resultados => {
    return fetch(url)
      .then(r => r.json())
      .then(data => [...resultados, data]);
  });
}, Promise.resolve([]));
```

---

## 9. Erros Comuns

### Esquecer de retornar dentro do `.then()`

```javascript
// ❌ Sem return — a cadeia recebe undefined
fetch("/api/dados")
  .then(response => {
    response.json(); // falta return!
  })
  .then(data => {
    console.log(data); // undefined!
  });

// ✅ Com return
fetch("/api/dados")
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data); // dados corretos
  });
```

### Aninhar `.then()` (callback hell com Promises)

```javascript
// ❌ Promise hell — não faça isso
fetch("/api/users")
  .then(response => {
    response.json().then(users => {
      fetch(`/api/users/${users[0].id}`).then(response => {
        // aninhamento desnecessário!
      });
    });
  });

// ✅ Encadeie flat
fetch("/api/users")
  .then(response => response.json())
  .then(users => fetch(`/api/users/${encodeURIComponent(users[0].id)}`))
  .then(response => response.json())
  .then(user => console.log(user));
```

### Não tratar rejeições

```javascript
// ❌ Sempre pode falhar — trate!
fetch("/api/dados")
  .then(r => r.json())
  .then(data => exibir(data));
// Se falhar → UnhandledPromiseRejection

// ✅
fetch("/api/dados")
  .then(r => r.json())
  .then(data => exibir(data))
  .catch(erro => exibirErro(erro));
```

---

## 10. Resumo

```
PROMISE = OBJETO QUE REPRESENTA RESULTADO FUTURO

ESTADOS:
  pending → fulfilled (resolve)
         → rejected (reject)

CONSUMO:
  .then(sucesso)    → quando resolve
  .catch(erro)      → quando rejeita
  .finally(sempre)  → sempre executa

ENCADEAMENTO:
  promise.then(a).then(b).then(c).catch(err)
  - return valor → próximo .then() recebe o valor
  - return Promise → próximo .then() espera
  - throw erro → pula para .catch()

ESTÁTICOS:
  Promise.all([...])         → todas devem resolver
  Promise.allSettled([...])  → espera todas
  Promise.race([...])        → primeira a finalizar
  Promise.any([...])         → primeira a resolver
```

---

> **Próximo arquivo:** [async-await.md](async-await.md) — Açúcar sintático sobre Promises que faz código assíncrono parecer síncrono.
