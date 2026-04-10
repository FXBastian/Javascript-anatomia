# Projetos Praticos — Seguranca

## Projeto 1: Sanitizador de Input

```javascript
const Sanitizer = {
  escapeHTML(str) {
    const mapa = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return str.replace(/[&<>"']/g, (c) => mapa[c]);
  },

  escaparSQL(str) {
    // Nota: em producao, SEMPRE use prepared statements
    return str.replace(/'/g, "''").replace(/\\/g, "\\\\");
  },

  limparObjeto(obj, camposPermitidos) {
    return Object.fromEntries(
      Object.entries(obj).filter(([chave]) => camposPermitidos.includes(chave))
    );
  },

  validarTipo(valor, tipo) {
    switch (tipo) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
      case "url":
        try { new URL(valor); return true; } catch { return false; }
      case "numero":
        return !Number.isNaN(Number(valor)) && valor !== "";
      case "alfanumerico":
        return /^[a-zA-Z0-9]+$/.test(valor);
      default:
        return typeof valor === tipo;
    }
  }
};

// Uso
const inputUsuario = '<script>alert("xss")</script>';
console.log(Sanitizer.escapeHTML(inputUsuario));

const dados = { nome: "Ana", email: "a@b.c", admin: true, __proto__: {} };
console.log(Sanitizer.limparObjeto(dados, ["nome", "email"]));
```

---

## Projeto 2: Rate Limiter

```javascript
class RateLimiter {
  #janelas = new Map();

  constructor({ maxRequests = 100, janela = 60000 } = {}) {
    this.maxRequests = maxRequests;
    this.janela = janela;
  }

  permitir(identificador) {
    const agora = Date.now();
    const registro = this.#janelas.get(identificador) || { contagem: 0, inicio: agora };

    if (agora - registro.inicio > this.janela) {
      registro.contagem = 0;
      registro.inicio = agora;
    }

    registro.contagem++;
    this.#janelas.set(identificador, registro);

    const permitido = registro.contagem <= this.maxRequests;
    return {
      permitido,
      restante: Math.max(0, this.maxRequests - registro.contagem),
      resetEm: registro.inicio + this.janela - agora
    };
  }
}

const limiter = new RateLimiter({ maxRequests: 5, janela: 10000 });
for (let i = 0; i < 7; i++) {
  console.log(`Request ${i + 1}:`, limiter.permitir("user-123"));
}
```

---

## Projeto 3: Detector de Prototype Pollution

```javascript
function ehSeguro(chave) {
  const proibidas = ["__proto__", "constructor", "prototype"];
  return !proibidas.includes(chave);
}

function mergeSeguro(alvo, fonte) {
  for (const chave of Object.keys(fonte)) {
    if (!ehSeguro(chave)) {
      console.warn(`Tentativa de prototype pollution bloqueada: ${chave}`);
      continue;
    }
    if (typeof fonte[chave] === "object" && fonte[chave] !== null && !Array.isArray(fonte[chave])) {
      alvo[chave] = mergeSeguro(alvo[chave] || {}, fonte[chave]);
    } else {
      alvo[chave] = fonte[chave];
    }
  }
  return alvo;
}

// Teste: tentativa de ataque
const malicioso = JSON.parse('{"__proto__": {"admin": true}}');
const obj = {};
mergeSeguro(obj, malicioso);
console.log(({}).admin); // undefined (protegido!)
```

**Conexao**: Coercoes (modulo 17), Error Handling (modulo 16), Web APIs (modulo 14).
