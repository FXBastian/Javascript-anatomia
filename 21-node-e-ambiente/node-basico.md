# Node.js Basico

## O que e?

Node.js e um runtime JavaScript que executa fora do navegador. Usa o motor V8 (Chrome) + libuv (I/O assincrono cross-platform).

## Por que existe?

Antes do Node, JavaScript era limitado ao browser. Node permitiu:
- Usar JS no servidor
- Compartilhar codigo entre front e back
- I/O nao-bloqueante para alta concorrencia

## Como funciona internamente

```
┌─────────────────────────────────────┐
│           SEU CODIGO JS             │
├─────────────────────────────────────┤
│  Node.js APIs (fs, http, crypto)    │
├─────────────────────────────────────┤
│     V8 Engine    │     libuv         │
│  (compila JS)    │  (I/O assincrono) │
├─────────────────────────────────────┤
│          Sistema Operacional         │
└─────────────────────────────────────┘
```

V8 compila JavaScript para codigo de maquina. libuv gerencia operacoes de I/O usando threads do OS por baixo dos panos, mas expoe uma API assincrona com callbacks.

---

## Globals do Node

```javascript
// No browser: window, document
// No Node: global, process, __dirname, __filename, Buffer

console.log(process.version);    // v20.x.x
console.log(process.platform);   // win32, linux, darwin
console.log(process.cwd());      // diretorio atual
console.log(process.env.PATH);   // variaveis de ambiente
console.log(process.argv);       // argumentos da CLI

// Sair com codigo
// process.exit(0); // sucesso
// process.exit(1); // erro
```

---

## Modulos em Node

### CommonJS (padrao historico)

```javascript
// math.js
function somar(a, b) { return a + b; }
module.exports = { somar };

// app.js
const { somar } = require("./math");
console.log(somar(2, 3));
```

### ESM (moderno, com package.json "type": "module")

```javascript
// math.mjs
export function somar(a, b) { return a + b; }

// app.mjs
import { somar } from "./math.mjs";
console.log(somar(2, 3));
```

---

## Event Loop no Node

Node tem fases adicionais alem do browser:

```
   ┌──────────────────────────┐
┌─>│        timers             │  ← setTimeout, setInterval
│  └──────────┬───────────────┘
│  ┌──────────┴───────────────┐
│  │      pending callbacks    │  ← callbacks de I/O adiados
│  └──────────┬───────────────┘
│  ┌──────────┴───────────────┐
│  │        poll               │  ← I/O: fs, net, etc.
│  └──────────┬───────────────┘
│  ┌──────────┴───────────────┐
│  │        check              │  ← setImmediate
│  └──────────┬───────────────┘
│  ┌──────────┴───────────────┐
│  │      close callbacks      │  ← socket.on("close")
│  └──────────┬───────────────┘
└─────────────┘
```

```javascript
// process.nextTick > microtasks > macrotasks
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("promise"));

// Saida: nextTick → promise → timeout/immediate (ordem dos ultimos varia)
```

---

## Erros Comuns

- Confundir `__dirname` com `process.cwd()` (um e onde o arquivo esta, outro e de onde foi executado)
- Misturar require() e import no mesmo arquivo
- Esquecer que Node nao tem DOM, window, ou fetch nativo (ate versoes recentes)
- Nao tratar erros de I/O assincrono

## Modelo Mental

Node = V8 (JavaScript) + libuv (I/O assincrono) + APIs do sistema. Tudo que nao e JS puro (ler arquivo, HTTP, crypto) e fornecido pelo Node como modulos built-in.
