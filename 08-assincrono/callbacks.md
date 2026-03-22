# Callbacks

## Definição

Um **callback** é uma função passada como argumento para outra função, que será **chamada de volta** (called back) em algum momento — seja imediatamente (síncrono) ou no futuro (assíncrono).

Callbacks são o mecanismo **mais fundamental** de programação assíncrona em JavaScript. Tudo que veio depois (Promises, async/await) é construído sobre esse conceito.

---

## 1. Callbacks Síncronos vs Assíncronos

### Callback Síncrono

A função callback é executada **imediatamente**, dentro da execução da função que a recebe.

```javascript
// map, filter, forEach — todos usam callbacks síncronos
const nums = [1, 2, 3, 4, 5];

const dobrados = nums.map(function(n) {
  return n * 2; // executada imediatamente para cada elemento
});

console.log(dobrados); // [2, 4, 6, 8, 10]
console.log("Depois do map"); // executa DEPOIS do map terminar
```

### Callback Assíncrono

A função callback é **agendada** para executar no futuro, quando um evento ou operação terminar.

```javascript
console.log("1 - Antes");

setTimeout(function() {
  console.log("2 - Timer disparou"); // executada DEPOIS
}, 1000);

console.log("3 - Depois");

// Saída:
// 1 - Antes
// 3 - Depois
// 2 - Timer disparou    ← 1 segundo depois
```

```
FLUXO:
Linha 1 → console.log("1 - Antes")       → executa na stack ✓
Linha 3 → setTimeout(callback, 1000)      → registra timer na Web API
Linha 7 → console.log("3 - Depois")       → executa na stack ✓
         ... 1 segundo depois ...
         → callback vai para a Task Queue
         → Event Loop move para a Call Stack
         → console.log("2 - Timer disparou") ✓
```

---

## 2. Padrão Error-First Callback (Node.js)

O padrão mais usado em Node.js: o **primeiro parâmetro** do callback é sempre o erro.

```javascript
const fs = require("fs");

// Leitura assíncrona de arquivo
fs.readFile("dados.json", "utf-8", function(erro, dados) {
  if (erro) {
    console.error("Falha ao ler:", erro.message);
    return; // PARA aqui se houve erro
  }

  console.log("Conteúdo:", dados);
});

// Padrão:  callback(erro, resultado)
// Se erro === null  → operação bem-sucedida
// Se erro !== null  → algo deu errado
```

### Criando funções com error-first callback

```javascript
function dividir(a, b, callback) {
  if (b === 0) {
    callback(new Error("Divisão por zero"), null);
    return;
  }
  callback(null, a / b); // sucesso: erro = null
}

dividir(10, 2, function(erro, resultado) {
  if (erro) {
    console.error(erro.message);
    return;
  }
  console.log("Resultado:", resultado); // Resultado: 5
});

dividir(10, 0, function(erro, resultado) {
  if (erro) {
    console.error(erro.message); // "Divisão por zero"
    return;
  }
  console.log("Resultado:", resultado);
});
```

---

## 3. Callbacks no Browser

### Eventos do DOM

```javascript
const botao = document.getElementById("btn");

// O segundo argumento é um callback
botao.addEventListener("click", function(evento) {
  console.log("Botão clicado!", evento.target);
});

// O callback será chamado TODA VEZ que o botão for clicado
// Não sabemos QUANDO — é assíncrono
```

### Timers

```javascript
// setTimeout — executa UMA vez após o delay
const id1 = setTimeout(function() {
  console.log("Executou após 2 segundos");
}, 2000);

// setInterval — executa REPETIDAMENTE a cada intervalo
const id2 = setInterval(function() {
  console.log("Executa a cada 1 segundo");
}, 1000);

// Cancelar
clearTimeout(id1);
clearInterval(id2);
```

---

## 4. Callback Hell (Pirâmide da Desgraça)

O maior problema dos callbacks: quando operações dependem uma da outra, o código fica **aninhado** indefinidamente.

```javascript
// ❌ Callback Hell — operações sequenciais que dependem do resultado anterior
buscarUsuario(userId, function(erro, usuario) {
  if (erro) { handleError(erro); return; }

  buscarPedidos(usuario.id, function(erro, pedidos) {
    if (erro) { handleError(erro); return; }

    buscarDetalhesPedido(pedidos[0].id, function(erro, detalhes) {
      if (erro) { handleError(erro); return; }

      calcularFrete(detalhes.endereco, function(erro, frete) {
        if (erro) { handleError(erro); return; }

        aplicarDesconto(frete, usuario.nivel, function(erro, freteComDesconto) {
          if (erro) { handleError(erro); return; }

          console.log("Frete final:", freteComDesconto);
          // ... e se precisar de mais um passo?
        });
      });
    });
  });
});
```

### Problemas do Callback Hell

```
1. LEGIBILIDADE    → Difícil de ler e entender o fluxo
2. MANUTENÇÃO      → Difícil adicionar/remover passos
3. TRATAMENTO ERRO → Cada nível precisa tratar erro separadamente
4. DEBUGGING       → Stack traces confusos
5. INDENTAÇÃO      → Código cresce para a direita infinitamente
```

---

## 5. Amenizando o Callback Hell

### Extrair funções nomeadas

```javascript
// ✅ Melhor: callbacks nomeados e separados
function handleFrete(erro, frete) {
  if (erro) { handleError(erro); return; }
  console.log("Frete:", frete);
}

function handleDetalhes(erro, detalhes) {
  if (erro) { handleError(erro); return; }
  calcularFrete(detalhes.endereco, handleFrete);
}

function handlePedidos(erro, pedidos) {
  if (erro) { handleError(erro); return; }
  buscarDetalhesPedido(pedidos[0].id, handleDetalhes);
}

function handleUsuario(erro, usuario) {
  if (erro) { handleError(erro); return; }
  buscarPedidos(usuario.id, handlePedidos);
}

buscarUsuario(userId, handleUsuario);
```

> Ainda assim, a **solução real** para callback hell são **Promises** e **async/await**.

---

## 6. Inversão de Controle (Inversion of Control)

Um problema sutil mas importante dos callbacks: ao passar um callback, você **entrega o controle** da execução para código de terceiros.

```javascript
// Você confia que libraryFn vai:
// 1. Chamar seu callback apenas UMA vez
// 2. Passar os parâmetros corretos
// 3. Chamar em tempo hábil
// 4. Não engolir erros

libraryFn(function callback(resultado) {
  cobrarCartao(resultado.valor); // E se for chamada 3 vezes? Cobra 3x!
});
```

```
CONFIANÇA CEGA:
  Você passa o callback → "por favor, me chame quando terminar"
  Mas... e se:
    - Chamarem callback 0 vezes? (esqueceu)
    - Chamarem callback 5 vezes? (bug)
    - Chamarem com dados errados?
    - Chamarem sincronamente quando era pra ser assíncrono?

Promises resolvem isso com garantias:
    - Resolve/reject apenas UMA vez
    - Sempre assíncrono (microtask)
    - Encadeamento seguro
```

---

## 7. Callbacks na Prática Moderna

Callbacks ainda são usados em muitos cenários:

```javascript
// Event listeners — sempre callbacks
element.addEventListener("click", handleClick);

// Array methods — callbacks síncronos
array.map(transformar);
array.filter(validar);
array.reduce(acumular, inicial);

// Observadores
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log("Elemento visível!");
    }
  });
});

// requestAnimationFrame
function animar() {
  // lógica de animação
  requestAnimationFrame(animar); // callback recursivo
}
requestAnimationFrame(animar);
```

---

## 8. Resumo

```
CALLBACK = FUNÇÃO PASSADA COMO ARGUMENTO

SÍNCRONO:  Executa imediatamente (map, filter, forEach)
ASSÍNCRONO: Executa no futuro (setTimeout, eventos, I/O)

PADRÃO ERROR-FIRST:  callback(erro, resultado)
  erro === null → sucesso
  erro !== null → falha

PROBLEMAS:
  1. Callback Hell (aninhamento infinito)
  2. Inversão de controle (perda de confiança)
  3. Tratamento de erro repetitivo

SOLUÇÃO → Promises (próximo arquivo)
```

| Aspecto | Callback |
|---------|----------|
| Simplicidade | ✅ Simples de entender |
| Composição | ❌ Difícil encadear |
| Tratamento de erro | ❌ Manual em cada nível |
| Cancelamento | ❌ Não nativo |
| Legibilidade | ❌ Degrada com aninhamento |

---

> **Próximo arquivo:** [promises.md](promises.md) — A evolução dos callbacks: encadeamento limpo e garantias de execução.
