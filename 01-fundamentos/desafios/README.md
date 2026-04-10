# Desafios — Fundamentos

## Desafio 1: Tabela de Coercao
Sem executar, preveja o resultado de cada expressao. Depois confira no console.

```javascript
// Nivel 1 - Basico
"5" + 3          // ?
"5" - 3          // ?
true + 1         // ?
false + "1"      // ?
null + 1         // ?

// Nivel 2 - Intermediario
"" == false      // ?
0 == ""          // ?
null == undefined // ?
NaN == NaN       // ?
[] == false      // ?

// Nivel 3 - Avancado
[] + []          // ?
[] + {}          // ?
{} + []          // ?
"" + {}          // ?
true + true + "3" // ?
```

---

## Desafio 2: const Nao Significa Imutavel

Explique por que isso funciona:

```javascript
const pessoa = { nome: "Ana" };
pessoa.nome = "Carlos"; // Funciona! Por que?

const lista = [1, 2, 3];
lista.push(4); // Funciona! Por que?

// Mas isso nao funciona:
// pessoa = { nome: "Outro" }; // TypeError
```

**Tarefa**: Escreva uma funcao `congelar` que torna um objeto realmente imutavel (dica: `Object.freeze`).

---

## Desafio 3: Typeof Armadilhas

Crie uma funcao `ehRealmente(valor, tipo)` que corrige as falhas do `typeof`:

```javascript
// typeof null === "object" (errado!)
// typeof [] === "object" (impreciso!)
// typeof NaN === "number" (confuso!)

function ehRealmente(valor, tipo) {
  // Implemente aqui
  // ehRealmente(null, "null") → true
  // ehRealmente([], "array") → true
  // ehRealmente(NaN, "nan") → true
  // ehRealmente(42, "number") → true
  // ehRealmente("abc", "string") → true
}
```

---

## Desafio 4: Swap Sem Variavel Temporaria

Troque o valor de duas variaveis sem usar uma terceira variavel. Encontre pelo menos 3 formas diferentes:

```javascript
let a = 10;
let b = 20;

// Forma 1: Destructuring
// Forma 2: Operacoes aritmeticas
// Forma 3: XOR bitwise (so funciona com inteiros)
```

---

## Desafio 5: Precisao de Ponto Flutuante

```javascript
console.log(0.1 + 0.2 === 0.3); // false!
```

**Tarefa**: Crie uma funcao `iguais(a, b, precisao)` que compara numeros float de forma segura. Pesquise sobre `Number.EPSILON`.
