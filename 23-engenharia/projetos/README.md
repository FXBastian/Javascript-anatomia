# Projetos Praticos — Engenharia

## Projeto 1: Debug Logger Avancado

```javascript
class DebugLogger {
  static #instancia = null;
  #nivel;
  #filtros = [];
  #output;

  static NIVEIS = { trace: 0, debug: 1, info: 2, warn: 3, error: 4, off: 5 };

  constructor({ nivel = "info", output = console } = {}) {
    this.#nivel = DebugLogger.NIVEIS[nivel] ?? 2;
    this.#output = output;
  }

  static global(config) {
    if (!DebugLogger.#instancia) {
      DebugLogger.#instancia = new DebugLogger(config);
    }
    return DebugLogger.#instancia;
  }

  filtrar(pattern) {
    this.#filtros.push(pattern instanceof RegExp ? pattern : new RegExp(pattern));
    return this;
  }

  #deveLogar(nivel, contexto) {
    if (DebugLogger.NIVEIS[nivel] < this.#nivel) return false;
    if (this.#filtros.length === 0) return true;
    return this.#filtros.some(f => f.test(contexto));
  }

  log(nivel, contexto, ...args) {
    if (!this.#deveLogar(nivel, contexto)) return;

    const timestamp = new Date().toISOString().slice(11, 23);
    const prefix = `[${timestamp}] [${nivel.toUpperCase().padEnd(5)}] [${contexto}]`;

    const metodo = nivel === "error" ? "error" : nivel === "warn" ? "warn" : "log";
    this.#output[metodo](prefix, ...args);
  }

  // Atalhos
  trace(ctx, ...a) { this.log("trace", ctx, ...a); }
  debug(ctx, ...a) { this.log("debug", ctx, ...a); }
  info(ctx, ...a) { this.log("info", ctx, ...a); }
  warn(ctx, ...a) { this.log("warn", ctx, ...a); }
  error(ctx, ...a) { this.log("error", ctx, ...a); }
}

const log = new DebugLogger({ nivel: "debug" });
log.filtrar("api|auth"); // so logar contextos que contenham "api" ou "auth"

log.debug("api", "Buscando usuario", { id: 1 });
log.info("auth", "Login bem-sucedido");
log.debug("render", "Isso nao aparece (filtrado)");
log.error("api", "Timeout na requisicao");
```

---

## Projeto 2: Profiler Decorador

```javascript
class Profiler {
  #registros = new Map();

  wrap(obj, metodos = null) {
    const alvos = metodos || Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
      .filter(m => m !== "constructor" && typeof obj[m] === "function");

    for (const metodo of alvos) {
      const original = obj[metodo].bind(obj);
      const registros = this.#registros;

      obj[metodo] = function (...args) {
        const chave = `${obj.constructor.name}.${metodo}`;
        const inicio = performance.now();
        const resultado = original(...args);

        if (resultado instanceof Promise) {
          return resultado.finally(() => {
            registros.set(chave, (registros.get(chave) || []).concat(performance.now() - inicio));
          });
        }

        registros.set(chave, (registros.get(chave) || []).concat(performance.now() - inicio));
        return resultado;
      };
    }

    return obj;
  }

  relatorio() {
    const linhas = [];
    for (const [nome, tempos] of this.#registros) {
      const total = tempos.reduce((a, b) => a + b, 0);
      linhas.push({
        metodo: nome,
        chamadas: tempos.length,
        total: `${total.toFixed(2)}ms`,
        media: `${(total / tempos.length).toFixed(2)}ms`,
        max: `${Math.max(...tempos).toFixed(2)}ms`
      });
    }
    console.table(linhas.sort((a, b) => parseFloat(b.total) - parseFloat(a.total)));
  }
}

// Uso
class MeuServico {
  processar(n) {
    let soma = 0;
    for (let i = 0; i < n; i++) soma += i;
    return soma;
  }
}

const profiler = new Profiler();
const servico = profiler.wrap(new MeuServico());

for (let i = 0; i < 100; i++) servico.processar(10000);
profiler.relatorio();
```

---

## Projeto 3: Refactoring Kata

Refatore este codigo mantendo o mesmo comportamento (escreva testes primeiro):

```javascript
// ANTES: funcao monolitica com code smells
function f(d) {
  let r = [];
  for (let i = 0; i < d.length; i++) {
    if (d[i].a === true) {
      let x = d[i].n;
      if (d[i].t === 1) x = x.toUpperCase();
      else if (d[i].t === 2) x = x.toLowerCase();
      else if (d[i].t === 3) x = x.charAt(0).toUpperCase() + x.slice(1);
      if (d[i].p > 100) x = "*** " + x + " ***";
      r.push(x);
    }
  }
  return r.join(", ");
}

// Dados de teste
const dados = [
  { n: "hello", a: true, t: 1, p: 50 },
  { n: "world", a: true, t: 3, p: 150 },
  { n: "hidden", a: false, t: 1, p: 200 },
  { n: "test", a: true, t: 2, p: 10 }
];

console.log(f(dados)); // "HELLO, *** World ***, test"

// SEU TRABALHO:
// 1. Escrever testes para o comportamento atual
// 2. Renomear variaveis
// 3. Extrair funcoes
// 4. Eliminar magic numbers
// 5. Usar metodos de array (filter, map)
// 6. Verificar que testes continuam passando
```
