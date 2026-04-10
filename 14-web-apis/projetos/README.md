# Projetos Praticos — Web APIs

## Projeto 1: HTTP Client Completo

```javascript
class HttpClient {
  #baseUrl;
  #headers;
  #interceptors = { request: [], response: [] };

  constructor(baseUrl, headers = {}) {
    this.#baseUrl = baseUrl;
    this.#headers = { "Content-Type": "application/json", ...headers };
  }

  interceptar(tipo, fn) {
    this.#interceptors[tipo].push(fn);
    return this;
  }

  async #request(metodo, caminho, body = null) {
    let config = {
      method: metodo,
      headers: { ...this.#headers },
      body: body ? JSON.stringify(body) : null
    };

    // Aplicar interceptors de request
    for (const fn of this.#interceptors.request) {
      config = fn(config) || config;
    }

    const resp = await fetch(`${this.#baseUrl}${caminho}`, config);
    let dados = await resp.json().catch(() => null);

    // Aplicar interceptors de response
    for (const fn of this.#interceptors.response) {
      dados = fn(dados, resp) || dados;
    }

    if (!resp.ok) {
      throw Object.assign(new Error(`HTTP ${resp.status}`), { status: resp.status, dados });
    }

    return dados;
  }

  get(caminho) { return this.#request("GET", caminho); }
  post(caminho, body) { return this.#request("POST", caminho, body); }
  put(caminho, body) { return this.#request("PUT", caminho, body);  }
  delete(caminho) { return this.#request("DELETE", caminho); }
}

// Uso
const api = new HttpClient("https://jsonplaceholder.typicode.com");
api.interceptar("request", (config) => {
  console.log(`[${config.method}] ${config.headers}`);
  return config;
});
// api.get("/todos/1").then(console.log);
```

---

## Projeto 2: Storage Manager com Expiracao

```javascript
const StorageManager = {
  set(chave, valor, ttlMs = null) {
    const item = {
      valor,
      criadoEm: Date.now(),
      expiraEm: ttlMs ? Date.now() + ttlMs : null
    };
    localStorage.setItem(chave, JSON.stringify(item));
  },

  get(chave) {
    const raw = localStorage.getItem(chave);
    if (!raw) return null;

    const item = JSON.parse(raw);
    if (item.expiraEm && Date.now() > item.expiraEm) {
      localStorage.removeItem(chave);
      return null;
    }

    return item.valor;
  },

  remove(chave) {
    localStorage.removeItem(chave);
  },

  limpar() {
    localStorage.clear();
  },

  listar() {
    const items = {};
    for (let i = 0; i < localStorage.length; i++) {
      const chave = localStorage.key(i);
      items[chave] = this.get(chave);
    }
    return items;
  },

  tamanhoUsado() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const chave = localStorage.key(i);
      total += localStorage.getItem(chave).length * 2; // UTF-16
    }
    return `${(total / 1024).toFixed(2)} KB`;
  }
};

StorageManager.set("sessao", { user: "ana" }, 60000); // expira em 1 min
console.log(StorageManager.get("sessao"));
console.log(StorageManager.tamanhoUsado());
```

---

## Projeto 3: Sistema de Timers Gerenciado

```javascript
class TimerManager {
  #timers = new Map();

  setTimeout(nome, callback, delay) {
    this.cancelar(nome);
    const id = setTimeout(() => {
      callback();
      this.#timers.delete(nome);
    }, delay);
    this.#timers.set(nome, { tipo: "timeout", id });
    return this;
  }

  setInterval(nome, callback, intervalo) {
    this.cancelar(nome);
    const id = setInterval(callback, intervalo);
    this.#timers.set(nome, { tipo: "interval", id });
    return this;
  }

  cancelar(nome) {
    const timer = this.#timers.get(nome);
    if (!timer) return;
    if (timer.tipo === "timeout") clearTimeout(timer.id);
    else clearInterval(timer.id);
    this.#timers.delete(nome);
  }

  cancelarTodos() {
    for (const nome of this.#timers.keys()) {
      this.cancelar(nome);
    }
  }

  listar() {
    return [...this.#timers.entries()].map(([nome, { tipo }]) => ({ nome, tipo }));
  }
}

const timers = new TimerManager();
timers.setTimeout("saudacao", () => console.log("Ola!"), 2000);
timers.setInterval("clock", () => console.log(new Date().toLocaleTimeString()), 1000);
// timers.cancelarTodos(); // limpa tudo
```
