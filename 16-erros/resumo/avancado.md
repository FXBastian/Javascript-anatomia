# Tratamento de Erros — Visão Avançada

## Como a Engine Lida com Erros

Quando um erro acontece, a engine JavaScript faz o seguinte:

1. **Cria um objeto Error** com `.message`, `.name` e `.stack` (captura do stack trace no ponto de criação)
2. **Percorre a call stack de baixo pra cima** procurando o `catch` mais próximo
3. Se encontrar → executa o `catch` e continua normalmente
4. Se **não** encontrar → o erro se torna uma **uncaught exception** e o programa pode encerrar (Node) ou logar no console (browser)

Isso significa que um `try/catch` num nível acima captura erros de qualquer função chamada dentro dele — o erro "sobe" pela stack automaticamente.

```javascript
function c() { throw new Error("boom"); }
function b() { c(); }
function a() { b(); }

try {
  a(); // o erro de c() sobe até aqui
} catch (e) {
  console.log(e.stack);
  // Error: boom
  //   at c (...)
  //   at b (...)
  //   at a (...)
}
```

O `.stack` registra **onde o erro foi criado**, não onde foi capturado. Isso é fundamental para debugging.

---

## O Custo Real do try/catch

Engines modernas (V8, SpiderMonkey) otimizam `try/catch` bem — não é mais o gargalo que era antigamente. Mas existe um custo:

- O bloco `try` cria um ponto de captura na stack
- O `catch` recebe um novo escopo léxico para a variável de erro
- `finally` adiciona mais um ponto de controle

**Na prática:** use `try/catch` onde faz sentido. Não evite por medo de performance. Mas também não envolva loops inteiros em `try` se só uma operação específica pode falhar:

```javascript
// ❌ try muito amplo — qualquer erro do loop cai aqui
try {
  for (const item of lista) {
    processar(item);
    salvar(item);
    notificar(item);
  }
} catch (e) {
  // qual item falhou? qual operação? impossível saber
}

// ✅ try granular — sabe exatamente o que falhou
for (const item of lista) {
  try {
    processar(item);
    salvar(item);
  } catch (e) {
    console.error(`Falha no item ${item.id}:`, e.message);
    continue; // pula o item com problema, continua os demais
  }
}
```

---

## Pegadinhas que Devs Cometem

### 1. Engolir erros silenciosamente

```javascript
// ❌ O pior anti-pattern — o erro desaparece
try {
  fazerAlgo();
} catch (e) {
  // vazio, sem log, sem nada
}

// ✅ No mínimo logue — mas prefira tratar de verdade
try {
  fazerAlgo();
} catch (e) {
  console.error("Falha em fazerAlgo:", e.message);
}
```

### 2. Capturar tudo sem distinção

```javascript
// ❌ Trata TypeError igual a erro de rede
try {
  const dados = await fetchDados();
  dados.map(d => d.nome.toUpperCase());
} catch (e) {
  alert("Erro de rede!"); // pode ser um bug no .map()
}

// ✅ Separe por tipo
try {
  const dados = await fetchDados();
  dados.map(d => d.nome.toUpperCase());
} catch (e) {
  if (e instanceof TypeError) {
    console.error("Bug no código:", e.message);
  } else {
    alert("Erro ao buscar dados");
  }
}
```

### 3. throw sem new Error()

```javascript
// ❌ Sem stack trace, sem .name, difícil de debugar
throw "algo deu errado";
throw 42;
throw { msg: "erro" };

// ✅ Sempre use Error (ou subclasse)
throw new Error("algo deu errado");
```

### 4. Esquecer que async muda as regras

```javascript
// ❌ try/catch NÃO captura rejeição de Promise sem await
try {
  fetch("/api/dados"); // sem await — retorna Promise, não espera
} catch (e) {
  // NUNCA entra aqui
}

// ✅ Precisa do await para o catch funcionar
try {
  await fetch("/api/dados");
} catch (e) {
  console.error(e.message);
}
```

### 5. finally pode sobrescrever retorno

```javascript
function teste() {
  try {
    return "do try";
  } finally {
    return "do finally"; // ⚠️ sobrescreve o return do try!
  }
}
console.log(teste()); // "do finally"
```

**Regra:** nunca use `return` dentro de `finally`. Use `finally` só para limpeza.

---

## Erros Síncronos vs Assíncronos

| Aspecto | Síncrono | Assíncrono (Promise) |
|:--------|:---------|:---------------------|
| Captura | `try/catch` | `.catch()` ou `try/catch` + `await` |
| Propagação | Sobe pela call stack | Rejeita a cadeia de Promises |
| Se não tratar | `uncaughtException` | `unhandledrejection` |
| Stack trace | Completo | Pode perder contexto entre ticks |

O ponto crítico: **sem `await`, o `try/catch` não enxerga a rejeição**. A Promise rejeita no microtask queue, fora do escopo do `try` síncrono.

---

## Erros Customizados — Design Profissional

Em aplicações reais, crie uma hierarquia de erros que reflita seu domínio:

```javascript
// Erro base da aplicação
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name; // nome automático da classe
    this.statusCode = statusCode;
    Error.captureStackTrace?.(this, this.constructor); // V8: stack trace limpo
  }
}

// Erros específicos
class ValidationError extends AppError {
  constructor(campo, detalhe) {
    super(`Validação falhou: ${campo} — ${detalhe}`, 400);
    this.campo = campo;
  }
}

class NotFoundError extends AppError {
  constructor(recurso, id) {
    super(`${recurso} #${id} não encontrado`, 404);
    this.recurso = recurso;
  }
}

class AuthError extends AppError {
  constructor(motivo = "Não autorizado") {
    super(motivo, 401);
  }
}
```

Isso permite tratamento centralizado:

```javascript
// Middleware de erro (Express-style)
function handleError(error, req, res) {
  if (error instanceof AppError) {
    // Erro esperado — responde com status adequado
    res.status(error.statusCode).json({
      error: error.name,
      message: error.message,
    });
  } else {
    // Erro inesperado — loga e responde genérico
    console.error("ERRO INESPERADO:", error);
    res.status(500).json({ error: "Erro interno" });
  }
}
```

A ideia é: **erros esperados** (validação, não encontrado, auth) são controlados. **Erros inesperados** (bug, falha de infra) são logados e tratados genericamente.

---

## Padrão Result — Alternativa ao try/catch Espalhado

Inspirado em linguagens como Rust e Go, o padrão de retornar `[valor, erro]` evita try/catch em cada chamada:

```javascript
async function seguro(fn) {
  try {
    const resultado = await fn();
    return [resultado, null];
  } catch (error) {
    return [null, error];
  }
}

// Uso — clean, sem try/catch no código de negócio
const [usuario, erro] = await seguro(() => buscarUsuario(42));
if (erro) {
  // trata o erro
  return;
}
// usa usuario normalmente
```

**Quando usar:** chamadas a APIs externas, operações de I/O, qualquer coisa que falha com frequência. Não faz sentido para código que "nunca deveria falhar" — ali, deixe o erro subir.

---

## Estratégia de Tratamento — Onde Colocar o try/catch

A pergunta não é "devo usar try/catch?", mas **"quem tem contexto suficiente para decidir o que fazer com esse erro?"**

```
Camada UI       → Mostra mensagem pro usuário
Camada Service  → Loga, retry, fallback
Camada Infra    → Reconecta, timeout
```

**Princípio:** capture o erro no nível mais próximo de quem pode tomar uma ação útil. Se uma função não sabe o que fazer com o erro, **não capture — deixe subir**.

```javascript
// ❌ Captura sem saber o que fazer
function buscarDoBanco(id) {
  try {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
  } catch (e) {
    console.log("erro"); // e daí? quem chamou não sabe que falhou
    return null;         // null pode causar TypeError depois
  }
}

// ✅ Deixa o erro subir — quem chamou decide
function buscarDoBanco(id) {
  return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
}

// Quem chamou tem contexto para decidir
async function handleGetUsuario(req, res) {
  try {
    const usuario = await buscarDoBanco(req.params.id);
    res.json(usuario);
  } catch (e) {
    res.status(500).json({ error: "Falha ao buscar usuário" });
  }
}
```

---

## Observabilidade — Erros em Produção

Em produção, tratar erro não é só `console.error`. Pense em:

- **Logging estruturado** — JSON com timestamp, contexto, stack
- **Monitoramento** — ferramentas como Sentry capturam erros automaticamente
- **Handlers globais** — última barreira antes do crash

```javascript
// Handler global bem feito (Node.js)
process.on("uncaughtException", (error) => {
  logger.fatal({ error, msg: "Exceção não capturada" });
  // Encerra gracefully — não tente continuar
  process.exit(1);
});

process.on("unhandledrejection", (reason) => {
  logger.error({ reason, msg: "Promise não tratada" });
  // Em produção, considere encerrar também
});
```

Handlers globais são **rede de segurança**, não estratégia de tratamento. Se você está dependendo deles, seu código precisa de mais `try/catch` nos pontos certos.
