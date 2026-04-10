# Projetos Praticos — Node.js

## Projeto 1: CLI Todo App

```javascript
const fs = require("fs/promises");
const path = require("path");

const ARQUIVO = path.join(__dirname, "todos.json");

async function carregarTodos() {
  try {
    const data = await fs.readFile(ARQUIVO, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function salvarTodos(todos) {
  await fs.writeFile(ARQUIVO, JSON.stringify(todos, null, 2));
}

async function main() {
  const [,, comando, ...args] = process.argv;
  const todos = await carregarTodos();

  switch (comando) {
    case "add": {
      const texto = args.join(" ");
      todos.push({ id: Date.now(), texto, feito: false });
      await salvarTodos(todos);
      console.log(`Adicionado: "${texto}"`);
      break;
    }
    case "list": {
      if (todos.length === 0) { console.log("Nenhuma tarefa"); break; }
      todos.forEach((t, i) => {
        console.log(`${i + 1}. [${t.feito ? "x" : " "}] ${t.texto}`);
      });
      break;
    }
    case "done": {
      const indice = parseInt(args[0]) - 1;
      if (todos[indice]) {
        todos[indice].feito = true;
        await salvarTodos(todos);
        console.log(`Concluido: "${todos[indice].texto}"`);
      }
      break;
    }
    case "remove": {
      const i = parseInt(args[0]) - 1;
      if (todos[i]) {
        const [removido] = todos.splice(i, 1);
        await salvarTodos(todos);
        console.log(`Removido: "${removido.texto}"`);
      }
      break;
    }
    default:
      console.log("Uso: node todo.js [add|list|done|remove] [args]");
  }
}

main();
```

---

## Projeto 2: File Watcher

```javascript
const fs = require("fs");
const path = require("path");

function watchDir(dir, callback) {
  console.log(`Observando: ${dir}`);

  fs.watch(dir, { recursive: true }, (eventType, filename) => {
    if (!filename) return;
    const filepath = path.join(dir, filename);
    callback({ tipo: eventType, arquivo: filename, caminho: filepath });
  });
}

watchDir("./src", (evento) => {
  console.log(`[${evento.tipo}] ${evento.arquivo}`);
});
```

---

## Projeto 3: Servidor de Arquivos Estaticos

```javascript
const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const ROOT = path.resolve("./public");

const server = http.createServer(async (req, res) => {
  const url = req.url === "/" ? "/index.html" : req.url;
  const filepath = path.join(ROOT, url);

  // Seguranca: prevenir path traversal
  if (!filepath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Acesso negado");
  }

  try {
    const conteudo = await fs.readFile(filepath);
    const ext = path.extname(filepath);
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    res.end(conteudo);
  } catch {
    res.writeHead(404);
    res.end("Arquivo nao encontrado");
  }
});

server.listen(3000, () => console.log("http://localhost:3000"));
```
