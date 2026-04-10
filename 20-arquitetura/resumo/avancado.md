# Arquitetura e Design Patterns - Visao Avancada

## Funcionamento real
Patterns em JavaScript se beneficiam de funcoes de primeira classe e closures. Onde Java precisa de interfaces e classes abstratas, JS resolve com funcoes e objetos literais. Isso torna patterns mais leves mas exige disciplina para manter consistencia.

## Patterns compostos
No mundo real, patterns raramente aparecem isolados:
- **MVC/MVVM**: Observer + Strategy + Mediator
- **Redux**: Observer + Command + Singleton
- **Middleware (Express)**: Chain of Responsibility + Decorator

```javascript
// Middleware pattern: chain of responsibility
function criarPipeline() {
  const middlewares = [];
  return {
    use(fn) { middlewares.push(fn); },
    async executar(contexto) {
      let i = 0;
      async function next() {
        if (i < middlewares.length) {
          await middlewares[i++](contexto, next);
        }
      }
      await next();
    }
  };
}
```

## Pegadinhas comuns
- Singleton em testes: estado compartilhado entre testes causa flaky tests
- Observer sem cleanup: memory leaks em SPAs com navegacao
- Factory sem validacao: objetos invalidos criados silenciosamente
- Strategy com estado mutavel: side effects inesperados

## Modelo mental
Patterns sao como LEGO: pecas padronizadas que combinam de formas infinitas. A maestria nao e conhecer todos os patterns, e saber quando NAO usar um.
