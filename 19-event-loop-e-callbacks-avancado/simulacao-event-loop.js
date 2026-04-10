// ============================================================
// simulacao-event-loop.js
// Simulação comentada do Event Loop — execute e observe a ordem
// ============================================================

// ─── CENÁRIO 1: Síncrono vs Macrotask ──────────────────────

console.log("=== CENÁRIO 1: Síncrono vs setTimeout ===");

console.log("1. [CALL STACK] Síncrono — executa imediatamente");

setTimeout(() => {
  console.log("2. [MACROTASK]  setTimeout — só executa quando a stack esvazia");
}, 0);

console.log("3. [CALL STACK] Síncrono — executa antes do setTimeout(0)");

// Saída esperada:
// 1. [CALL STACK] Síncrono — executa imediatamente
// 3. [CALL STACK] Síncrono — executa antes do setTimeout(0)
// 2. [MACROTASK]  setTimeout — só executa quando a stack esvazia

console.log("");

// ─── CENÁRIO 2: Microtask vs Macrotask ─────────────────────

console.log("=== CENÁRIO 2: Promise vs setTimeout ===");

setTimeout(() => {
  console.log("4. [MACROTASK]  setTimeout — último, é macrotask");
}, 0);

Promise.resolve().then(() => {
  console.log("5. [MICROTASK]  Promise.then — microtask vem antes de macrotask");
});

console.log("6. [CALL STACK] Síncrono — sempre primeiro");

// Saída esperada:
// 6. [CALL STACK] Síncrono — sempre primeiro
// 5. [MICROTASK]  Promise.then — microtask vem antes de macrotask
// 4. [MACROTASK]  setTimeout — último, é macrotask

console.log("");

// ─── CENÁRIO 3: O exemplo clássico (A, D, C, B) ───────────

console.log("=== CENÁRIO 3: O clássico A-D-C-B ===");

console.log("A");  // PASSO 1: Call Stack → executa → imprime "A"

setTimeout(() => {
  console.log("B"); // PASSO 4: Macrotask Queue → Event Loop move para Stack → imprime "B"
}, 0);
// ↑ setTimeout(fn, 0):
//   - Call Stack encontra setTimeout
//   - Delega para Web API
//   - Web API termina (0ms)
//   - Callback vai para MACROTASK Queue
//   - Espera a stack esvaziar + microtasks drenarem

Promise.resolve().then(() => {
  console.log("C"); // PASSO 3: Microtask Queue → drena antes de macrotasks → imprime "C"
});
// ↑ Promise.resolve().then(fn):
//   - Promise resolve imediatamente
//   - Callback vai direto para MICROTASK Queue
//   - Tem prioridade sobre macrotasks

console.log("D");  // PASSO 2: Call Stack → executa → imprime "D"

// FLUXO COMPLETO:
// ┌─────────────────────────────────────────────────────┐
// │ Call Stack executa A                    → imprime A  │
// │ Call Stack encontra setTimeout          → Web API    │
// │ Call Stack encontra Promise.then        → Microtask  │
// │ Call Stack executa D                    → imprime D  │
// │ Call Stack VAZIA                                     │
// │ Event Loop: drena Microtasks            → imprime C  │
// │ Event Loop: pega 1 Macrotask            → imprime B  │
// └─────────────────────────────────────────────────────┘

// Saída: A, D, C, B

console.log("");

// ─── CENÁRIO 4: Múltiplas Microtasks e Macrotasks ──────────

console.log("=== CENÁRIO 4: Múltiplas filas ===");

setTimeout(() => console.log("7.  [MACRO 1] setTimeout primeiro"),  0);
setTimeout(() => console.log("8.  [MACRO 2] setTimeout segundo"),   0);

Promise.resolve().then(() => {
  console.log("9.  [MICRO 1] Promise primeira");
}).then(() => {
  console.log("10. [MICRO 2] Promise encadeada — também é microtask");
});

Promise.resolve().then(() => {
  console.log("11. [MICRO 3] Outra Promise — drena TODAS antes de macrotasks");
});

console.log("12. [STACK]   Síncrono — sempre primeiro de tudo");

// Saída esperada:
// 12. [STACK]   Síncrono — sempre primeiro de tudo
// 9.  [MICRO 1] Promise primeira
// 11. [MICRO 3] Outra Promise — drena TODAS antes de macrotasks
// 10. [MICRO 2] Promise encadeada — também é microtask
// 7.  [MACRO 1] setTimeout primeiro
// 8.  [MACRO 2] setTimeout segundo

// POR QUE ESSA ORDEM?
// 1. Síncrono (12) executa direto
// 2. Microtasks drenam TODAS: 9, 11 (mesma "rodada"), depois 10 (gerada pelo .then de 9)
// 3. Macrotasks executam UMA por tick: 7, depois 8

console.log("");

// ─── CENÁRIO 5: async/await é Microtask disfarçada ─────────

console.log("=== CENÁRIO 5: async/await ===");

async function exemplo() {
  console.log("13. [STACK]    Dentro do async — ANTES do await é síncrono");
  await Promise.resolve();
  // ↑ Tudo DEPOIS do await vira microtask (continuação)
  console.log("14. [MICRO]    Depois do await — virou microtask");
}

console.log("15. [STACK]    Antes de chamar async");
exemplo();
console.log("16. [STACK]    Depois de chamar async — executa ANTES do await resolver");

// Saída esperada:
// 15. [STACK]    Antes de chamar async
// 13. [STACK]    Dentro do async — ANTES do await é síncrono
// 16. [STACK]    Depois de chamar async — executa ANTES do await resolver
// 14. [MICRO]    Depois do await — virou microtask

// POR QUE?
// - "15" é síncrono
// - "13" é síncrono (antes do await)
// - await pausa a função — controle volta para quem chamou
// - "16" é síncrono (chamador continua)
// - Stack esvazia → microtask "14" executa

console.log("");

// ─── CENÁRIO 6: Microtask gerando Microtask ────────────────

console.log("=== CENÁRIO 6: Microtask gerando Microtask ===");

setTimeout(() => {
  console.log("17. [MACRO]    Eu sou macrotask — esperei todas as microtasks");
}, 0);

Promise.resolve().then(() => {
  console.log("18. [MICRO 1]  Primeira microtask");
  // ↓ Gera uma NOVA microtask DURANTE a drenagem
  queueMicrotask(() => {
    console.log("19. [MICRO 3]  Microtask gerada DENTRO de outra microtask — executa ANTES da macrotask");
  });
});

Promise.resolve().then(() => {
  console.log("20. [MICRO 2]  Segunda microtask");
});

console.log("21. [STACK]    Síncrono");

// Saída esperada:
// 21. [STACK]    Síncrono
// 18. [MICRO 1]  Primeira microtask
// 20. [MICRO 2]  Segunda microtask
// 19. [MICRO 3]  Microtask gerada DENTRO de outra microtask — executa ANTES da macrotask
// 17. [MACRO]    Eu sou macrotask — esperei todas as microtasks

// LIÇÃO: O Event Loop drena TODAS as microtasks, inclusive as geradas durante a drenagem.
// Macrotasks só executam quando a fila de microtasks está COMPLETAMENTE vazia.

console.log("");
console.log("=== FIM DA SIMULAÇÃO ===");
console.log("");
console.log("REGRA FINAL:");
console.log("  1. Call Stack (síncrono)");
console.log("  2. Microtask Queue (Promise, queueMicrotask, await)");
console.log("  3. Macrotask Queue (setTimeout, setInterval, eventos)");
console.log("");
console.log("Se você previu todas as saídas corretamente, você DOMINA o Event Loop.");
