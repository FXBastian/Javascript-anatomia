# Projetos Praticos — Modulos

## Projeto 1: Sistema Modular Completo

Estrutura de um mini-app organizado em modulos:

```
projeto/
  index.js          ← ponto de entrada
  config.js         ← configuracoes exportadas
  utils/
    string.js       ← utilidades de string
    number.js       ← utilidades de numero
    index.js        ← re-exporta tudo
  services/
    api.js          ← comunicacao com API
    auth.js         ← autenticacao
    index.js        ← re-exporta tudo
```

```javascript
// config.js
export const API_URL = "https://api.exemplo.com";
export const TIMEOUT = 5000;
export default { API_URL, TIMEOUT };

// utils/string.js
export function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// utils/number.js
export function formatar(num, decimais = 2) {
  return num.toFixed(decimais);
}

// utils/index.js - barrel export
export * as string from "./string.js";
export * as number from "./number.js";

// services/api.js
import { API_URL, TIMEOUT } from "../config.js";

export async function get(caminho) {
  const resp = await fetch(`${API_URL}${caminho}`, {
    signal: AbortSignal.timeout(TIMEOUT)
  });
  return resp.json();
}

// services/auth.js
let token = null;
export function setToken(t) { token = t; }
export function getToken() { return token; }
export function isLogado() { return token !== null; }

// index.js
import config from "./config.js";
import { string, number } from "./utils/index.js";
import * as api from "./services/api.js";
import { isLogado } from "./services/auth.js";

console.log(string.capitalizar("hello"));
console.log(number.formatar(3.14159));
```

---

## Projeto 2: Plugin System com Dynamic Import

```javascript
class PluginManager {
  #plugins = new Map();

  async carregar(nome, caminho) {
    try {
      const modulo = await import(caminho);
      const plugin = modulo.default || modulo;

      if (typeof plugin.inicializar === "function") {
        await plugin.inicializar();
      }

      this.#plugins.set(nome, plugin);
      console.log(`Plugin "${nome}" carregado`);
      return plugin;
    } catch (erro) {
      console.error(`Falha ao carregar plugin "${nome}":`, erro.message);
      throw erro;
    }
  }

  obter(nome) {
    return this.#plugins.get(nome);
  }

  listar() {
    return [...this.#plugins.keys()];
  }

  async descarregar(nome) {
    const plugin = this.#plugins.get(nome);
    if (plugin?.destruir) await plugin.destruir();
    this.#plugins.delete(nome);
  }
}

// Exemplo de plugin:
// export default {
//   nome: "analytics",
//   inicializar() { console.log("Analytics pronto"); },
//   track(evento) { console.log(`[analytics] ${evento}`); },
//   destruir() { console.log("Analytics desligado"); }
// };
```

---

## Projeto 3: Dependency Injection com Modulos

```javascript
// container.js
const dependencias = new Map();

export function registrar(nome, factory) {
  dependencias.set(nome, { factory, instancia: null });
}

export function resolver(nome) {
  const dep = dependencias.get(nome);
  if (!dep) throw new Error(`Dependencia "${nome}" nao registrada`);
  if (!dep.instancia) dep.instancia = dep.factory();
  return dep.instancia;
}

// Uso:
// registrar("logger", () => ({ log: console.log }));
// registrar("api", () => new ApiClient(resolver("logger")));
// const api = resolver("api");
```
