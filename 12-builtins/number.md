# Number e Math

## 1. Number

### Conversão

```javascript
Number("42");       // 42
Number("3.14");     // 3.14
Number("");         // 0
Number("abc");      // NaN
Number(true);       // 1
Number(null);       // 0
Number(undefined);  // NaN

parseInt("42px");   // 42 (para no primeiro não-numérico)
parseInt("0xFF", 16); // 255
parseFloat("3.14abc"); // 3.14
```

### Verificação

```javascript
Number.isNaN(NaN);        // true
Number.isNaN("abc");      // false (não converte)
isNaN("abc");             // true  (converte! — evite)

Number.isFinite(42);      // true
Number.isFinite(Infinity); // false
Number.isInteger(42);     // true
Number.isInteger(42.0);   // true
Number.isInteger(42.5);   // false

Number.isSafeInteger(2 ** 53 - 1); // true
Number.isSafeInteger(2 ** 53);     // false — use BigInt
```

### Formatação

```javascript
const n = 3.14159;
n.toFixed(2);           // "3.14" (string!)
n.toPrecision(4);       // "3.142"

const grande = 1234567.89;
grande.toLocaleString("pt-BR"); // "1.234.567,89"

// Intl.NumberFormat (mais controle)
const fmt = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});
fmt.format(1999.90); // "R$ 1.999,90"
```

### Limites

```javascript
Number.MAX_SAFE_INTEGER;  // 9007199254740991 (2^53 - 1)
Number.MIN_SAFE_INTEGER;  // -9007199254740991
Number.MAX_VALUE;         // ~1.8e308
Number.EPSILON;           // ~2.2e-16 (menor diferença representável)

// Para inteiros maiores: BigInt
const big = 9007199254740992n; // nota o "n"
```

---

## 2. Math

```javascript
// Arredondamento
Math.round(4.5);  // 5
Math.round(4.4);  // 4
Math.ceil(4.1);   // 5 (arredonda para CIMA)
Math.floor(4.9);  // 4 (arredonda para BAIXO)
Math.trunc(4.9);  // 4 (remove decimal)

// Potência e raiz
Math.pow(2, 10);  // 1024  (ou 2 ** 10)
Math.sqrt(16);    // 4
Math.cbrt(27);    // 3

// Min/Max
Math.max(1, 5, 3);    // 5
Math.min(1, 5, 3);    // 1
Math.max(...[1,5,3]); // 5 (com spread)

// Absoluto
Math.abs(-42); // 42

// Random
Math.random();                                  // 0 a 0.999...
Math.floor(Math.random() * 10);                 // 0 a 9
Math.floor(Math.random() * (max - min + 1)) + min; // min a max

// Constantes
Math.PI;   // 3.14159...
Math.E;    // 2.71828...

// Logaritmo
Math.log(Math.E);    // 1
Math.log2(8);        // 3
Math.log10(1000);    // 3
```

---

> **Próximo arquivo:** [date.md](date.md)
