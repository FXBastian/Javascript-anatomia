# Projetos Praticos — Testes

## Projeto 1: Test Runner Completo

```javascript
class TestRunner {
  #suites = [];
  #atual = null;

  describe(nome, fn) {
    this.#atual = { nome, testes: [], before: null, after: null };
    fn();
    this.#suites.push(this.#atual);
    this.#atual = null;
  }

  it(descricao, fn) {
    this.#atual.testes.push({ descricao, fn });
  }

  beforeEach(fn) { this.#atual.before = fn; }
  afterEach(fn) { this.#atual.after = fn; }

  async executar() {
    let total = 0, ok = 0, falhas = [];

    for (const suite of this.#suites) {
      console.log(`\n${suite.nome}`);

      for (const teste of suite.testes) {
        total++;
        try {
          if (suite.before) await suite.before();
          await teste.fn();
          if (suite.after) await suite.after();
          ok++;
          console.log(`  ✓ ${teste.descricao}`);
        } catch (e) {
          falhas.push({ suite: suite.nome, teste: teste.descricao, erro: e.message });
          console.log(`  ✗ ${teste.descricao}: ${e.message}`);
        }
      }
    }

    console.log(`\n${ok}/${total} passaram`);
    if (falhas.length) console.log("Falhas:", falhas);
  }
}

// Uso
const t = new TestRunner();

t.describe("Array", function () {
  let arr;
  t.beforeEach(() => { arr = [1, 2, 3]; });

  t.it("push adiciona elemento", () => {
    arr.push(4);
    if (arr.length !== 4) throw new Error(`Esperado 4, got ${arr.length}`);
  });

  t.it("pop remove ultimo", () => {
    const ultimo = arr.pop();
    if (ultimo !== 3) throw new Error(`Esperado 3, got ${ultimo}`);
  });
});

t.executar();
```

---

## Projeto 2: Testar um CRUD Completo

```javascript
// Sistema sob teste
function criarUserService(db) {
  return {
    async criar(dados) {
      if (!dados.email) throw new Error("Email obrigatorio");
      return db.inserir("users", dados);
    },
    async buscar(id) {
      return db.buscarPorId("users", id);
    },
    async atualizar(id, dados) {
      const existe = await db.buscarPorId("users", id);
      if (!existe) throw new Error("Usuario nao encontrado");
      return db.atualizar("users", id, dados);
    }
  };
}

// Fake DB para testes
function criarFakeDB() {
  const store = {};
  let nextId = 1;
  return {
    async inserir(tabela, dados) {
      if (!store[tabela]) store[tabela] = [];
      const registro = { id: nextId++, ...dados };
      store[tabela].push(registro);
      return registro;
    },
    async buscarPorId(tabela, id) {
      return store[tabela]?.find(r => r.id === id) || null;
    },
    async atualizar(tabela, id, dados) {
      const registros = store[tabela] || [];
      const idx = registros.findIndex(r => r.id === id);
      if (idx === -1) return null;
      registros[idx] = { ...registros[idx], ...dados };
      return registros[idx];
    }
  };
}

// Testes
async function testarUserService() {
  const db = criarFakeDB();
  const service = criarUserService(db);

  // Teste: criar usuario
  const user = await service.criar({ nome: "Ana", email: "ana@test.com" });
  console.assert(user.id === 1, "ID deve ser 1");
  console.assert(user.email === "ana@test.com", "Email deve bater");

  // Teste: buscar usuario
  const encontrado = await service.buscar(1);
  console.assert(encontrado.nome === "Ana", "Nome deve bater");

  // Teste: erro sem email
  try {
    await service.criar({ nome: "Sem Email" });
    console.assert(false, "Deveria ter lancado erro");
  } catch (e) {
    console.assert(e.message === "Email obrigatorio", "Mensagem de erro");
  }

  console.log("Todos os testes do UserService passaram!");
}

testarUserService();
```
