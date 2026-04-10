# Projetos Praticos — Event Loop e Callbacks Avancado

## Projeto 1: Simulador Completo do Event Loop

```javascript
class EventLoopSimulator {
  #callStack = [];
  #macrotaskQueue = [];
  #microtaskQueue = [];
  #log = [];

  pushStack(nome) {
    this.#callStack.push(nome);
    this.#log.push(`[STACK PUSH] ${nome} | Stack: [${this.#callStack.join(", ")}]`);
  }

  popStack() {
    const nome = this.#callStack.pop();
    this.#log.push(`[STACK POP]  ${nome} | Stack: [${this.#callStack.join(", ")}]`);
  }

  agendarMacrotask(nome, callback) {
    this.#log.push(`[MACRO QUEUE] ${nome} agendado`);
    this.#macrotaskQueue.push({ nome, callback });
  }

  agendarMicrotask(nome, callback) {
    this.#log.push(`[MICRO QUEUE] ${nome} agendado`);
    this.#microtaskQueue.push({ nome, callback });
  }

  executarCiclo() {
    this.#log.push("\n=== PROCESSANDO MICROTASKS ===");
    while (this.#microtaskQueue.length > 0) {
      const micro = this.#microtaskQueue.shift();
      this.pushStack(micro.nome);
      micro.callback();
      this.popStack();
    }

    if (this.#macrotaskQueue.length > 0) {
      this.#log.push("\n=== PROCESSANDO 1 MACROTASK ===");
      const macro = this.#macrotaskQueue.shift();
      this.pushStack(macro.nome);
      macro.callback();
      this.popStack();

      // Processar microtasks geradas pela macrotask
      while (this.#microtaskQueue.length > 0) {
        const micro = this.#microtaskQueue.shift();
        this.pushStack(micro.nome);
        micro.callback();
        this.popStack();
      }
    }
  }

  executarTudo() {
    while (this.#macrotaskQueue.length > 0 || this.#microtaskQueue.length > 0) {
      this.executarCiclo();
    }
    return this.#log.join("\n");
  }
}

// Simular:
// console.log("1")
// setTimeout(() => console.log("2"), 0)
// Promise.resolve().then(() => console.log("3"))
// console.log("4")

const sim = new EventLoopSimulator();
sim.pushStack("script");

console.log("1");
sim.agendarMacrotask("setTimeout-cb", () => console.log("2"));
sim.agendarMicrotask("promise-then", () => console.log("3"));
console.log("4");

sim.popStack();
console.log(sim.executarTudo());
```

---

## Projeto 2: Task Scheduler com Prioridades

```javascript
class TaskScheduler {
  #microtasks = [];
  #macrotasks = [];
  #rodando = false;

  agendar(tarefa, tipo = "macro") {
    if (tipo === "micro") {
      this.#microtasks.push(tarefa);
    } else {
      this.#macrotasks.push(tarefa);
    }
    if (!this.#rodando) this.#processar();
  }

  async #processar() {
    this.#rodando = true;

    while (this.#microtasks.length > 0 || this.#macrotasks.length > 0) {
      // Microtasks primeiro (todas)
      while (this.#microtasks.length > 0) {
        const tarefa = this.#microtasks.shift();
        await tarefa();
      }

      // Uma macrotask por vez
      if (this.#macrotasks.length > 0) {
        const tarefa = this.#macrotasks.shift();
        await new Promise(resolve => {
          setTimeout(async () => {
            await tarefa();
            resolve();
          }, 0);
        });
      }
    }

    this.#rodando = false;
  }
}

const scheduler = new TaskScheduler();
scheduler.agendar(() => console.log("macro 1"));
scheduler.agendar(() => console.log("micro 1"), "micro");
scheduler.agendar(() => console.log("micro 2"), "micro");
scheduler.agendar(() => console.log("macro 2"));
```

---

## Projeto 3: Callback Hell → Promise → Async/Await

Mostre a evolucao do mesmo codigo em 3 estilos:

```javascript
// V1: Callback Hell
function buscarDadosV1(userId, callback) {
  getUser(userId, (err, user) => {
    if (err) return callback(err);
    getPosts(user.id, (err, posts) => {
      if (err) return callback(err);
      getComments(posts[0].id, (err, comments) => {
        if (err) return callback(err);
        callback(null, { user, posts, comments });
      });
    });
  });
}

// V2: Promises
function buscarDadosV2(userId) {
  let _user, _posts;
  return getUser(userId)
    .then(user => { _user = user; return getPosts(user.id); })
    .then(posts => { _posts = posts; return getComments(posts[0].id); })
    .then(comments => ({ user: _user, posts: _posts, comments }));
}

// V3: Async/Await
async function buscarDadosV3(userId) {
  const user = await getUser(userId);
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);
  return { user, posts, comments };
}
```
