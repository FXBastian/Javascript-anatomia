# HTTP Server

## O que e?

O modulo `http` do Node permite criar servidores web sem frameworks. Entender isso e fundamental antes de usar Express, Fastify, etc.

## Como funciona internamente

O servidor escuta conexoes TCP em uma porta. Para cada request HTTP, Node cria objetos `IncomingMessage` (req) e `ServerResponse` (res) e chama seu callback.

---

## Servidor Basico

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World");
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
```

---

## Roteador Manual

```javascript
const http = require("http");

const rotas = {
  "GET /": (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ mensagem: "API funcionando" }));
  },

  "GET /usuarios": (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify([{ id: 1, nome: "Ana" }]));
  },

  "POST /usuarios": async (req, res) => {
    const body = await lerBody(req);
    const usuario = JSON.parse(body);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ id: Date.now(), ...usuario }));
  }
};

function lerBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", chunk => data += chunk);
    req.on("end", () => resolve(data));
  });
}

const server = http.createServer((req, res) => {
  const chave = `${req.method} ${req.url}`;
  const handler = rotas[chave];

  if (handler) {
    handler(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ erro: "Rota nao encontrada" }));
  }
});

server.listen(3000, () => console.log("API em http://localhost:3000"));
```

---

## Middleware Manual

```javascript
function logger(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
}

function cors(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
}

function criarApp(...middlewares) {
  return http.createServer((req, res) => {
    let i = 0;
    function next() {
      if (i < middlewares.length) {
        middlewares[i++](req, res, next);
      }
    }
    next();
  });
}

const app = criarApp(logger, cors, (req, res) => {
  res.writeHead(200);
  res.end("OK");
});

app.listen(3000);
```

---

## Erros Comuns

- Esquecer de chamar `res.end()` — request fica pendente
- Nao parsear Content-Type corretamente
- Nao tratar erros no body (JSON invalido)
- Servir arquivos estaticos sem sanitizar o path (path traversal)

## Modelo Mental

Um servidor HTTP e um loop infinito que espera conexoes. Cada request e um evento processado pelo event loop. `req` e um stream de leitura (entrada), `res` e um stream de escrita (saida).
