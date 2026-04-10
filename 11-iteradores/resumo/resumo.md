# Iteradores e Generators - Resumo

## Visao geral
Iteracao em JS segue protocolo: um iterador expoe `next()` e retorna `{ value, done }`.

## Conceitos principais
- Iteravel implementa `Symbol.iterator`
- Iterador controla estado da sequencia
- Generator (`function*`) simplifica criacao de iteradores

## Exemplo
```javascript
function* ids() {
  yield 1;
  yield 2;
  yield 3;
}

for (const id of ids()) {
  console.log(id);
}
```

## Boas praticas
- Use generator para sequencias preguiçosas
- Prefira `for...of` em iteraveis
- Evite materializar listas enormes sem necessidade

## Fluxo Mental
Iterador e consumo sob demanda: voce nao precisa gerar tudo de uma vez. O consumidor puxa um item por vez conforme precisa.
