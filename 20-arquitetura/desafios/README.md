# Desafios — Arquitetura

## Desafio 1: Implementar o Mediator Pattern

Crie um mediator que coordena comunicacao entre componentes sem que eles se conhecam:

```javascript
class Mediator {
  // Componentes se registram no mediator
  // Enviam mensagens atraves do mediator
  // Nenhum componente referencia outro diretamente
}
```

---

## Desafio 2: Adapter Pattern

Crie adapters que normalizam APIs diferentes para uma interface unica:

```javascript
// API antiga: callback style
const apiAntiga = { buscar(id, callback) { /* ... */ } };

// API nova: promise style  
const apiNova = { async buscar(id) { /* ... */ } };

// Crie um adapter que faz ambas funcionarem com a mesma interface
```

---

## Desafio 3: Command Pattern com Undo/Redo

```javascript
class Editor {
  // Implemente: executar, desfazer, refazer
  // Cada acao e um Command com execute() e undo()
}
```

---

## Desafio 4: Composite Pattern

Crie um sistema de permissoes hierarquico onde grupos contem usuarios e outros grupos:

```javascript
// admin (grupo)
//   ├── Ana (usuario)
//   ├── moderadores (grupo)
//   │   ├── Carlos
//   │   └── Bia
//   └── Daniel

// admin.checarPermissao("deletar") deve verificar recursivamente
```

---

## Desafio 5: Anti-Patterns

Identifique o anti-pattern em cada caso e proponha a correcao:

```javascript
// 1. God Object
const App = { /* 500 metodos aqui */ };

// 2. Callback Hell
// 3. Spaghetti Code (dependencias circulares)
// 4. Magic Numbers
// 5. Premature Optimization
```
