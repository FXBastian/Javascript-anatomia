# Desafios — Colecoes

## Desafio 1: Contar Frequencia de Palavras com Map

```javascript
function contarPalavras(texto) {
  // Retornar um Map com a frequencia de cada palavra
  // Ignorar case e pontuacao
  // Ordenar por frequencia (maior primeiro)
}

console.log(contarPalavras("O gato viu o rato. O rato viu o gato."));
// Map { "o" => 4, "gato" => 2, "viu" => 2, "rato" => 2 }
```

---

## Desafio 2: Remover Duplicatas Avancado

```javascript
// Remover objetos duplicados de um array (por uma chave especifica)
function unicos(array, chave) {
  // Usar Set ou Map para eficiencia
  // unicos([{id:1,n:"a"}, {id:2,n:"b"}, {id:1,n:"c"}], "id")
  // → [{id:1,n:"a"}, {id:2,n:"b"}]
}
```

---

## Desafio 3: Implementar Set do Zero

```javascript
class MeuSet {
  // Implemente: add, delete, has, size, clear, forEach, values
  // Use um objeto interno como storage
  // Bonus: implemente [Symbol.iterator]
}
```

---

## Desafio 4: WeakSet para Controle de Visitas

Crie um sistema que marca elementos DOM como "ja visitados" sem causar memory leak:

```javascript
const visitados = new WeakSet();

function marcarVisitado(elemento) {
  visitados.add(elemento);
}

function foiVisitado(elemento) {
  return visitados.has(elemento);
}

// Por que WeakSet e melhor que Set neste caso?
```

---

## Desafio 5: Map vs Object - Benchmark

Crie um teste que compara performance de Map vs Object para:
1. Insercao de 100.000 chaves
2. Busca de chaves
3. Delecao de chaves
4. Iteracao

Documente quando usar cada um.
