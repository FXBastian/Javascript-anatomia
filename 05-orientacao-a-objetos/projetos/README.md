# Projetos Praticos — Orientacao a Objetos

## Projeto 1: Sistema de Entidades com Heranca

```javascript
class Entidade {
  #id;
  #criadoEm;

  constructor(dados = {}) {
    this.#id = crypto.randomUUID?.() || Math.random().toString(36).slice(2);
    this.#criadoEm = new Date();
    Object.assign(this, dados);
  }

  get id() { return this.#id; }
  get criadoEm() { return this.#criadoEm; }

  toJSON() {
    return { id: this.#id, criadoEm: this.#criadoEm, ...this };
  }
}

class Usuario extends Entidade {
  #senha;

  constructor(nome, email, senha) {
    super({ nome, email });
    this.#senha = senha; // campo privado
  }

  verificarSenha(tentativa) {
    return this.#senha === tentativa;
  }

  toString() {
    return `Usuario(${this.nome}, ${this.email})`;
  }
}

class Admin extends Usuario {
  #permissoes;

  constructor(nome, email, senha, permissoes = []) {
    super(nome, email, senha);
    this.#permissoes = permissoes;
  }

  temPermissao(perm) {
    return this.#permissoes.includes(perm);
  }
}

const admin = new Admin("Ana", "ana@email.com", "123", ["usuarios", "config"]);
console.log(admin.toString());
console.log(admin.temPermissao("usuarios")); // true
console.log(admin.verificarSenha("123"));    // true
console.log(JSON.stringify(admin.toJSON(), null, 2));
```

---

## Projeto 2: Mixin Pattern

```javascript
const Serializavel = {
  serializar() {
    return JSON.stringify(this);
  },
  static deserializar(json, Classe) {
    return Object.assign(new Classe(), JSON.parse(json));
  }
};

const ComEventos = {
  _listeners: null,

  on(evento, callback) {
    if (!this._listeners) this._listeners = {};
    if (!this._listeners[evento]) this._listeners[evento] = [];
    this._listeners[evento].push(callback);
  },

  emit(evento, ...dados) {
    if (!this._listeners?.[evento]) return;
    for (const cb of this._listeners[evento]) {
      cb(...dados);
    }
  }
};

function aplicarMixins(classe, ...mixins) {
  for (const mixin of mixins) {
    Object.assign(classe.prototype, mixin);
  }
}

class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }
}

aplicarMixins(Produto, ComEventos);

const p = new Produto("Notebook", 3500);
p.on("precoMudou", (novo) => console.log(`Preco atualizado: R$${novo}`));
p.preco = 3200;
p.emit("precoMudou", p.preco);
```

---

## Projeto 3: Builder Pattern

```javascript
class QueryBuilder {
  #tabela;
  #condicoes = [];
  #campos = ["*"];
  #ordem = null;
  #limite = null;

  from(tabela) {
    this.#tabela = tabela;
    return this;
  }

  select(...campos) {
    this.#campos = campos;
    return this;
  }

  where(condicao) {
    this.#condicoes.push(condicao);
    return this;
  }

  orderBy(campo, direcao = "ASC") {
    this.#ordem = `${campo} ${direcao}`;
    return this;
  }

  limit(n) {
    this.#limite = n;
    return this;
  }

  build() {
    let sql = `SELECT ${this.#campos.join(", ")} FROM ${this.#tabela}`;
    if (this.#condicoes.length) sql += ` WHERE ${this.#condicoes.join(" AND ")}`;
    if (this.#ordem) sql += ` ORDER BY ${this.#ordem}`;
    if (this.#limite) sql += ` LIMIT ${this.#limite}`;
    return sql;
  }
}

const query = new QueryBuilder()
  .from("usuarios")
  .select("nome", "email")
  .where("ativo = true")
  .where("idade >= 18")
  .orderBy("nome")
  .limit(10)
  .build();

console.log(query);
// SELECT nome, email FROM usuarios WHERE ativo = true AND idade >= 18 ORDER BY nome ASC LIMIT 10
```
