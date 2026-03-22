# Controle de Fluxo — `break`, `continue`, `return` e Labels

## Definição

As instruções de **controle de fluxo** permitem alterar a ordem normal de execução dentro de loops e funções. Elas permitem **sair de um loop**, **pular para a próxima iteração** ou **encerrar uma função** antecipadamente.

```
Fluxo normal:     →  →  →  →  →  →  →  FIM

Com break:        →  →  →  ✖  FIM (sai do loop)

Com continue:     →  →  ↻  →  →  →  FIM (pula uma iteração)

Com return:       →  →  ←  (sai da função inteira)
```

---

## 1. `break` — Sair do Loop

### O que faz

Encerra **imediatamente** o loop mais interno onde está contido. A execução continua na instrução seguinte ao loop.

### Exemplo básico

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // sai no 5
  }
  console.log(i);
}
// Saída: 0, 1, 2, 3, 4
// O 5 NÃO aparece porque break sai ANTES do console.log
```

### Caso de uso real: busca em lista

```javascript
const usuarios = [
  { id: 1, nome: "Ana" },
  { id: 2, nome: "Carlos" },
  { id: 3, nome: "Felix" },
  { id: 4, nome: "Diana" }
];

let encontrado = null;

for (const user of usuarios) {
  if (user.id === 3) {
    encontrado = user;
    break; // não precisa continuar — já achou
  }
}

console.log(encontrado); // { id: 3, nome: "Felix" }

// Alternativa moderna com Array.find():
const encontrado2 = usuarios.find(u => u.id === 3);
```

### `break` no `while`

```javascript
let entrada;
while (true) { // loop "infinito" controlado por break
  entrada = prompt("Digite 'sair' para encerrar:");
  if (entrada === "sair") {
    break;
  }
  console.log(`Você digitou: ${entrada}`);
}
console.log("Programa encerrado");
```

### `break` no `switch`

```javascript
// Sem break, o switch "cai" para o próximo case (fall-through)
let cor = "verde";

switch (cor) {
  case "vermelho":
    console.log("Pare");
    break; // ← essencial
  case "amarelo":
    console.log("Atenção");
    break;
  case "verde":
    console.log("Siga");
    break;
  default:
    console.log("Cor desconhecida");
}
```

---

## 2. `continue` — Pular para a Próxima Iteração

### O que faz

Pula o **restante** do corpo do loop na iteração atual e vai direto para a **próxima iteração**.

### Exemplo básico

```javascript
for (let i = 0; i < 6; i++) {
  if (i === 3) {
    continue; // pula o 3
  }
  console.log(i);
}
// Saída: 0, 1, 2, 4, 5
// O 3 não aparece — foi pulado
```

### Diferença visual: break vs continue

```javascript
// BREAK — para tudo no 3
for (let i = 0; i < 6; i++) {
  if (i === 3) break;
  console.log(i);
}
// Saída: 0, 1, 2

// CONTINUE — pula só o 3
for (let i = 0; i < 6; i++) {
  if (i === 3) continue;
  console.log(i);
}
// Saída: 0, 1, 2, 4, 5
```

### Caso de uso real: filtrar durante processamento

```javascript
const pedidos = [
  { id: 1, valor: 150, cancelado: false },
  { id: 2, valor: 80, cancelado: true },
  { id: 3, valor: 200, cancelado: false },
  { id: 4, valor: 50, cancelado: true },
  { id: 5, valor: 300, cancelado: false }
];

let totalAtivos = 0;

for (const pedido of pedidos) {
  if (pedido.cancelado) {
    continue; // ignora pedidos cancelados
  }
  totalAtivos += pedido.valor;
}

console.log(`Total de pedidos ativos: R$ ${totalAtivos}`); // R$ 650
```

### `continue` no `while` — CUIDADO!

```javascript
// ❌ PERIGO: continue pula o incremento → loop infinito
let i = 0;
while (i < 10) {
  if (i === 5) {
    continue; // NUNCA incrementa i quando i é 5 → loop infinito!
  }
  console.log(i);
  i++;
}

// ✅ Correto: incrementar ANTES do continue
let j = 0;
while (j < 10) {
  j++;
  if (j === 5) {
    continue; // ok — j já foi incrementado
  }
  console.log(j); // 1, 2, 3, 4, 6, 7, 8, 9, 10
}
```

---

## 3. `return` — Sair da Função

### O que faz

Encerra a execução da função **inteira** e opcionalmente retorna um valor. Qualquer código após o `return` não é executado.

### Exemplo básico

```javascript
function dividir(a, b) {
  if (b === 0) {
    return "Divisão por zero"; // sai da função aqui
  }
  return a / b; // só executa se b ≠ 0
}

console.log(dividir(10, 2));  // 5
console.log(dividir(10, 0));  // "Divisão por zero"
```

### Return sem valor

```javascript
function saudar(nome) {
  if (!nome) {
    return; // retorna undefined implicitamente
  }
  console.log(`Olá, ${nome}!`);
}

saudar("Felix"); // "Olá, Felix!"
saudar("");      // (nada — retornou antes do console.log)
```

### Early return — padrão profissional

```javascript
// ❌ Sem early return — aninhamento excessivo
function processar(dados) {
  if (dados) {
    if (dados.length > 0) {
      if (dados[0].valido) {
        // finalmente o código principal
        return dados[0].valor * 2;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}

// ✅ Com early return — limpo e legível
function processar(dados) {
  if (!dados) return null;
  if (dados.length === 0) return null;
  if (!dados[0].valido) return null;

  return dados[0].valor * 2;
}
```

### `return` dentro de loops

```javascript
function encontrar(array, alvo) {
  for (const item of array) {
    if (item === alvo) {
      return item; // sai do LOOP e da FUNÇÃO inteira
    }
  }
  return null; // só chega aqui se não encontrar
}

console.log(encontrar([10, 20, 30], 20)); // 20
console.log(encontrar([10, 20, 30], 99)); // null
```

> **Nota:** `return` sai da **função**, não apenas do loop. `break` sai apenas do **loop**.

---

## 4. Labels (Rótulos) — Controle de Loops Aninhados

### O que são

Labels são identificadores que nomeiam um loop. Permitem que `break` e `continue` afetem loops **específicos** em estruturas aninhadas.

### Sintaxe

```javascript
nomeDoLoop: for (...) {
  for (...) {
    break nomeDoLoop;    // sai do loop EXTERNO
    continue nomeDoLoop; // vai para a próxima iteração do loop EXTERNO
  }
}
```

### Problema: `break` sem label

```javascript
// break normal só sai do loop INTERNO
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) {
      break; // sai do loop de j, mas i continua
    }
    console.log(`i=${i}, j=${j}`);
  }
}
// i=0, j=0
// i=1, j=0
// i=2, j=0
// O loop externo continua rodando!
```

### Solução: `break` com label

```javascript
externo: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) {
      break externo; // sai do loop EXTERNO inteiro
    }
    console.log(`i=${i}, j=${j}`);
  }
}
// i=0, j=0
// Para completamente — saiu do loop externo
```

### `continue` com label

```javascript
externo: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) {
      continue externo; // pula para a próxima iteração de i
    }
    console.log(`i=${i}, j=${j}`);
  }
}
// i=0, j=0
// i=1, j=0
// i=2, j=0
// Cada vez que j chega a 1, pula para o próximo i
```

### Caso de uso real: busca em matriz com saída antecipada

```javascript
const tabuleiro = [
  [".", ".", "."],
  [".", "X", "."],
  [".", ".", "."]
];

let posicao = null;

busca: for (let linha = 0; linha < tabuleiro.length; linha++) {
  for (let col = 0; col < tabuleiro[linha].length; col++) {
    if (tabuleiro[linha][col] === "X") {
      posicao = { linha, col };
      break busca; // sai dos dois loops de uma vez
    }
  }
}

console.log(posicao); // { linha: 1, col: 1 }
```

> **Nota:** Labels são raramente usados na prática. Na maioria dos casos, extrair o loop para uma função com `return` é mais legível.

---

## 5. `throw` — Lançar Exceção (Visão Geral)

`throw` interrompe o fluxo normal e lança um erro que pode ser capturado por `try/catch`.

```javascript
function sacar(saldo, valor) {
  if (valor > saldo) {
    throw new Error("Saldo insuficiente");
  }
  return saldo - valor;
}

try {
  let novoSaldo = sacar(100, 200);
} catch (erro) {
  console.log(erro.message); // "Saldo insuficiente"
}
```

> **Aprofundamento completo:** Módulo 16 (Tratamento de Erros).

---

## 6. Tabela Comparativa

| Instrução | Escopo de ação | O que faz |
|-----------|---------------|-----------|
| `break` | Loop / switch | Sai do loop mais interno (ou do nomeado) |
| `continue` | Loop | Pula para a próxima iteração |
| `return` | Função | Sai da função inteira e retorna valor |
| `break label` | Loop nomeado | Sai do loop específico |
| `continue label` | Loop nomeado | Pula iteração do loop específico |
| `throw` | Qualquer lugar | Lança exceção (capturada por try/catch) |

---

## 7. Boas Práticas

### Use `break` quando encontrar o que procura

```javascript
// ✅ Não processe mais do que o necessário
for (const item of lista) {
  if (item.id === alvo) {
    resultado = item;
    break;
  }
}
```

### Prefira métodos de array quando possível

```javascript
// Em vez de for + continue para filtrar:
const ativos = usuarios.filter(u => u.ativo);

// Em vez de for + break para encontrar:
const admin = usuarios.find(u => u.role === "admin");

// Em vez de for + acumulador:
const total = pedidos.reduce((acc, p) => acc + p.valor, 0);
```

### Extraia loops complexos em funções (em vez de labels)

```javascript
// ❌ Label (funciona, mas menos legível em código complexo)
externo: for (...) {
  for (...) {
    if (cond) break externo;
  }
}

// ✅ Função com return (mais idiomático)
function buscarNaMatriz(matriz, alvo) {
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      if (matriz[i][j] === alvo) {
        return { i, j };
      }
    }
  }
  return null;
}
```

---

## 8. Erros Comuns

### `break`/`continue` fora de loop

```javascript
// ❌ SyntaxError — não está dentro de loop
if (true) {
  break; // Illegal break statement
}
```

### `return` fora de função

```javascript
// ❌ SyntaxError (no nível top-level de um script)
return 42; // Illegal return statement

// ✅ Em módulos ES6, o top-level é um módulo, mas return ainda não funciona
// Use process.exit() em Node.js se precisa sair do programa
```

### `continue` no `while` causando loop infinito

```javascript
// ❌ Já mostrado acima — incremento depois do continue
let i = 0;
while (i < 10) {
  if (i === 5) continue; // i nunca passa de 5!
  i++;
}
```

---

## Resumo

```
DENTRO DE UM LOOP:
  break     → sai do loop
  continue  → pula para a próxima iteração

DENTRO DE UMA FUNÇÃO:
  return    → sai da função (e de qualquer loop dentro dela)

LOOPS ANINHADOS:
  break label    → sai do loop nomeado
  continue label → pula iteração do loop nomeado

QUALQUER LUGAR:
  throw     → lança exceção
```

---

> **Próximo módulo:** [03-funcoes](../03-funcoes/README.md) — O coração do JavaScript: funções em profundidade.
