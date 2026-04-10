# this - Visao Avancada

## Funcionamento real do JavaScript
A resolucao de `this` segue uma hierarquia pratica:
1. `new` (binding de construcao)
2. `call/apply/bind` (binding explicito)
3. chamada por objeto (binding implicito)
4. default binding (global ou undefined em strict)

## Arrow e lexical this
Arrow function nao cria `this`; ela captura o `this` do contexto onde nasceu.

```javascript
function Timer() {
  this.segundos = 0;
  setInterval(() => {
    this.segundos++;
  }, 1000);
}
```

## Pegadinhas comuns
- Extrair metodo para variavel perde contexto
- `bind` cria nova funcao e nao altera a original
- Em event handlers, `this` pode ser o elemento alvo

## Comparacoes importantes
- Metodo tradicional: contexto dinamico (mais flexivel)
- Arrow: contexto estavel (menos surpresa)

## Modelo mental
Considere `this` como parametro implcito da chamada. Quando o codigo fica complexo, explicitar dependencia via parametro normal costuma reduzir bugs.
