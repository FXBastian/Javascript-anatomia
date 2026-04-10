# Mocks, Stubs e Spies

## O que sao?

Tecnicas para isolar a unidade sob teste, substituindo dependencias reais por versoes controladas.

## Por que existem?

Funcoes reais podem:
- Fazer chamadas de rede (lento, instavel)
- Acessar banco de dados (estado compartilhado)
- Enviar emails ou notificacoes (efeitos colaterais)
- Depender do relogio, random, etc. (nao deterministico)

Mocks substituem essas dependencias por versoes previsiveis.

---

## Tipos

### Stub — Retorna valores fixos

```javascript
function criarStub(retorno) {
  return function stub() {
    return retorno;
  };
}

// Exemplo: substituir fetch
const fetchStub = criarStub(
  Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1, nome: "Ana" }) })
);

// Teste usando stub
async function buscarUsuario(id, fetchFn = fetch) {
  const resp = await fetchFn(`/api/users/${id}`);
  return resp.json();
}

// No teste:
const resultado = await buscarUsuario(1, fetchStub);
console.log(resultado); // { id: 1, nome: "Ana" }
```

### Spy — Registra chamadas

```javascript
function criarSpy(fn = () => {}) {
  const spy = function (...args) {
    spy.chamadas.push(args);
    spy.contagem++;
    return fn(...args);
  };
  spy.chamadas = [];
  spy.contagem = 0;
  spy.foiChamado = () => spy.contagem > 0;
  spy.foiChamadoCom = (...args) =>
    spy.chamadas.some(c => JSON.stringify(c) === JSON.stringify(args));
  spy.reset = () => { spy.chamadas = []; spy.contagem = 0; };
  return spy;
}

// Uso
const callback = criarSpy();
[1, 2, 3].forEach(callback);

console.log(callback.contagem);           // 3
console.log(callback.foiChamadoCom(2, 1, [1, 2, 3])); // true
console.log(callback.chamadas);           // [[1,0,[1,2,3]], [2,1,[1,2,3]], [3,2,[1,2,3]]]
```

### Mock — Stub + Spy + Expectativas

```javascript
function criarMock(implementacao = {}) {
  const mock = {};

  for (const [nome, retorno] of Object.entries(implementacao)) {
    const spy = criarSpy(
      typeof retorno === "function" ? retorno : () => retorno
    );
    mock[nome] = spy;
  }

  return mock;
}

// Mock de um servico de email
const emailService = criarMock({
  enviar: () => Promise.resolve({ enviado: true }),
  verificar: () => true
});

// No teste:
await emailService.enviar("user@test.com", "Assunto", "Corpo");
console.log(emailService.enviar.foiChamado());    // true
console.log(emailService.enviar.contagem);         // 1
console.log(emailService.verificar.foiChamado());  // false
```

---

## Injecao de Dependencia para Testabilidade

```javascript
// RUIM: dependencia hardcoded (dificil de testar)
async function criarPedido(dados) {
  const resp = await fetch("/api/pedidos", { method: "POST", body: JSON.stringify(dados) });
  return resp.json();
}

// BOM: dependencia injetavel
async function criarPedido(dados, { httpClient = fetch } = {}) {
  const resp = await httpClient("/api/pedidos", { method: "POST", body: JSON.stringify(dados) });
  return resp.json();
}

// No teste: passar mock do httpClient
```

---

## Mockando Tempo

```javascript
function criarRelogio(tempoInicial = 0) {
  let agora = tempoInicial;

  return {
    now() { return agora; },
    avancar(ms) { agora += ms; },
    Date: class extends Date {
      constructor() { super(agora); }
    }
  };
}

const relogio = criarRelogio(1000);
console.log(relogio.now()); // 1000
relogio.avancar(5000);
console.log(relogio.now()); // 6000
```

---

## Erros Comuns

1. **Mockar demais**: Se voce mocka tudo, nao esta testando nada
2. **Mock fragil**: Mock que conhece detalhes de implementacao
3. **Nao restaurar mocks**: Mocks de globals (`Date`, `console`) devem ser restaurados
4. **Stub que nao corresponde**: Stub retorna dados que a API real nunca retornaria

## Modelo Mental

Mock = controle remoto para dependencias. Voce decide o que cada dependencia retorna e pode verificar se foi chamada corretamente. Quanto menos mocks, melhor — so mock o que e externo (I/O, rede, tempo).
