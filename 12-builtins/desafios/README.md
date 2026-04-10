# Desafios — Built-in Objects

## Desafio 1: Metodos de String Reimplementados

Reimplemente sem usar os nativos:

```javascript
String.prototype.meuIncludes = function (busca, posicao = 0) { /* ... */ };
String.prototype.meuRepeat = function (vezes) { /* ... */ };
String.prototype.meuPadStart = function (tamanho, preenchimento = " ") { /* ... */ };
String.prototype.meuTrim = function () { /* ... */ };
```

---

## Desafio 2: Safe JSON Parse

```javascript
function safeJsonParse(str, fallback = null) {
  // Parse JSON sem explodir
  // Se falhar, retorna fallback
  // Bonus: aceitar um schema para validar estrutura
}
```

---

## Desafio 3: Formatar Numeros

Crie formatadores para moeda, porcentagem e numeros grandes:

```javascript
function formatarMoeda(valor, moeda = "BRL") { /* R$ 1.234,56 */ }
function formatarPorcentagem(valor, decimais = 1) { /* 85.5% */ }
function formatarGrande(valor) { /* 1.2M, 500K, 3.1B */ }
```

---

## Desafio 4: Date Puzzle

Sem usar bibliotecas, calcule:
1. Quantos dias entre duas datas
2. Qual dia da semana sera daqui a 100 dias
3. O ultimo dia do mes atual
4. Se um ano e bissexto

---

## Desafio 5: JSON Circular

`JSON.stringify` falha com referencias circulares. Implemente uma versao que detecta e substitui ciclos:

```javascript
function stringifySeguro(obj) {
  // Detectar referencias circulares
  // Substituir por "[Circular]"
}

const a = { nome: "a" };
const b = { nome: "b", ref: a };
a.ref = b; // circular!

console.log(stringifySeguro(a));
// { "nome": "a", "ref": { "nome": "b", "ref": "[Circular]" } }
```
