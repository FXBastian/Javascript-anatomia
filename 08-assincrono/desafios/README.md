# Desafios — Assincrono

## Desafio 1: Ordem de Execucao

Sem executar, preveja a ordem exata dos console.log:

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

Promise.resolve().then(() => {
  console.log("4");
  setTimeout(() => console.log("5"), 0);
});

setTimeout(() => {
  console.log("6");
  Promise.resolve().then(() => console.log("7"));
}, 0);

console.log("8");
```

---

## Desafio 2: Converter Callback para Promise

Transforme esta API baseada em callbacks para Promises:

```javascript
// API original (callback style)
function lerArquivo(nome, callback) {
  setTimeout(() => {
    if (nome === "invalido") callback(new Error("Arquivo nao encontrado"), null);
    else callback(null, `Conteudo de ${nome}`);
  }, 100);
}

// Implemente:
function lerArquivoPromise(nome) {
  // Retornar uma Promise
}

// E tambem um helper generico:
function promisify(fn) {
  // Transforma qualquer funcao callback-style em promise-style
}
```

---

## Desafio 3: Semaforo Assincrono

Implemente um semaforo que limita execucoes concorrentes:

```javascript
class Semaforo {
  constructor(limite) {
    // Implemente
  }

  async adquirir() {
    // Espera ate ter vaga
  }

  liberar() {
    // Libera uma vaga
  }
}

// Uso: no maximo 2 tarefas simultaneas
const sem = new Semaforo(2);

async function tarefa(id) {
  await sem.adquirir();
  console.log(`[${id}] iniciou`);
  await new Promise(r => setTimeout(r, 1000));
  console.log(`[${id}] terminou`);
  sem.liberar();
}

Promise.all([tarefa(1), tarefa(2), tarefa(3), tarefa(4), tarefa(5)]);
```

---

## Desafio 4: async/await vs .then

Reescreva este codigo com .then e depois com async/await. Qual e mais legivel?

```javascript
// Versao com .then
fetch("/api/usuario")
  .then(r => r.json())
  .then(usuario => fetch(`/api/posts/${usuario.id}`))
  .then(r => r.json())
  .then(posts => fetch(`/api/comentarios/${posts[0].id}`))
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);

// Reescreva com async/await:
```

---

## Desafio 5: Timeout para Qualquer Promise

```javascript
function comTimeout(promise, ms) {
  // Se a promise nao resolver em ms milissegundos, rejeitar com TimeoutError
  // Implemente aqui
}
```
