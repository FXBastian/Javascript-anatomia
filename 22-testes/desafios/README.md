# Desafios — Testes

## Desafio 1: Tornar Testavel

Este codigo e impossivel de testar unitariamente. Refatore para tornar testavel:

```javascript
function processarPedido(pedidoId) {
  const pedido = fetch(`/api/pedidos/${pedidoId}`).then(r => r.json());
  const agora = new Date();
  if (agora.getHours() < 8) throw new Error("Fora do horario");
  localStorage.setItem("ultimoPedido", pedidoId);
  console.log("Processado:", pedido);
  return pedido;
}
```

---

## Desafio 2: Test Coverage

Para esta funcao, escreva testes que alcancem 100% de branch coverage:

```javascript
function classificar(nota) {
  if (nota < 0 || nota > 100) return "invalida";
  if (nota >= 90) return "A";
  if (nota >= 80) return "B";
  if (nota >= 70) return "C";
  if (nota >= 60) return "D";
  return "F";
}
```

---

## Desafio 3: Testar Codigo Assincrono

Como testar funcoes async? Demonstre 3 abordagens:
1. Com callback
2. Com Promise
3. Com async/await

---

## Desafio 4: Testar Timer

Como testar uma funcao que usa setTimeout/setInterval sem esperar o tempo real?

```javascript
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
// Escreva testes para debounce
```

---

## Desafio 5: Mutation Testing

O que e Mutation Testing e por que coverage sozinha nao e suficiente?

```javascript
// Este teste passa mas nao testa nada util:
function somar(a, b) { return a + b; }
teste("somar funciona", () => {
  somar(1, 2); // sem assert!
});
// Como Mutation Testing detectaria o problema?
```
