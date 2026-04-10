# Projetos Praticos — Arquitetura

## Projeto 1: Mini State Manager (Redux-like)

```javascript
function criarStore(reducer, estadoInicial) {
  let estado = estadoInicial;
  const listeners = [];

  return {
    getState() { return estado; },

    dispatch(acao) {
      estado = reducer(estado, acao);
      listeners.forEach(fn => fn(estado));
    },

    subscribe(fn) {
      listeners.push(fn);
      return () => listeners.splice(listeners.indexOf(fn), 1);
    }
  };
}

// Reducer
function contadorReducer(estado = { valor: 0 }, acao) {
  switch (acao.type) {
    case "INCREMENTAR": return { ...estado, valor: estado.valor + 1 };
    case "DECREMENTAR": return { ...estado, valor: estado.valor - 1 };
    case "RESET": return { ...estado, valor: 0 };
    default: return estado;
  }
}

const store = criarStore(contadorReducer, { valor: 0 });
store.subscribe(s => console.log("Estado:", s));
store.dispatch({ type: "INCREMENTAR" });
store.dispatch({ type: "INCREMENTAR" });
store.dispatch({ type: "DECREMENTAR" });
```

---

## Projeto 2: Middleware Pipeline

```javascript
class App {
  #middlewares = [];

  use(fn) {
    this.#middlewares.push(fn);
    return this;
  }

  async handle(request) {
    const ctx = { request, response: null, meta: {} };
    let i = 0;

    const next = async () => {
      if (i < this.#middlewares.length) {
        await this.#middlewares[i++](ctx, next);
      }
    };

    await next();
    return ctx.response;
  }
}

const app = new App();

app.use(async (ctx, next) => {
  console.log(`[LOG] ${ctx.request.method} ${ctx.request.url}`);
  const inicio = Date.now();
  await next();
  console.log(`[LOG] Resposta em ${Date.now() - inicio}ms`);
});

app.use(async (ctx, next) => {
  if (!ctx.request.token) {
    ctx.response = { status: 401, body: "Nao autorizado" };
    return;
  }
  ctx.meta.usuario = "Ana";
  await next();
});

app.use(async (ctx) => {
  ctx.response = { status: 200, body: `Ola, ${ctx.meta.usuario}!` };
});

app.handle({ method: "GET", url: "/api", token: "abc" }).then(console.log);
```

---

## Projeto 3: Dependency Injection Container

```javascript
class Container {
  #registros = new Map();
  #singletons = new Map();

  registrar(nome, factory, { singleton = false } = {}) {
    this.#registros.set(nome, { factory, singleton });
  }

  resolver(nome) {
    const reg = this.#registros.get(nome);
    if (!reg) throw new Error(`"${nome}" nao registrado`);

    if (reg.singleton) {
      if (!this.#singletons.has(nome)) {
        this.#singletons.set(nome, reg.factory(this));
      }
      return this.#singletons.get(nome);
    }

    return reg.factory(this);
  }
}

const container = new Container();
container.registrar("config", () => ({ apiUrl: "https://api.com" }), { singleton: true });
container.registrar("logger", () => ({ log: console.log }), { singleton: true });
container.registrar("api", (c) => ({
  get(path) {
    const { apiUrl } = c.resolver("config");
    c.resolver("logger").log(`GET ${apiUrl}${path}`);
    return fetch(`${apiUrl}${path}`);
  }
}));

const api = container.resolver("api");
// api.get("/users");
```
