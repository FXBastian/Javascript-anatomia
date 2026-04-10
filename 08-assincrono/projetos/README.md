# Projetos Praticos — Assincrono

## Projeto 1: Gerenciador de Tarefas Assincronas

```javascript
class TaskRunner {
  #fila = [];
  #concorrencia;
  #executando = 0;
  #resultados = [];

  constructor(concorrencia = 2) {
    this.#concorrencia = concorrencia;
  }

  adicionar(tarefa) {
    this.#fila.push(tarefa);
    return this;
  }

  async executar() {
    const todas = this.#fila.map((tarefa, i) => this.#agendar(tarefa, i));
    await Promise.all(todas);
    return this.#resultados;
  }

  #agendar(tarefa, indice) {
    return new Promise((resolve) => {
      const verificar = () => {
        if (this.#executando < this.#concorrencia) {
          this.#executando++;
          tarefa()
            .then((resultado) => {
              this.#resultados[indice] = { status: "ok", resultado };
            })
            .catch((erro) => {
              this.#resultados[indice] = { status: "erro", erro: erro.message };
            })
            .finally(() => {
              this.#executando--;
              resolve();
            });
        } else {
          setTimeout(verificar, 50);
        }
      };
      verificar();
    });
  }
}

// Simular tarefas
const delay = (ms, valor) => () => new Promise(res => setTimeout(() => res(valor), ms));
const falhar = (ms) => () => new Promise((_, rej) => setTimeout(() => rej(new Error("falhou")), ms));

const runner = new TaskRunner(2);
runner
  .adicionar(delay(500, "A"))
  .adicionar(delay(300, "B"))
  .adicionar(falhar(200))
  .adicionar(delay(400, "D"));

runner.executar().then(console.log);
```

---

## Projeto 2: Fetch com Retry e Cache

```javascript
class ApiClient {
  #cache = new Map();
  #tentativasMax;
  #delayBase;

  constructor({ tentativas = 3, delayBase = 1000 } = {}) {
    this.#tentativasMax = tentativas;
    this.#delayBase = delayBase;
  }

  async get(url, { cache = true } = {}) {
    if (cache && this.#cache.has(url)) {
      console.log(`[cache] ${url}`);
      return this.#cache.get(url);
    }

    for (let tentativa = 1; tentativa <= this.#tentativasMax; tentativa++) {
      try {
        console.log(`[fetch] ${url} (tentativa ${tentativa})`);
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const dados = await resp.json();

        if (cache) this.#cache.set(url, dados);
        return dados;
      } catch (erro) {
        if (tentativa === this.#tentativasMax) throw erro;
        const delay = this.#delayBase * Math.pow(2, tentativa - 1);
        console.log(`[retry] Aguardando ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
      }
    }
  }

  limparCache() {
    this.#cache.clear();
  }
}

// Uso
const api = new ApiClient({ tentativas: 3, delayBase: 500 });
// api.get("https://jsonplaceholder.typicode.com/todos/1").then(console.log);
```

---

## Projeto 3: Promise.all, race, any e allSettled do Zero

```javascript
function meuPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const resultados = [];
    let completas = 0;
    const total = promises.length;

    if (total === 0) return resolve([]);

    promises.forEach((p, i) => {
      Promise.resolve(p).then(
        (valor) => {
          resultados[i] = valor;
          if (++completas === total) resolve(resultados);
        },
        reject
      );
    });
  });
}

function meuPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    for (const p of promises) {
      Promise.resolve(p).then(resolve, reject);
    }
  });
}

// Teste
const p1 = new Promise(res => setTimeout(() => res("primeiro"), 200));
const p2 = new Promise(res => setTimeout(() => res("segundo"), 100));
const p3 = new Promise((_, rej) => setTimeout(() => rej("erro"), 300));

meuPromiseAll([p1, p2]).then(console.log);    // ["primeiro", "segundo"]
meuPromiseRace([p1, p2]).then(console.log);   // "segundo"
```

**Conexao**: Event Loop (modulo 19), Web APIs (modulo 14), Error Handling (modulo 16).
