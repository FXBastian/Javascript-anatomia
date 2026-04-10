# Desafios — Controle de Execucao

## Desafio 1: FizzBuzz Avancado

Implemente FizzBuzz com regras customizaveis:

```javascript
function fizzBuzz(limite, regras) {
  // regras = [{ divisor: 3, palavra: "Fizz" }, { divisor: 5, palavra: "Buzz" }]
  // Para cada numero de 1 a limite:
  // - Se divisivel por um ou mais divisores, concatenar as palavras
  // - Senao, imprimir o numero
  // Implemente aqui
}

fizzBuzz(30, [
  { divisor: 3, palavra: "Fizz" },
  { divisor: 5, palavra: "Buzz" },
  { divisor: 7, palavra: "Whizz" }
]);
```

---

## Desafio 2: Labirinto com Loops

Dado um array 2D representando um labirinto, encontre o caminho de S (start) ate E (end):

```javascript
const labirinto = [
  ["S", ".", "#", ".", "."],
  ["#", ".", "#", ".", "#"],
  [".", ".", ".", ".", "."],
  [".", "#", "#", "#", "."],
  [".", ".", ".", ".", "E"]
];
// "." = caminho livre, "#" = parede
// Use loops para varrer e encontrar um caminho valido
```

---

## Desafio 3: Controle com Labels

Pesquise sobre labels em JavaScript (`outer:`) e use para sair de loops aninhados de forma controlada:

```javascript
// Encontre o primeiro par (i, j) onde i * j === 42
// Use label para parar ambos os loops imediatamente
```

---

## Desafio 4: Switch vs Object Lookup

Reescreva este switch como um objeto de lookup e compare performance e legibilidade:

```javascript
function traduzirDia(dia) {
  switch (dia) {
    case 0: return "Domingo";
    case 1: return "Segunda";
    case 2: return "Terca";
    case 3: return "Quarta";
    case 4: return "Quinta";
    case 5: return "Sexta";
    case 6: return "Sabado";
    default: return "Invalido";
  }
}

// Versao com objeto - implemente:
function traduzirDiaObj(dia) {
  // ???
}
```

---

## Desafio 5: Loop Sem Loop

Implemente uma contagem regressiva de 10 a 0 SEM usar for, while, do-while ou recursao direta. Dica: explore `Array.from`, `reduce`, ou `setInterval`.
