# Desafios — DOM

## Desafio 1: Query Selector Engine

Implemente uma versao simplificada de querySelector que busca por tag, classe e id:

```javascript
function buscar(seletor, raiz = document) {
  // Suportar: "div", ".classe", "#id", "tag.classe"
  // Implemente sem usar querySelector/querySelectorAll
}
```

---

## Desafio 2: Virtual DOM Simplificado

```javascript
// Crie uma funcao que compara dois objetos representando DOM
// e retorna as diferencas (patches)
function diff(arvoreAntiga, arvoreNova) {
  // arvore = { tag: "div", props: {class: "x"}, filhos: [...] }
  // Retornar lista de operacoes: ADD, REMOVE, UPDATE, REPLACE
}
```

---

## Desafio 3: Drag and Drop Manual

Implemente drag and drop usando apenas mousedown, mousemove e mouseup (sem a API nativa de drag):

```javascript
function arrastavel(elemento) {
  // Tornar o elemento arrastavel com o mouse
  // Deve funcionar com posicionamento absoluto
}
```

---

## Desafio 4: Observer de Mudancas

Use MutationObserver para monitorar mudancas no DOM:

```javascript
function observarMudancas(elemento, callback) {
  // Detectar: adicao/remocao de filhos, mudancas de atributos, mudancas de texto
  // callback recebe um resumo legivel das mudancas
}
```

---

## Desafio 5: Acessibilidade

Crie uma funcao que verifica problemas basicos de acessibilidade:

```javascript
function auditarAcessibilidade() {
  // Verificar:
  // - Imagens sem alt
  // - Formularios sem label
  // - Links sem texto
  // - Botoes sem texto acessivel
  // - Contraste insuficiente (bonus)
  // Retornar lista de problemas encontrados
}
```
