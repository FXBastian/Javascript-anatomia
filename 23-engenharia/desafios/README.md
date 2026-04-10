# Desafios — Engenharia

## Desafio 1: Encontre o Bug (Basico)

Encontre e corrija o bug sem alterar a interface publica:

```javascript
function contarFrequencia(arr) {
  const freq = {};
  for (const item of arr) {
    freq[item]++;
  }
  return freq;
}

console.log(contarFrequencia(["a", "b", "a", "c", "b", "a"]));
// Esperado: { a: 3, b: 2, c: 1 }
// Resultado: { a: NaN, b: NaN, c: NaN }
```

---

## Desafio 2: Memory Leak (Intermediario)

Identifique o vazamento de memoria e corrija:

```javascript
class EventBus {
  #handlers = {};

  on(evento, handler) {
    if (!this.#handlers[evento]) this.#handlers[evento] = [];
    this.#handlers[evento].push(handler);
  }

  emit(evento, ...args) {
    (this.#handlers[evento] || []).forEach(fn => fn(...args));
  }
}

const bus = new EventBus();

function criarWidget(id) {
  const dados = new Array(10000).fill(`dados-${id}`);

  bus.on("atualizar", () => {
    console.log(`Widget ${id}: ${dados.length} itens`);
  });

  return { id };
}

// Simula criar e destruir widgets repetidamente
for (let i = 0; i < 1000; i++) {
  const widget = criarWidget(i);
  // widget "destruido" mas...
}

// Objetivo:
// 1. Explique por que ha vazamento
// 2. Adicione um metodo off() ao EventBus
// 3. Crie um metodo destroy() para o widget
// 4. Garanta que handlers sao removidos ao destruir
```

---

## Desafio 3: Profiling Manual (Intermediario)

Implemente um decorator `@medir` que registra tempo de execucao:

```javascript
function medir(target, nome, descriptor) {
  // Implemente: deve logar tempo de execucao de metodos sync e async
}

class Servico {
  @medir
  calcular(n) {
    let s = 0;
    for (let i = 0; i < n; i++) s += Math.sqrt(i);
    return s;
  }

  @medir
  async buscar(url) {
    const res = await fetch(url);
    return res.json();
  }
}

// Bonus: Versao sem decorators (funcao wrapper)
function medirFuncao(fn, nome) {
  // Retorna uma funcao que faz o mesmo mas loga o tempo
}
```

---

## Desafio 4: Refatoracao Guiada (Avancado)

Refatore este codigo step-by-step (escreva teste antes de cada mudanca):

```javascript
function proc(users, type) {
  var res = [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].active == true) {
      if (type == "email") {
        res.push(users[i].name + " <" + users[i].email + ">");
      } else if (type == "csv") {
        res.push(users[i].name + "," + users[i].email + "," + users[i].role);
      } else if (type == "json") {
        res.push(JSON.stringify({n: users[i].name, e: users[i].email}));
      }
    }
  }
  if (type == "csv") {
    res.unshift("name,email,role");
  }
  return res.join("\n");
}

// Passos:
// 1. Escreva testes para os 3 tipos
// 2. Renomeie variaveis
// 3. Extraia filtro de ativos
// 4. Extraia formatadores (um por tipo) usando Strategy Pattern
// 5. Adicione validacao de tipo
// 6. Verifique testes a cada passo
```

---

## Desafio 5: Build Your Own Debugger (Avancado)

Crie um mini-debugger que rastreia execucao de funcoes:

```javascript
function criarDebugger() {
  // Implemente:
  // .rastrear(obj) - Envolve todos os metodos de um objeto
  // .pausar(condicao) - Define um breakpoint condicional
  // .historico() - Retorna array de chamadas [{metodo, args, resultado, tempo}]
  // .snapshot() - Retorna estado atual de objetos rastreados
  // .restaurar(indice) - Restaura estado de um snapshot anterior (bonus)
}

// Uso esperado:
const dbg = criarDebugger();

const calc = {
  valor: 0,
  somar(n) { this.valor += n; return this; },
  multiplicar(n) { this.valor *= n; return this; },
  resultado() { return this.valor; }
};

dbg.rastrear(calc);
dbg.pausar((info) => info.metodo === "multiplicar" && info.args[0] > 10);

calc.somar(5).multiplicar(3).somar(2).multiplicar(20);
// Deve pausar (logar) quando multiplicar(20) for chamado

console.log(dbg.historico());
// [{metodo: "somar", args: [5], resultado: calc, tempo: 0.01}, ...]
```
