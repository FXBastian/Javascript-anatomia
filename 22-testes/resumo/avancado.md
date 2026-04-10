# Testes - Visao Avancada

## Funcionamento real
Frameworks como Jest e Vitest fazem: 1) descoberta de arquivos *.test.*, 2) isolam cada arquivo em sandbox, 3) executam descreve/it, 4) coletam asserts, 5) reportam resultados. Internamente, usam try/catch em cada teste para capturar falhas.

## Test Doubles avancados
```javascript
// Fake: implementacao funcional simplificada
class FakeDB {
  #dados = new Map();
  async get(id) { return this.#dados.get(id); }
  async set(id, valor) { this.#dados.set(id, valor); }
}
```

## Pegadinhas comuns
- Testes que passam sozinhos mas falham em conjunto (estado compartilhado)
- Coverage 100% nao significa codigo correto (caminhos logicos vs linhas)
- Testes de snapshot que ninguem revisa
- Mock de `Date.now` sem restaurar afeta outros testes

## Property-based testing
Ao inves de exemplos fixos, gerar inputs aleatorios e verificar propriedades:
```javascript
// Para toda string s: reverse(reverse(s)) === s
// Para todo array a: sort(sort(a)) === sort(a)
// Para todo n > 0: fatorial(n) === n * fatorial(n-1)
```

## Modelo mental
Testes sao especificacao executavel. Se voce nao consegue testar algo facilmente, o design pode ser melhorado. Boa testabilidade e indicador de bom design.
