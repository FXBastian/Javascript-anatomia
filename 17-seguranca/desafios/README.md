# Desafios — Seguranca

## Desafio 1: Detectar e Prevenir XSS

Identifique todos os vetores de XSS neste codigo e corrija:

```javascript
const nome = new URLSearchParams(location.search).get("nome");
document.getElementById("saudacao").innerHTML = `Ola, ${nome}!`;

document.querySelector("a").href = `javascript:alert(1)`;

const div = document.createElement("div");
div.innerHTML = dadosDoServidor.descricao;
```

---

## Desafio 2: Comparacoes Perigosas

Explique por que cada comparacao e perigosa e como corrigir:

```javascript
if (senha == inputUsuario) { /* ... */ }
if (role != "admin") { /* ... */ }
if ([] == false) { /* ... */ }
if ("" == 0) { /* ... */ }
if (null == undefined) { /* ... */ }
```

---

## Desafio 3: eval e Alternativas

Por que `eval()` e perigoso? Reescreva sem eval:

```javascript
// Perigoso:
const campo = "nome";
eval(`obj.${campo} = "valor"`);

// Perigoso:
const codigo = inputUsuario;
eval(codigo);

// Perigoso:
setTimeout("alert('ola')", 1000);

// Para cada caso, mostre a alternativa segura
```

---

## Desafio 4: Frozen Objects para Config

Crie uma configuracao completamente imutavel (deep freeze):

```javascript
function deepFreeze(obj) {
  // Object.freeze so congela o nivel superficial
  // Implemente freeze recursivo
}
```

---

## Desafio 5: Timing Attack Basico

Explique por que esta comparacao de strings e vulneravel e como corrigir:

```javascript
function compararTokens(a, b) {
  return a === b; // Vulneravel! Por que?
}

// Implemente comparacao em tempo constante:
function compararSeguro(a, b) {
  // Deve levar o mesmo tempo independente de onde difere
}
```
