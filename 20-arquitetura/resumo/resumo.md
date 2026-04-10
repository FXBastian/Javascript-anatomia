# Arquitetura e Design Patterns - Resumo

## Conceitos-chave

### Design Patterns
Solucoes catalogadas para problemas recorrentes. Divididos em criacionais (Factory, Singleton, Builder), estruturais (Decorator, Facade, Proxy) e comportamentais (Observer, Strategy, Iterator).

### Module Pattern
Encapsula codigo usando closures/IIFE, expondo apenas API publica. Evolucao: IIFE → Revealing Module → ES6 Modules → Class com campos privados (#).

### Observer Pattern
Relacao um-para-muitos: subject notifica observers quando muda. Variantes: EventEmitter, Pub/Sub, Custom Events do DOM.

## Quando usar cada Pattern

| Problema | Pattern |
|----------|---------|
| Criar objetos de tipos variados | Factory |
| Uma unica instancia global | Singleton |
| Encapsular implementacao | Module |
| Notificar sobre mudancas | Observer |
| Trocar algoritmo em runtime | Strategy |
| Adicionar comportamento | Decorator |

## Fluxo Mental

1. Identifique o problema → 2. Existe pattern adequado? → 3. Vale a complexidade extra? → 4. Implementar da forma mais simples possivel → 5. Refatorar se necessario
