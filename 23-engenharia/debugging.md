# Debugging

## O que e?

Debugging e o processo sistematico de encontrar e corrigir defeitos no codigo. Nao e tentar coisas aleatorias ate funcionar — e investigacao metodica.

## Por que importa?

Devs gastam mais tempo debuggando do que escrevendo codigo. Dominar debugging e multiplicador de produtividade.

---

## Console Alem do console.log

```javascript
// Basico
console.log("valor:", x);

// Tabela para arrays de objetos
console.table([{ nome: "Ana", idade: 25 }, { nome: "Bia", idade: 30 }]);

// Agrupamento
console.group("Processamento");
console.log("Passo 1");
console.log("Passo 2");
console.groupEnd();

// Timer
console.time("operacao");
// ... codigo ...
console.timeEnd("operacao"); // "operacao: 15.3ms"

// Contagem
for (let i = 0; i < 100; i++) {
  if (i % 10 === 0) console.count("multiplo de 10");
}

// Condicional
console.assert(1 === 2, "Isso so aparece se falso");

// Stack trace
console.trace("Quem chamou isso?");

// Estilizado (browser)
console.log("%cATENCAO", "color: red; font-size: 20px; font-weight: bold");
```

---

## DevTools do Browser

### Breakpoints

```javascript
// Breakpoint via codigo
debugger; // Pausa execucao se DevTools estiver aberto

// No DevTools:
// - Click na linha do Sources → breakpoint
// - Conditional breakpoint: click direito → "Add conditional breakpoint"
// - Logpoint: imprime sem pausar
```

### Watch Expressions
No painel Sources → Watch, adicione expressoes para monitorar valores em tempo real.

### Call Stack
Quando pausado em um breakpoint, o painel Call Stack mostra toda a cadeia de chamadas ate o ponto atual.

### Network Tab
- Filtrar por tipo (XHR, JS, CSS)
- Ver headers, body, timing
- Throttle para simular conexao lenta

---

## Tecnicas de Debugging

### 1. Rubber Duck Debugging
Explique o problema em voz alta (para um pato de borracha, colega, ou voce mesmo). O ato de verbalizar frequentemente revela o bug.

### 2. Binary Search
Se o bug aparece em um fluxo longo, comente metade do codigo. Se o bug persiste, esta na outra metade. Repita ate isolar.

### 3. Print Tracing

```javascript
function debug(label) {
  return function (valor) {
    console.log(`[${label}]`, valor);
    return valor; // nao afeta o fluxo
  };
}

// Inserir no pipeline
const resultado = dados
  .filter(debug("apos filter"))
  .map(transformar)
  .map(debug("apos map"));
```

### 4. Diff Between Working and Broken

O codigo funcionava antes? O que mudou? Use `git diff` para encontrar a mudanca que introduziu o bug.

### 5. Reproducao Minima

Remova tudo que nao e necessario para reproduzir o bug. Quanto menor o caso, mais facil de encontrar a causa.

---

## Debugging em Node.js

```bash
# Inspecionar com Chrome DevTools
node --inspect app.js
# Abrir chrome://inspect no Chrome

# Inspecionar com pausa no inicio
node --inspect-brk app.js
```

---

## Erros Comuns de Debugging

- Assumir ao inves de verificar ("tenho certeza que essa variavel e X")
- Mudar multiplas coisas ao mesmo tempo
- Nao ler a mensagem de erro completa
- Nao verificar o stack trace
- Debuggar o lugar errado (o bug pode estar em quem chama, nao em quem executa)

## Modelo Mental

Debugging e cientifico: 1) Observar o sintoma, 2) Formar hipotese, 3) Testar a hipotese, 4) Confirmar ou refutar, 5) Repetir. Nunca mude codigo sem entender por que o bug acontece.
