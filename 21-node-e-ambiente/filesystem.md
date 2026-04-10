# Filesystem (fs)

## O que e?

O modulo `fs` do Node da acesso ao sistema de arquivos: ler, escrever, criar, deletar, listar arquivos e diretorios.

## Como funciona internamente

Operacoes de arquivo sao delegadas ao libuv, que usa thread pool do OS para nao bloquear o event loop. A versao sincrona (`readFileSync`) bloqueia a thread principal — evite em servidores.

---

## Leitura de Arquivos

```javascript
const fs = require("fs");
const path = require("path");

// Assincrono com callback
fs.readFile("./dados.txt", "utf-8", (err, conteudo) => {
  if (err) { console.error(err); return; }
  console.log(conteudo);
});

// Assincrono com promises (recomendado)
const fsp = require("fs/promises");

async function lerArquivo() {
  try {
    const conteudo = await fsp.readFile("./dados.txt", "utf-8");
    console.log(conteudo);
  } catch (err) {
    console.error("Arquivo nao encontrado:", err.message);
  }
}

// Sincrono (bloqueia! usar apenas em scripts/CLI)
const conteudo = fs.readFileSync("./dados.txt", "utf-8");
```

---

## Escrita de Arquivos

```javascript
const fsp = require("fs/promises");

// Escrever (sobrescreve)
await fsp.writeFile("./saida.txt", "Conteudo novo", "utf-8");

// Adicionar ao final
await fsp.appendFile("./log.txt", `${new Date().toISOString()} Evento\n`);

// Escrever JSON
const dados = { usuarios: [{ nome: "Ana" }] };
await fsp.writeFile("./dados.json", JSON.stringify(dados, null, 2));
```

---

## Diretorios

```javascript
const fsp = require("fs/promises");
const path = require("path");

// Criar diretorio (recursivo)
await fsp.mkdir("./pasta/sub/profunda", { recursive: true });

// Listar conteudo
const arquivos = await fsp.readdir("./src");
console.log(arquivos);

// Listar com detalhes
const entradas = await fsp.readdir("./src", { withFileTypes: true });
for (const entrada of entradas) {
  console.log(`${entrada.isDirectory() ? "DIR " : "FILE"} ${entrada.name}`);
}

// Verificar existencia
const existe = await fsp.access("./arquivo.txt").then(() => true).catch(() => false);
```

---

## Path (caminhos)

```javascript
const path = require("path");

path.join("pasta", "sub", "arquivo.txt");    // pasta/sub/arquivo.txt
path.resolve("relativo", "arquivo.txt");     // /caminho/absoluto/relativo/arquivo.txt
path.basename("/home/user/foto.png");        // foto.png
path.extname("documento.pdf");               // .pdf
path.dirname("/home/user/foto.png");         // /home/user
path.parse("/home/user/foto.png");
// { root: "/", dir: "/home/user", base: "foto.png", ext: ".png", name: "foto" }
```

---

## Streams (grandes arquivos)

```javascript
const fs = require("fs");

// Para arquivos grandes, streams evitam carregar tudo na memoria
const leitura = fs.createReadStream("./grande.csv", "utf-8");
const escrita = fs.createWriteStream("./saida.csv");

leitura.on("data", (chunk) => {
  // Processar chunk por chunk
  const processado = chunk.toUpperCase();
  escrita.write(processado);
});

leitura.on("end", () => {
  escrita.end();
  console.log("Processamento concluido");
});

// Pipe: atalho para ler → transformar → escrever
// leitura.pipe(transformador).pipe(escrita);
```

---

## Erros Comuns

- Usar caminhos relativos sem `path.join`/`path.resolve`
- Esquecer encoding `"utf-8"` (retorna Buffer ao inves de string)
- Usar sync em servidores (bloqueia todas as requests)
- Nao criar diretorios antes de escrever (`{ recursive: true }`)
- Path traversal: nunca concatenar input do usuario no caminho sem validar

## Modelo Mental

Pense em arquivos como streams: dados que fluem de uma origem para um destino. Para arquivos pequenos, `readFile`/`writeFile` bastam. Para grandes volumes, use streams para processar pedaco por pedaco sem estourar memoria.
