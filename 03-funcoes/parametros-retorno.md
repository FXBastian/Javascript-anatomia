# Parâmetros e Retorno

## Definição

**Parâmetros** são as entradas de uma função — os dados que ela recebe para trabalhar. O **retorno** é a saída — o resultado que a função devolve para quem a chamou. Juntos, formam o contrato de uma função: "dê-me X, eu devolvo Y".

```javascript
function somar(a, b) {  // a, b = parâmetros (entrada)
  return a + b;          // return = saída
}

let resultado = somar(3, 4); // 3, 4 = argumentos (valores reais)
console.log(resultado);       // 7
```

---

## 1. Parâmetros vs Argumentos

| Termo | Onde | O que é |
|-------|------|---------|
| **Parâmetro** | Na definição da função | Nome/variável que recebe o valor |
| **Argumento** | Na chamada da função | Valor real passado |

```javascript
// "nome" é o PARÂMETRO
function saudar(nome) {
  console.log(`Olá, ${nome}!`);
}

// "Felix" é o ARGUMENTO
saudar("Felix");
```

---

## 2. Argumentos Faltantes e Extras

JavaScript é **flexível** (e perigoso) com a quantidade de argumentos.

```javascript
function exemplo(a, b, c) {
  console.log(a, b, c);
}

// Menos argumentos que parâmetros → faltantes viram undefined
exemplo(1, 2);       // 1 2 undefined

// Mais argumentos que parâmetros → extras são ignorados
exemplo(1, 2, 3, 4); // 1 2 3 (o 4 é ignorado)

// Nenhum argumento
exemplo();           // undefined undefined undefined
```

---

## 3. Valores Padrão (Default Parameters)

### ES6: Valores padrão nativos

```javascript
function criarUsuario(nome, role = "user", ativo = true) {
  return { nome, role, ativo };
}

console.log(criarUsuario("Felix"));
// { nome: "Felix", role: "user", ativo: true }

console.log(criarUsuario("Ana", "admin"));
// { nome: "Ana", role: "admin", ativo: true }

console.log(criarUsuario("Carlos", "editor", false));
// { nome: "Carlos", role: "editor", ativo: false }
```

### Valores padrão avançados

```javascript
// Padrão pode ser uma expressão
function gerarId(prefixo = "ID", numero = Date.now()) {
  return `${prefixo}-${numero}`;
}

// Padrão pode referenciar parâmetros anteriores
function criarRetangulo(largura, altura = largura) {
  return { largura, altura, area: largura * altura };
}

console.log(criarRetangulo(5));    // { largura: 5, altura: 5, area: 25 }
console.log(criarRetangulo(5, 3)); // { largura: 5, altura: 3, area: 15 }
```

### `undefined` ativa o default, `null` não

```javascript
function teste(x = 10) {
  return x;
}

console.log(teste(undefined)); // 10 ← usa o default
console.log(teste(null));      // null ← NÃO usa o default
console.log(teste(0));         // 0 ← NÃO usa o default
console.log(teste(""));        // "" ← NÃO usa o default
```

---

## 4. Rest Parameters (`...`)

Coleta **todos os argumentos restantes** em um array real.

### Sintaxe

```javascript
function nomeFuncao(primeiro, segundo, ...restantes) {
  // restantes é um ARRAY com os demais argumentos
}
```

### Exemplos

```javascript
function somar(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}

console.log(somar(1, 2, 3));       // 6
console.log(somar(10, 20, 30, 40)); // 100
```

```javascript
function log(nivel, ...mensagens) {
  const prefixo = `[${nivel.toUpperCase()}]`;
  console.log(prefixo, ...mensagens);
}

log("info", "Servidor iniciado", "na porta 3000");
// [INFO] Servidor iniciado na porta 3000

log("erro", "Falha na conexão");
// [ERRO] Falha na conexão
```

### Regras do Rest

```javascript
// ✅ Rest deve ser o ÚLTIMO parâmetro
function ok(a, b, ...resto) { }

// ❌ SyntaxError — rest não pode ter nada depois
// function erro(...resto, ultimo) { }

// ❌ SyntaxError — só pode ter UM rest
// function erro(...a, ...b) { }
```

### Rest vs `arguments`

```javascript
// arguments — objeto legado (NÃO é array, NÃO funciona em arrow)
function legado() {
  console.log(arguments);        // { 0: "a", 1: "b", length: 2 }
  console.log(arguments.length); // 2
  // arguments.map(...)          // ❌ TypeError — não é array!
}
legado("a", "b");

// rest — moderno (É array, funciona em arrow)
function moderno(...args) {
  console.log(args);       // ["a", "b"]
  console.log(args.length); // 2
  args.map(x => x);         // ✅ funciona!
}
moderno("a", "b");
```

**Regra:** Sempre use rest (`...args`) em vez de `arguments`.

---

## 5. Desestruturação em Parâmetros

Extrair valores de objetos e arrays diretamente nos parâmetros.

### Desestruturação de objeto

```javascript
// Sem desestruturação
function exibir(usuario) {
  console.log(`${usuario.nome}, ${usuario.idade} anos`);
}

// Com desestruturação — mais limpo
function exibir({ nome, idade }) {
  console.log(`${nome}, ${idade} anos`);
}

exibir({ nome: "Felix", idade: 30, email: "felix@email.com" });
// "Felix, 30 anos"
```

### Com valores padrão

```javascript
function configurar({ tema = "claro", idioma = "pt-BR", fonte = 16 } = {}) {
  return { tema, idioma, fonte };
}

console.log(configurar({ tema: "escuro" }));
// { tema: "escuro", idioma: "pt-BR", fonte: 16 }

console.log(configurar());
// { tema: "claro", idioma: "pt-BR", fonte: 16 }
// O `= {}` no final evita erro se chamada sem argumento
```

### Desestruturação de array

```javascript
function calcularDistancia([x1, y1], [x2, y2]) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

console.log(calcularDistancia([0, 0], [3, 4])); // 5
```

### Padrão de "options object"

```javascript
// ❌ Muitos parâmetros posicionais — fácil errar a ordem
function criarBotao(texto, cor, tamanho, desabilitado, onClick) { }
criarBotao("Enviar", "azul", "md", false, handleClick);

// ✅ Options object — ordem não importa, código auto-documentado
function criarBotao({ texto, cor = "azul", tamanho = "md", desabilitado = false, onClick }) {
  return { texto, cor, tamanho, desabilitado, onClick };
}

criarBotao({
  texto: "Enviar",
  onClick: handleClick,
  // cor, tamanho e desabilitado usam os defaults
});
```

---

## 6. Return (Retorno)

### Retorno explícito

```javascript
function quadrado(x) {
  return x * x;
}

console.log(quadrado(5)); // 25
```

### Retorno implícito (`undefined`)

```javascript
function semReturn() {
  console.log("fiz algo");
  // sem return → retorna undefined
}

let resultado = semReturn(); // "fiz algo"
console.log(resultado);      // undefined
```

### Return interrompe a execução

```javascript
function verificar(idade) {
  if (idade < 0) {
    return "Idade inválida"; // sai aqui
  }

  // Só executa se idade >= 0
  return idade >= 18 ? "Maior" : "Menor";
}
```

### Retornar múltiplos valores

JavaScript não suporta múltiplos retornos, mas você pode retornar um **objeto** ou **array**:

```javascript
// Com objeto (mais legível)
function dividir(a, b) {
  return {
    quociente: Math.floor(a / b),
    resto: a % b
  };
}

const { quociente, resto } = dividir(17, 5);
console.log(quociente); // 3
console.log(resto);     // 2

// Com array
function minMax(numeros) {
  return [Math.min(...numeros), Math.max(...numeros)];
}

const [menor, maior] = minMax([5, 2, 8, 1, 9]);
console.log(menor, maior); // 1 9
```

### Return com quebra de linha (cuidado com ASI!)

```javascript
// ❌ BUG — ASI insere ; depois de return
function criar() {
  return
  {
    nome: "Felix"
  };
}
console.log(criar()); // undefined 😱

// ✅ Correto — abra a chave na mesma linha do return
function criar() {
  return {
    nome: "Felix"
  };
}
console.log(criar()); // { nome: "Felix" }
```

---

## 7. Funções Puras vs Impuras

### Função pura

- **Mesmo input** → **mesmo output** (sempre)
- **Sem efeitos colaterais** (não modifica estado externo)

```javascript
// ✅ Pura — previsível, testável
function somar(a, b) {
  return a + b;
}

// ✅ Pura
function formatarNome(nome) {
  return nome.trim().toUpperCase();
}
```

### Função impura

- Depende de ou modifica **estado externo**
- Pode ter **efeitos colaterais** (I/O, mutação, etc.)

```javascript
// Impura — depende de variável externa
let taxa = 0.1;
function calcularImposto(valor) {
  return valor * taxa; // resultado muda se "taxa" mudar
}

// Impura — modifica estado externo (efeito colateral)
let total = 0;
function adicionarAoTotal(valor) {
  total += valor; // muta variável externa
}

// Impura — I/O
function salvarNoBanco(dados) {
  // interação com sistema externo
}
```

**Regra prática:** Prefira funções puras sempre que possível. Use impuras apenas quando necessário (I/O, DOM, etc.).

---

## 8. Erros Comuns

### Esquecer o `return`

```javascript
function dobrar(x) {
  x * 2; // calculou mas não retornou!
}
console.log(dobrar(5)); // undefined
```

### Modificar o argumento achando que muda o original

```javascript
// Primitivos — sempre cópia
function tentarMudar(valor) {
  valor = 100; // muda a cópia local, não o original
}

let x = 5;
tentarMudar(x);
console.log(x); // 5 — não mudou

// Objetos — referência compartilhada
function tentarMudarObj(obj) {
  obj.nome = "alterado"; // MUDA o original!
}

let usuario = { nome: "Felix" };
tentarMudarObj(usuario);
console.log(usuario.nome); // "alterado" — mudou!
```

### Default parameter com objeto mutável

```javascript
// ❌ O default é avaliado A CADA chamada (correto em JS, diferente de Python)
function adicionar(item, lista = []) {
  lista.push(item);
  return lista;
}

console.log(adicionar("a")); // ["a"]
console.log(adicionar("b")); // ["b"] ← nova lista vazia a cada chamada ✅
// Em JS isso funciona corretamente (diferente de Python)
```

---

## Resumo

| Conceito | Sintaxe | Exemplo |
|----------|---------|---------|
| Parâmetro padrão | `function(x = 10)` | Usa 10 se x for undefined |
| Rest parameter | `function(...args)` | Coleta extras em array |
| Desestruturar objeto | `function({ a, b })` | Extrai propriedades |
| Desestruturar array | `function([x, y])` | Extrai por posição |
| Options object | `function({ opt1, opt2 = default })` | API limpa com muitas opções |
| Return objeto | `return { a, b }` | Retornar múltiplos valores |

---

> **Próximo:** [arrow-functions.md](arrow-functions.md) — A sintaxe moderna de funções e suas diferenças cruciais.
