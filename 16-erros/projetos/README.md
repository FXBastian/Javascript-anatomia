# Projetos Praticos — Tratamento de Erros

## Projeto 1: Error Handling Framework

```javascript
class AppError extends Error {
  constructor(mensagem, { codigo, contexto, causa } = {}) {
    super(mensagem);
    this.name = this.constructor.name;
    this.codigo = codigo || "ERRO_DESCONHECIDO";
    this.contexto = contexto || {};
    this.causa = causa;
    this.timestamp = new Date().toISOString();
  }

  toJSON() {
    return {
      erro: this.name,
      mensagem: this.message,
      codigo: this.codigo,
      contexto: this.contexto,
      timestamp: this.timestamp
    };
  }
}

class ErroValidacao extends AppError {
  constructor(campo, mensagem) {
    super(mensagem, { codigo: "VALIDACAO", contexto: { campo } });
  }
}

class ErroAPI extends AppError {
  constructor(status, mensagem) {
    super(mensagem, { codigo: `HTTP_${status}`, contexto: { status } });
  }
}

class ErroNegocio extends AppError {
  constructor(mensagem, regra) {
    super(mensagem, { codigo: "REGRA_NEGOCIO", contexto: { regra } });
  }
}

// Error Boundary
function executarSeguro(fn, fallback = null) {
  try {
    const resultado = fn();
    if (resultado instanceof Promise) {
      return resultado.catch(erro => {
        console.error("[ASYNC]", erro instanceof AppError ? erro.toJSON() : erro);
        return fallback;
      });
    }
    return resultado;
  } catch (erro) {
    console.error("[SYNC]", erro instanceof AppError ? erro.toJSON() : erro);
    return fallback;
  }
}

// Uso
function processarPedido(pedido) {
  if (!pedido.items?.length) {
    throw new ErroValidacao("items", "Pedido sem items");
  }
  if (pedido.total > 10000) {
    throw new ErroNegocio("Limite de valor excedido", "LIMITE_PEDIDO");
  }
  return { sucesso: true };
}

console.log(executarSeguro(() => processarPedido({ items: [], total: 0 }), { sucesso: false }));
```

---

## Projeto 2: Logger com Niveis

```javascript
class Logger {
  static NIVEIS = { debug: 0, info: 1, warn: 2, error: 3, silent: 4 };
  #nivel;
  #historico = [];

  constructor(nivel = "info") {
    this.#nivel = Logger.NIVEIS[nivel] ?? 1;
  }

  #log(nivel, ...args) {
    if (Logger.NIVEIS[nivel] < this.#nivel) return;
    const entrada = { nivel, timestamp: new Date().toISOString(), dados: args };
    this.#historico.push(entrada);
    const metodo = nivel === "error" ? "error" : nivel === "warn" ? "warn" : "log";
    console[metodo](`[${nivel.toUpperCase()}]`, ...args);
  }

  debug(...args) { this.#log("debug", ...args); }
  info(...args) { this.#log("info", ...args); }
  warn(...args) { this.#log("warn", ...args); }
  error(...args) { this.#log("error", ...args); }

  historico(nivel = null) {
    if (!nivel) return [...this.#historico];
    return this.#historico.filter(e => e.nivel === nivel);
  }
}

const log = new Logger("debug");
log.debug("Detalhes internos");
log.info("Sistema iniciado");
log.warn("Recurso depreciado");
log.error("Conexao perdida");
console.log("Errors:", log.historico("error"));
```

---

## Projeto 3: Retry com Circuit Breaker

```javascript
class CircuitBreaker {
  #falhasConsecutivas = 0;
  #limiteAbrir;
  #tempoReset;
  #estado = "fechado"; // fechado, aberto, semi-aberto
  #ultimaFalha = 0;

  constructor({ limiteAbrir = 3, tempoReset = 10000 } = {}) {
    this.#limiteAbrir = limiteAbrir;
    this.#tempoReset = tempoReset;
  }

  async executar(fn) {
    if (this.#estado === "aberto") {
      if (Date.now() - this.#ultimaFalha > this.#tempoReset) {
        this.#estado = "semi-aberto";
      } else {
        throw new Error("Circuit breaker aberto - servico indisponivel");
      }
    }

    try {
      const resultado = await fn();
      this.#falhasConsecutivas = 0;
      this.#estado = "fechado";
      return resultado;
    } catch (erro) {
      this.#falhasConsecutivas++;
      this.#ultimaFalha = Date.now();
      if (this.#falhasConsecutivas >= this.#limiteAbrir) {
        this.#estado = "aberto";
      }
      throw erro;
    }
  }

  get estado() { return this.#estado; }
}
```
