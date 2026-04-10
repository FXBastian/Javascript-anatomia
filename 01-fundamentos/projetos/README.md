# Projetos Praticos — Fundamentos

## Projeto 1: Conversor de Tipos Universal

Crie uma funcao que recebe qualquer valor e retorna um objeto com todas as conversoes possiveis:

```javascript
function analisarValor(valor) {
  return {
    original: valor,
    tipo: typeof valor,
    paraString: String(valor),
    paraNumero: Number(valor),
    paraBooleano: Boolean(valor),
    ehNaN: Number.isNaN(Number(valor)),
    ehFalsy: !valor,
    comparacaoFraca: valor == false,
    comparacaoEstrita: valor === false
  };
}

// Teste com diferentes valores
console.log(analisarValor(""));
console.log(analisarValor(0));
console.log(analisarValor(null));
console.log(analisarValor(undefined));
console.log(analisarValor(NaN));
console.log(analisarValor([]));
console.log(analisarValor("0"));
```

**Objetivo**: Entender profundamente coercao e comportamento de tipos.

---

## Projeto 2: Calculadora de Expressoes

Crie uma calculadora que:
- Recebe dois valores como strings
- Converte para numeros de forma segura
- Aplica todos os operadores aritmeticos
- Trata divisao por zero e NaN

```javascript
function calcular(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  if (Number.isNaN(numA) || Number.isNaN(numB)) {
    return { erro: "Entrada invalida" };
  }

  return {
    soma: numA + numB,
    subtracao: numA - numB,
    multiplicacao: numA * numB,
    divisao: numB !== 0 ? numA / numB : "Divisao por zero",
    resto: numB !== 0 ? numA % numB : "Divisao por zero",
    potencia: numA ** numB
  };
}

console.log(calcular("10", "3"));
console.log(calcular("abc", "5"));
console.log(calcular("10", "0"));
```

---

## Projeto 3: Detector de Tipos Completo

Crie um sistema que identifica o tipo real de qualquer valor JavaScript (incluindo null, arrays, datas, regex, etc.):

```javascript
function tipoReal(valor) {
  if (valor === null) return "null";
  if (Array.isArray(valor)) return "array";
  if (valor instanceof Date) return "date";
  if (valor instanceof RegExp) return "regexp";
  if (typeof valor === "object") return "object";
  return typeof valor;
}

// Tabela de testes
const testes = [42, "texto", true, null, undefined, NaN, [], {}, new Date(), /abc/, Symbol("s"), BigInt(10)];
testes.forEach(v => console.log(`${String(v)} → ${tipoReal(v)}`));
```

**Conexao**: Prepara para modulos 04 (estruturas), 05 (OOP) e 17 (seguranca).
