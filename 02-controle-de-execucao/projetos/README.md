# Projetos Praticos — Controle de Execucao

## Projeto 1: Validador de Formulario

Crie um sistema de validacao que usa condicionais encadeadas para verificar diferentes campos:

```javascript
function validarFormulario(dados) {
  const erros = [];

  if (!dados.nome || dados.nome.trim().length < 2) {
    erros.push("Nome deve ter pelo menos 2 caracteres");
  }

  if (!dados.email || !dados.email.includes("@")) {
    erros.push("Email invalido");
  }

  if (!dados.idade || dados.idade < 18 || dados.idade > 120) {
    erros.push("Idade deve estar entre 18 e 120");
  }

  const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!dados.senha || !senhaForte.test(dados.senha)) {
    erros.push("Senha fraca: minimo 8 chars, maiuscula, minuscula e numero");
  }

  return {
    valido: erros.length === 0,
    erros
  };
}

console.log(validarFormulario({ nome: "A", email: "test", idade: 15, senha: "123" }));
console.log(validarFormulario({ nome: "Ana Silva", email: "ana@email.com", idade: 25, senha: "Abc12345" }));
```

---

## Projeto 2: Gerador de Fibonacci com Controle

```javascript
function fibonacci(limite, { incluirZero = true, formato = "array" } = {}) {
  const seq = incluirZero ? [0, 1] : [1, 1];

  while (true) {
    const proximo = seq[seq.length - 1] + seq[seq.length - 2];
    if (proximo > limite) break;
    seq.push(proximo);
  }

  switch (formato) {
    case "string":
      return seq.join(", ");
    case "objeto":
      return seq.map((v, i) => ({ indice: i, valor: v }));
    case "array":
    default:
      return seq;
  }
}

console.log(fibonacci(100));
console.log(fibonacci(50, { incluirZero: false, formato: "string" }));
console.log(fibonacci(20, { formato: "objeto" }));
```

---

## Projeto 3: Sistema de Menu Interativo (Console)

```javascript
function processarComando(comando) {
  const [acao, ...args] = comando.split(" ");

  switch (acao.toLowerCase()) {
    case "somar":
      return args.reduce((acc, n) => acc + Number(n), 0);
    case "inverter":
      return args.join(" ").split("").reverse().join("");
    case "contar":
      return `${args.length} palavras`;
    case "ajuda":
      return "Comandos: somar, inverter, contar, ajuda, sair";
    case "sair":
      return null;
    default:
      return `Comando "${acao}" nao reconhecido. Digite "ajuda"`;
  }
}

// Simular interacao
const comandos = ["somar 10 20 30", "inverter hello world", "contar uma frase teste", "xyz", "ajuda"];
for (const cmd of comandos) {
  const resultado = processarComando(cmd);
  if (resultado === null) break;
  console.log(`> ${cmd}`);
  console.log(`  ${resultado}\n`);
}
```
