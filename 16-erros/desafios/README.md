# Desafios — Tratamento de Erros

## Desafio 1: Error Cause Chain

Use a feature `Error.cause` (ES2022) para criar cadeias de erro:

```javascript
async function buscarUsuario(id) {
  try {
    const resp = await fetch(`/api/users/${id}`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return await resp.json();
  } catch (erro) {
    throw new Error("Falha ao buscar usuario", { cause: erro });
  }
}

// Como percorrer a cadeia de causas para log completo?
function logCadeiaErros(erro) {
  // Implemente: percorra erro.cause recursivamente
}
```

---

## Desafio 2: finally vs return

Preveja a saida:

```javascript
function teste() {
  try {
    return "try";
  } finally {
    return "finally";
  }
}
console.log(teste()); // ?

function teste2() {
  try {
    throw new Error("boom");
  } catch {
    return "catch";
  } finally {
    // finally SEM return
  }
}
console.log(teste2()); // ?
```

---

## Desafio 3: Async Error Patterns

Qual e a forma correta de capturar erros em cada caso?

```javascript
// 1. Promise sem await
function a() { fetch("/api").then(r => r.json()); }

// 2. Await sem try/catch
async function b() { const r = await fetch("/api"); }

// 3. Promise.all com uma falha
async function c() { await Promise.all([fetch("/ok"), fetch("/falha")]); }

// Para cada caso: onde o erro vai parar? Como capturar?
```

---

## Desafio 4: Custom Error com Stack Trace Limpo

```javascript
class CustomError extends Error {
  constructor(mensagem) {
    super(mensagem);
    // Como fazer o stack trace apontar para quem chamou,
    // e nao para esta classe? (dica: Error.captureStackTrace)
  }
}
```

---

## Desafio 5: Error Agregado

Implemente uma versao de Promise.allSettled que agrupa resultados e erros:

```javascript
async function executarTodos(promises) {
  // Retornar: { sucesso: [...resultados], erros: [...erros] }
  // Nunca rejeitar - sempre resolver com o resumo
}
```
