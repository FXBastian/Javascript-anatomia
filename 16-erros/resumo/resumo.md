# Tratamento de Erros — Resumo Consolidado

## try / catch / finally

O `try` envolve código que pode falhar. Se falhar, o `catch` recebe o erro. O `finally` **sempre** executa, deu erro ou não.

```javascript
try {
  const dados = JSON.parse(textoInvalido);
} catch (error) {
  console.error(error.message); // mensagem do erro
  console.error(error.name);    // tipo: "SyntaxError"
} finally {
  console.log("Sempre executa — limpeza aqui");
}
```

- `catch` recebe um objeto `Error` com `.message`, `.name` e `.stack`
- `finally` é ideal para fechar conexões, esconder loading, liberar recursos

---

## throw — Lançar Erros

Você pode criar e lançar seus próprios erros com `throw`:

```javascript
function dividir(a, b) {
  if (b === 0) throw new Error("Divisão por zero");
  return a / b;
}
```

Qualquer valor pode ser lançado, mas **sempre use `new Error()`** — isso garante `.message`, `.name` e `.stack`.

---

## Tipos de Erro Nativos

| Tipo             | Quando acontece                       |
|:-----------------|:--------------------------------------|
| `Error`          | Erro genérico                         |
| `SyntaxError`    | Código/JSON mal formado               |
| `TypeError`      | Operação em tipo errado               |
| `ReferenceError` | Variável não declarada                |
| `RangeError`     | Valor fora do intervalo               |
| `URIError`       | Uso incorreto de funções URI          |

```javascript
null.toString();         // TypeError
console.log(naoExiste);  // ReferenceError
new Array(-1);           // RangeError
JSON.parse("{invalido}"); // SyntaxError
```

---

## Erros Customizados

Estender `Error` permite criar tipos específicos para sua aplicação:

```javascript
class NaoEncontradoError extends Error {
  constructor(recurso, id) {
    super(`${recurso} com id ${id} não encontrado`);
    this.name = "NaoEncontradoError";
    this.recurso = recurso;
    this.id = id;
  }
}
```

E capturar de forma seletiva com `instanceof`:

```javascript
try {
  buscarUsuario(999);
} catch (error) {
  if (error instanceof NaoEncontradoError) {
    console.log(`${error.recurso} não existe`);
  } else {
    throw error; // re-lança o que não sabe tratar
  }
}
```

---

## Erros em Código Assíncrono

### Com Promises — use `.catch()`

```javascript
fetch("/api/dados")
  .then(res => res.json())
  .catch(error => console.error(error.message));
```

### Com async/await — use `try/catch`

```javascript
async function carregarDados() {
  try {
    const res = await fetch("/api/dados");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Erro:", error.message);
    return null;
  }
}
```

### Promise.allSettled — nunca rejeita

```javascript
const resultados = await Promise.allSettled([
  fetch("/api/a"),
  fetch("/api/b"),
]);

resultados.forEach(r => {
  r.status === "fulfilled"
    ? console.log("OK:", r.value)
    : console.error("Falhou:", r.reason.message);
});
```

---

## Padrão: Erro como Valor

Evita `try/catch` espalhado — retorna `[dados, erro]`:

```javascript
async function seguro(promise) {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

const [dados, erro] = await seguro(fetch("/api").then(r => r.json()));
if (erro) console.error(erro.message);
```

---

## Handler Global (último recurso)

```javascript
// Browser
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

## Boas Práticas — Direto ao Ponto

- Capture **apenas** erros que você sabe tratar — re-lance os demais
- **Nunca** deixe `catch {}` vazio (engolir erro = bug invisível)
- Use erros customizados para distinguir tipos de falha
- Valide na fronteira: input do usuário, APIs externas
- Use `finally` para limpeza (conexões, loading, timers)

---

## Fluxo Mental

Tudo se conecta assim:

1. **Código pode falhar** → envolva com `try/catch`
2. **Precisa forçar uma falha** → use `throw new Error()`
3. **Quer distinguir tipos de falha** → crie classes que estendem `Error` e use `instanceof`
4. **Código assíncrono** → `try/catch` com `await` ou `.catch()` em Promises
5. **Precisa garantir limpeza** → `finally` sempre executa
6. **Quer evitar try/catch espalhado** → use o padrão "erro como valor" `[dados, erro]`
7. **Última linha de defesa** → handlers globais (`unhandledrejection`, `uncaughtException`)

O pensamento profissional é: **todo erro deve ser tratado ou propagado — nunca ignorado**. Você decide onde tratar baseado em quem tem contexto suficiente para tomar uma decisão útil sobre aquele erro.
