# Refatoracao

## O que e?

Refatoracao e mudar a estrutura interna do codigo sem alterar seu comportamento externo. O objetivo e melhorar legibilidade, manutencao e extensibilidade.

## Por que importa?

Codigo envelhece. Requisitos mudam. O que era simples vira complexo. Refatorar regularmente evita que o codigo se torne inmanejavel.

## Pre-requisito

**Testes**. Sem testes, refatoracao e reconstrucao arriscada. Com testes, voce sabe imediatamente se quebrou algo.

---

## Code Smells (Sinais de problema)

### 1. Funcao longa

```javascript
// ANTES: funcao faz tudo
function processarPedido(pedido) {
  // validar (20 linhas)
  // calcular desconto (15 linhas)
  // aplicar frete (10 linhas)
  // salvar no banco (10 linhas)
  // enviar email (10 linhas)
}

// DEPOIS: extrair funcoes
function processarPedido(pedido) {
  validar(pedido);
  const total = calcularTotal(pedido);
  const comFrete = aplicarFrete(total, pedido.endereco);
  const salvo = await salvar(pedido, comFrete);
  await notificar(pedido.email, salvo);
}
```

### 2. Parametros demais

```javascript
// ANTES
function criarUsuario(nome, email, idade, cidade, pais, telefone, cargo) { }

// DEPOIS: objeto de opcoes
function criarUsuario({ nome, email, idade, cidade, pais, telefone, cargo }) { }
```

### 3. Condicionais complexas

```javascript
// ANTES
if (user.role === "admin" || user.role === "superadmin" || (user.role === "editor" && user.departamento === "content")) {
  // ...
}

// DEPOIS
function podeEditar(user) {
  if (["admin", "superadmin"].includes(user.role)) return true;
  return user.role === "editor" && user.departamento === "content";
}

if (podeEditar(user)) { }
```

### 4. Duplicacao

```javascript
// ANTES: codigo repetido em 3 lugares
function formatarUsuario(u) { return `${u.nome} (${u.email})`; }
function formatarAdmin(a) { return `${a.nome} (${a.email})`; }

// DEPOIS: funcao generica
function formatarPessoa(p) { return `${p.nome} (${p.email})`; }
```

### 5. Magic Numbers

```javascript
// ANTES
if (senha.length < 8) { }
setTimeout(fn, 86400000);

// DEPOIS
const SENHA_MINIMA = 8;
const UM_DIA_MS = 24 * 60 * 60 * 1000;

if (senha.length < SENHA_MINIMA) { }
setTimeout(fn, UM_DIA_MS);
```

---

## Tecnicas de Refatoracao

### Extract Function
Mover bloco de codigo para funcao nomeada.

### Inline Function
O oposto: substituir funcao trivial pelo seu corpo.

### Rename
Nomes claros valem mais que comentarios.

### Replace Conditional with Polymorphism

```javascript
// ANTES
function calcularArea(forma) {
  switch (forma.tipo) {
    case "circulo": return Math.PI * forma.raio ** 2;
    case "retangulo": return forma.largura * forma.altura;
    case "triangulo": return (forma.base * forma.altura) / 2;
  }
}

// DEPOIS
class Circulo {
  constructor(raio) { this.raio = raio; }
  area() { return Math.PI * this.raio ** 2; }
}

class Retangulo {
  constructor(l, a) { this.largura = l; this.altura = a; }
  area() { return this.largura * this.altura; }
}
```

### Replace Loop with Pipeline

```javascript
// ANTES
const resultado = [];
for (const item of items) {
  if (item.ativo) {
    resultado.push(item.nome.toUpperCase());
  }
}

// DEPOIS
const resultado = items
  .filter(item => item.ativo)
  .map(item => item.nome.toUpperCase());
```

---

## Quando Refatorar

- **Antes de adicionar feature**: limpar o caminho
- **Depois de code review**: incorporar feedback
- **Quando um bug e dificil de encontrar**: complexidade e o problema
- **Regra dos 3**: na terceira duplicacao, extrair

## Quando NAO Refatorar

- Sem testes (adicionar testes primeiro)
- Perto de deadline (risco alto)
- Codigo que vai ser descartado
- Sem razao concreta (nao refatorar "porque sim")

---

## Erros Comuns

- Refatorar e mudar comportamento ao mesmo tempo
- Refatorar sem testes
- Refatorar codigo que voce nao entende
- Over-engineering: abstrair cedo demais
- Nao commitar em passos pequenos

## Modelo Mental

Refatoracao = limpeza da casa. Voce nao muda a planta (comportamento), so organiza melhor o que ja existe. Faca em passos pequenos, teste a cada passo, e commite frequentemente.
