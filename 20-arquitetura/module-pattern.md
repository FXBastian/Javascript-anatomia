# Module Pattern

## O que e?

O Module Pattern encapsula codigo em um escopo privado, expondo apenas uma interface publica. E um dos patterns mais fundamentais em JavaScript.

## Por que existe?

JavaScript historicamente nao tinha sistema de modulos. O Module Pattern surgiu para:
- Evitar poluicao do escopo global
- Criar variaveis e funcoes privadas
- Organizar codigo em unidades independentes

## Como funciona internamente

Baseia-se em **closures** e **IIFE** (Immediately Invoked Function Expression). A funcao cria um escopo, e o retorno define a API publica.

---

## Evolucao do Pattern

### IIFE (Classico)

```javascript
const Contador = (function () {
  // Privado
  let contagem = 0;

  // Publico
  return {
    incrementar() { return ++contagem; },
    decrementar() { return --contagem; },
    valor() { return contagem; }
  };
})();

Contador.incrementar();
Contador.incrementar();
console.log(Contador.valor()); // 2
// console.log(contagem); // ReferenceError — privado!
```

### Revealing Module Pattern

```javascript
const Validador = (function () {
  function ehEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  }

  function ehCPF(str) {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(str);
  }

  function ehTelefone(str) {
    return /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(str);
  }

  // Revela apenas o que deve ser publico
  return { ehEmail, ehCPF, ehTelefone };
})();
```

### Com Closure (Factory)

```javascript
function criarStore(estadoInicial = {}) {
  let estado = { ...estadoInicial };
  const listeners = [];

  return {
    getState() { return { ...estado }; },

    setState(parcial) {
      estado = { ...estado, ...parcial };
      listeners.forEach(fn => fn(estado));
    },

    subscribe(fn) {
      listeners.push(fn);
      return () => {
        const i = listeners.indexOf(fn);
        if (i > -1) listeners.splice(i, 1);
      };
    }
  };
}

const store = criarStore({ usuario: null, tema: "escuro" });
const unsub = store.subscribe(s => console.log("Mudou:", s));
store.setState({ usuario: "Ana" });
unsub(); // parar de ouvir
```

### Com ES6 Modules (Moderno)

```javascript
// modulo.js
let estado = { contagem: 0 };

export function incrementar() { estado.contagem++; }
export function obter() { return estado.contagem; }

// Modulos ES6 sao singletons por natureza
// Cada import compartilha a mesma instancia
```

---

## Comparacao

| Abordagem | Privacidade | Testabilidade | Uso moderno |
|-----------|------------|---------------|-------------|
| IIFE | Sim (closure) | Dificil | Legado |
| Revealing Module | Sim (closure) | Medio | Legado |
| Factory/Closure | Sim (closure) | Bom | Atual |
| ES6 Modules | Sim (escopo) | Otimo | Padrao |
| Class com # | Sim (nativo) | Otimo | Padrao |

## Erros Comuns

- Colocar tudo em um unico modulo gigante
- Nao separar responsabilidades (SRP)
- Usar IIFE quando ES6 modules estao disponiveis
- Expor internals "por conveniencia"

## Modelo Mental

Pense em modulos como caixas pretas: voce define o que entra (parametros), o que sai (API publica) e esconde como funciona por dentro. Quanto menos a caixa expoe, mais facil e de manter e trocar.
