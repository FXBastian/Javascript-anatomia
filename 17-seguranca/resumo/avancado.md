# Seguranca em JavaScript - Visao Avancada

## Funcionamento real do JavaScript
Coercao nao e falha por si so, mas pode abrir brecha logica quando regras de negocio dependem de tipo.

```javascript
console.log([] == false); // true
console.log("\n" == 0);   // true
```

## XSS e manipulacao de DOM
Inserir HTML de origem externa sem sanitizacao permite execucao de script malicioso.

```javascript
// inseguro
container.innerHTML = comentarioDoUsuario;

// mais seguro
container.textContent = comentarioDoUsuario;
```

## Pegadinhas comuns
- Usar localStorage para token sem estrategia contra XSS
- Confiar em validacao apenas no cliente
- Regex fraca para filtrar entrada critica

## Comparacoes importantes
- Validacao: checa formato
- Sanitizacao: remove/neutraliza conteudo perigoso
- Escapamento: transforma caracteres especiais no contexto de saida

## Modelo mental
Trate toda entrada como hostil ate prova contraria. Segurança e defesa em camadas: tipo correto, contexto correto e saida corretamente escapada.
