# Projetos Praticos — Contexto de Execucao

## Projeto 1: Visualizador de Call Stack

Crie um sistema que rastreia e exibe a call stack manualmente:

```javascript
const callStack = [];

function rastrear(nomeFuncao) {
  return function (fn) {
    return function (...args) {
      callStack.push(nomeFuncao);
      console.log(`PUSH: ${nomeFuncao} | Stack: [${callStack.join(" → ")}]`);
      const resultado = fn(...args);
      callStack.pop();
      console.log(`POP:  ${nomeFuncao} | Stack: [${callStack.join(" → ")}]`);
      return resultado;
    };
  };
}

const somar = rastrear("somar")((a, b) => a + b);
const dobrar = rastrear("dobrar")((x) => somar(x, x));
const processar = rastrear("processar")((x) => dobrar(x) + 1);

console.log(processar(5)); // 11
// Mostra a stack crescendo e diminuindo
```

---

## Projeto 2: Simulador de Hoisting

```javascript
function simularHoisting(codigo) {
  // Analisa (simplificadamente) quais declaracoes seriam hoisted
  const linhas = codigo.split("\n").map(l => l.trim()).filter(Boolean);
  const hoisted = { variaveis: [], funcoes: [] };
  const execucao = [];

  for (const linha of linhas) {
    if (linha.startsWith("var ")) {
      const nome = linha.match(/var\s+(\w+)/)?.[1];
      if (nome) hoisted.variaveis.push({ nome, valor: "undefined (hoisted)" });
    } else if (linha.startsWith("function ")) {
      const nome = linha.match(/function\s+(\w+)/)?.[1];
      if (nome) hoisted.funcoes.push({ nome, valor: "[Function]" });
    }
    execucao.push(linha);
  }

  console.log("=== FASE DE CRIACAO ===");
  hoisted.funcoes.forEach(f => console.log(`  ${f.nome} = ${f.valor}`));
  hoisted.variaveis.forEach(v => console.log(`  ${v.nome} = ${v.valor}`));
  console.log("\n=== FASE DE EXECUCAO ===");
  execucao.forEach(l => console.log(`  > ${l}`));
}

simularHoisting(`
var x = 10
function somar(a, b) { return a + b }
var resultado = somar(x, 20)
console.log(resultado)
`);
```

---

## Projeto 3: Scope Chain Inspector

```javascript
function criarEscopo(nome, pai = null) {
  const variaveis = {};

  return {
    nome,
    definir(chave, valor) {
      variaveis[chave] = valor;
    },
    buscar(chave) {
      if (chave in variaveis) {
        console.log(`  Encontrou "${chave}" em [${nome}]`);
        return variaveis[chave];
      }
      if (pai) {
        console.log(`  "${chave}" nao esta em [${nome}], subindo para [${pai.nome}]`);
        return pai.buscar(chave);
      }
      console.log(`  "${chave}" nao encontrado em nenhum escopo`);
      return undefined;
    },
    listar() {
      return { escopo: nome, variaveis: { ...variaveis }, pai: pai?.nome || null };
    }
  };
}

const global = criarEscopo("global");
global.definir("app", "MeuApp");
global.definir("versao", "1.0");

const funcao = criarEscopo("funcao", global);
funcao.definir("x", 10);

const bloco = criarEscopo("bloco-if", funcao);
bloco.definir("y", 20);

console.log("Buscando 'y' a partir do bloco:");
bloco.buscar("y");       // encontra no bloco
console.log("\nBuscando 'x' a partir do bloco:");
bloco.buscar("x");       // sobe para funcao
console.log("\nBuscando 'app' a partir do bloco:");
bloco.buscar("app");     // sobe ate global
console.log("\nBuscando 'z' a partir do bloco:");
bloco.buscar("z");       // nao encontra
```

**Conexao**: Essencial para entender closures (modulo 03), this (modulo 07) e hoisting.
