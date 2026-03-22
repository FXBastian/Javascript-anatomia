# Import & Export (ES Modules)

## 1. Named Exports

```javascript
// math.js — exportar individualmente
export const PI = 3.14159;

export function somar(a, b) {
  return a + b;
}

export class Calculadora {
  multiplicar(a, b) {
    return a * b;
  }
}
```

```javascript
// app.js — importar pelo nome exato
import { PI, somar, Calculadora } from "./math.js";

console.log(somar(2, 3)); // 5
```

### Renomear na importação

```javascript
import { somar as add, PI as pi } from "./math.js";
console.log(add(1, 2)); // 3
```

### Exportar no final do arquivo

```javascript
// utils.js
const formatar = (v) => v.toFixed(2);
const validar = (v) => v > 0;

export { formatar, validar };

// Com renomeação
export { formatar as formatarValor };
```

---

## 2. Default Export

Cada módulo pode ter **um** default export.

```javascript
// Logger.js
export default class Logger {
  log(msg) {
    console.log(`[LOG] ${msg}`);
  }
}
```

```javascript
// Importar com qualquer nome (sem chaves)
import Logger from "./Logger.js";
import MeuLogger from "./Logger.js"; // mesmo módulo, outro nome

const log = new Logger();
log.log("teste");
```

### Named + Default juntos

```javascript
// api.js
export default function fetchData(url) { /* ... */ }
export const BASE_URL = "https://api.exemplo.com";
export const TIMEOUT = 5000;
```

```javascript
import fetchData, { BASE_URL, TIMEOUT } from "./api.js";
```

---

## 3. Re-export (Barrel Pattern)

Agrupa exports de vários módulos em um index:

```javascript
// components/Button.js
export class Button { /* ... */ }

// components/Modal.js
export class Modal { /* ... */ }

// components/index.js — barrel
export { Button } from "./Button.js";
export { Modal } from "./Modal.js";
export { default as Input } from "./Input.js";
```

```javascript
// Consumidor importa tudo de um lugar
import { Button, Modal, Input } from "./components/index.js";
```

---

## 4. Import Namespace (import *)

```javascript
import * as MathUtils from "./math.js";

console.log(MathUtils.PI);
console.log(MathUtils.somar(1, 2));
console.log(MathUtils.default); // acessa default export se houver
```

---

## 5. Dynamic Import (import())

Carrega módulos **sob demanda** — retorna uma Promise.

```javascript
// Carregar módulo apenas quando necessário
async function abrirEditor() {
  const { Editor } = await import("./Editor.js");
  const editor = new Editor();
  editor.init();
}

// Uso com interação do usuário
document.querySelector("#btn-editor").addEventListener("click", async () => {
  const modulo = await import("./Editor.js");
  modulo.default.iniciar(); // acessar default export
});
```

### Code Splitting

Bundlers (Webpack, Vite) usam `import()` para dividir o código em chunks:

```javascript
// Cada rota carrega seu módulo apenas quando acessada
const rotas = {
  "/home": () => import("./pages/Home.js"),
  "/sobre": () => import("./pages/Sobre.js"),
};
```

---

## 6. No HTML

```html
<!-- type="module" ativa ES Modules no browser -->
<script type="module" src="app.js"></script>

<!-- Módulos são defer por padrão e strict mode -->
<!-- Cada módulo tem seu próprio escopo (não polui global) -->
```

---

## Comparação CommonJS vs ES Modules

| Aspecto        | CommonJS (`require`)      | ES Modules (`import`)       |
|:--------------:|:-------------------------:|:---------------------------:|
| Sintaxe        | `require()` / `module.exports` | `import` / `export`    |
| Carregamento   | Síncrono                  | Assíncrono (estático)       |
| Tree shaking   | Não                       | Sim                         |
| Browser        | Não nativo                | Nativo (`type="module"`)    |
| Node.js        | Padrão histórico          | Suportado (.mjs ou config)  |
| Top-level await| Não                       | Sim                         |

---

> **Próximo módulo:** [16-erros](../16-erros/README.md)
