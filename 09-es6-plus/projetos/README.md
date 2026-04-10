# Projetos Praticos — ES6+

## Projeto 1: Config Manager com Destructuring e Spread

```javascript
function criarConfigManager(padrao) {
  let config = { ...padrao };

  return {
    get(...caminhos) {
      if (caminhos.length === 0) return { ...config };
      if (caminhos.length === 1) return config[caminhos[0]];
      return caminhos.reduce((acc, c) => ({ ...acc, [c]: config[c] }), {});
    },

    set(atualizacoes) {
      config = { ...config, ...atualizacoes };
      return this;
    },

    reset() {
      config = { ...padrao };
      return this;
    },

    merge(outro) {
      config = { ...config, ...outro };
      return this;
    }
  };
}

const cfg = criarConfigManager({ tema: "escuro", idioma: "pt", fontSize: 14 });
cfg.set({ fontSize: 16 }).merge({ debug: true });
console.log(cfg.get());
console.log(cfg.get("tema", "fontSize"));
```

---

## Projeto 2: Template Engine Simples

```javascript
function template(str) {
  return function (dados) {
    return str.replace(/\$\{(\w+(?:\.\w+)*)\}/g, (_, caminho) => {
      return caminho.split(".").reduce((obj, chave) => obj?.[chave], dados) ?? "";
    });
  };
}

const email = template(`
Ola, \${nome}!

Seu pedido #\${pedido.id} foi \${pedido.status}.
Total: R$ \${pedido.total}

Obrigado por comprar na \${loja}!
`);

console.log(email({
  nome: "Carlos",
  pedido: { id: 4521, status: "enviado", total: "149,90" },
  loja: "TechStore"
}));
```

---

## Projeto 3: Optional Chaining Seguro (Pre-ES2020)

Implemente optional chaining como funcao para entender o que ele faz internamente:

```javascript
function acessarSeguro(obj, caminho) {
  return caminho.split(".").reduce((atual, chave) => {
    if (atual == null) return undefined;
    // Suporte a arrays: "items.0.nome"
    const indice = Number(chave);
    return Number.isInteger(indice) ? atual[indice] : atual[chave];
  }, obj);
}

const dados = {
  usuario: {
    perfil: { nome: "Ana", enderecos: [{ cidade: "SP" }, { cidade: "RJ" }] }
  }
};

console.log(acessarSeguro(dados, "usuario.perfil.nome"));           // "Ana"
console.log(acessarSeguro(dados, "usuario.perfil.enderecos.0.cidade")); // "SP"
console.log(acessarSeguro(dados, "usuario.config.tema"));           // undefined
```
