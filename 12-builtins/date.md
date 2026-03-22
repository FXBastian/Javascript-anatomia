# Date

## Criação

```javascript
// Agora
const agora = new Date();

// Data específica (mês é 0-indexed! Janeiro = 0)
const natal = new Date(2026, 11, 25);   // 25/12/2026
const data = new Date(2026, 2, 22, 14, 30, 0); // 22/03/2026 14:30:00

// A partir de string ISO
const iso = new Date("2026-03-22T14:30:00");

// Timestamp (milissegundos desde 01/01/1970)
const ts = new Date(1679500800000);

// Timestamp atual
const now = Date.now(); // número, sem criar objeto
```

---

## Métodos Get

```javascript
const d = new Date(2026, 2, 22, 14, 30, 45);

d.getFullYear();  // 2026
d.getMonth();     // 2 (março — 0-indexed!)
d.getDate();      // 22 (dia do mês)
d.getDay();       // 0 (domingo) a 6 (sábado)
d.getHours();     // 14
d.getMinutes();   // 30
d.getSeconds();   // 45
d.getTime();      // timestamp em ms
```

---

## Métodos Set

```javascript
const d = new Date();

d.setFullYear(2030);
d.setMonth(0);        // Janeiro
d.setDate(15);
d.setHours(10, 0, 0); // 10:00:00
```

---

## Formatação

```javascript
const d = new Date(2026, 2, 22);

d.toLocaleDateString("pt-BR"); // "22/03/2026"
d.toLocaleTimeString("pt-BR"); // "00:00:00"
d.toLocaleString("pt-BR");     // "22/03/2026 00:00:00"
d.toISOString();                // "2026-03-22T03:00:00.000Z"

// Intl.DateTimeFormat (mais controle)
const fmt = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});
fmt.format(d); // "domingo, 22 de março de 2026"
```

---

## Cálculos com Datas

```javascript
// Diferença em dias
const d1 = new Date("2026-03-01");
const d2 = new Date("2026-03-22");
const diffMs = d2 - d1; // subtração retorna ms
const diffDias = diffMs / (1000 * 60 * 60 * 24); // 21

// Adicionar dias
function adicionarDias(data, dias) {
  const nova = new Date(data);
  nova.setDate(nova.getDate() + dias);
  return nova;
}

const amanha = adicionarDias(new Date(), 1);
```

---

## Armadilhas

```javascript
// ❌ Mês é 0-indexed!
new Date(2026, 3, 22);  // 22 de ABRIL, não março!
new Date(2026, 2, 22);  // 22 de março ✅

// ❌ new Date("03/22/2026") — formato americano, ambíguo
// ✅ new Date("2026-03-22") — ISO 8601, sem ambiguidade

// Dica: para projetos reais, considere bibliotecas como date-fns ou Temporal API (futuro)
```

---

> **Próximo arquivo:** [json.md](json.md)
