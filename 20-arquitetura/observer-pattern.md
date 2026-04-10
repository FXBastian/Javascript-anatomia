# Observer Pattern

## O que e?

O Observer Pattern define uma relacao um-para-muitos: quando um objeto muda de estado, todos os seus dependentes sao notificados automaticamente.

## Por que existe?

Sem Observer, componentes precisam verificar constantemente se algo mudou (polling). Com Observer, a comunicacao acontece por notificacao — mais eficiente e desacoplado.

## Como funciona internamente

Tres partes:
1. **Subject** (Emissor) — mantem lista de observers e notifica quando muda
2. **Observer** (Ouvinte) — registra interesse e reage a notificacoes
3. **Evento** — o sinal que dispara a comunicacao

---

## Implementacao Basica

```javascript
class EventEmitter {
  #eventos = new Map();

  on(evento, callback) {
    if (!this.#eventos.has(evento)) {
      this.#eventos.set(evento, []);
    }
    this.#eventos.get(evento).push(callback);
    return this;
  }

  off(evento, callback) {
    const handlers = this.#eventos.get(evento);
    if (!handlers) return this;
    this.#eventos.set(evento, handlers.filter(h => h !== callback));
    return this;
  }

  once(evento, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(evento, wrapper);
    };
    return this.on(evento, wrapper);
  }

  emit(evento, ...dados) {
    const handlers = this.#eventos.get(evento);
    if (!handlers) return false;
    handlers.forEach(h => h(...dados));
    return true;
  }

  listenerCount(evento) {
    return (this.#eventos.get(evento) || []).length;
  }
}
```

---

## Exemplo Real: Store Reativa

```javascript
class Store extends EventEmitter {
  #estado;

  constructor(estadoInicial) {
    super();
    this.#estado = { ...estadoInicial };
  }

  get estado() {
    return { ...this.#estado };
  }

  dispatch(acao, payload) {
    const anterior = { ...this.#estado };
    this.#estado = { ...this.#estado, ...payload };
    this.emit("mudanca", { acao, anterior, atual: this.estado });
    this.emit(`mudanca:${acao}`, { anterior, atual: this.estado });
  }
}

const store = new Store({ usuario: null, carregando: false });

store.on("mudanca", ({ acao, atual }) => {
  console.log(`[${acao}]`, atual);
});

store.on("mudanca:login", ({ atual }) => {
  console.log("Usuario logou:", atual.usuario);
});

store.dispatch("login", { usuario: "Ana", carregando: false });
store.dispatch("tema", { tema: "escuro" });
```

---

## Pub/Sub Desacoplado

```javascript
const PubSub = (() => {
  const topicos = new Map();
  let subId = 0;

  return {
    subscribe(topico, callback) {
      if (!topicos.has(topico)) topicos.set(topico, new Map());
      const id = ++subId;
      topicos.get(topico).set(id, callback);
      return () => topicos.get(topico).delete(id); // unsubscribe
    },

    publish(topico, dados) {
      const subs = topicos.get(topico);
      if (!subs) return;
      subs.forEach(callback => callback(dados));
    }
  };
})();

// Componentes completamente desacoplados:
const unsub = PubSub.subscribe("carrinho:atualizado", (items) => {
  console.log("Header atualizado:", items.length, "items");
});

PubSub.subscribe("carrinho:atualizado", (items) => {
  console.log("Badge atualizado:", items.length);
});

PubSub.publish("carrinho:atualizado", [{ id: 1, nome: "Produto" }]);
unsub(); // Header para de ouvir
```

---

## Observer Nativo no Browser

```javascript
// EventTarget — observer nativo do DOM
const canal = new EventTarget();

canal.addEventListener("mensagem", (e) => {
  console.log("Recebido:", e.detail);
});

canal.dispatchEvent(new CustomEvent("mensagem", {
  detail: { texto: "Ola!", de: "Sistema" }
}));
```

---

## Erros Comuns

1. **Memory leak**: Esquecer de remover listeners (usar `off` ou `unsubscribe`)
2. **Ordem dependente**: Codigo que assume ordem de execucao dos observers
3. **Cascade infinito**: Observer A muda estado → notifica B → B muda estado → notifica A
4. **Excesso de eventos**: Granularidade muito fina causa overhead

## Modelo Mental

Observer e como uma newsletter: voce se inscreve no topico de interesse e recebe atualizacoes quando algo muda. O emissor nao sabe nem se importa com quem esta ouvindo — ele so publica.
