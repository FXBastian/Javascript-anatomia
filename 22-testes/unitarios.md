# Testes Unitarios

## O que sao?

Testes que verificam o comportamento de uma unidade isolada de codigo (funcao, metodo, classe). Sao rapidos, deterministicos e independentes.

## Por que existem?

- Detectar bugs antes de chegar a producao
- Documentar o comportamento esperado do codigo
- Permitir refatoracao com confianca
- Feedback rapido durante desenvolvimento

## Anatomia de um Teste: AAA

```
Arrange → Preparar dados e contexto
Act     → Executar a funcao/metodo
Assert  → Verificar o resultado
```

---

## Mini Framework de Testes (do zero)

```javascript
let totalTestes = 0;
let passaram = 0;
let falharam = 0;

function teste(descricao, fn) {
  totalTestes++;
  try {
    fn();
    passaram++;
    console.log(`  ✓ ${descricao}`);
  } catch (erro) {
    falharam++;
    console.log(`  ✗ ${descricao}`);
    console.log(`    ${erro.message}`);
  }
}

function assert(condicao, mensagem = "Assertion failed") {
  if (!condicao) throw new Error(mensagem);
}

assert.equal = (real, esperado) => {
  if (real !== esperado) {
    throw new Error(`Esperado: ${esperado}, Recebido: ${real}`);
  }
};

assert.deepEqual = (real, esperado) => {
  if (JSON.stringify(real) !== JSON.stringify(esperado)) {
    throw new Error(`Esperado: ${JSON.stringify(esperado)}, Recebido: ${JSON.stringify(real)}`);
  }
};

assert.throws = (fn, mensagemEsperada) => {
  try {
    fn();
    throw new Error("Deveria ter lancado erro");
  } catch (e) {
    if (mensagemEsperada && !e.message.includes(mensagemEsperada)) {
      throw new Error(`Erro esperado: "${mensagemEsperada}", recebido: "${e.message}"`);
    }
  }
};

function resumo() {
  console.log(`\n${passaram}/${totalTestes} passaram, ${falharam} falharam`);
}
```

---

## Exemplo: Testando uma Funcao

```javascript
// Codigo a testar
function calcularDesconto(preco, porcentagem) {
  if (typeof preco !== "number" || preco < 0) throw new Error("Preco invalido");
  if (porcentagem < 0 || porcentagem > 100) throw new Error("Porcentagem invalida");
  return preco - (preco * porcentagem / 100);
}

// Testes
console.log("calcularDesconto:");

teste("calcula 10% de 100", () => {
  assert.equal(calcularDesconto(100, 10), 90);
});

teste("calcula 50% de 200", () => {
  assert.equal(calcularDesconto(200, 50), 100);
});

teste("0% retorna preco original", () => {
  assert.equal(calcularDesconto(100, 0), 100);
});

teste("100% retorna zero", () => {
  assert.equal(calcularDesconto(100, 100), 0);
});

teste("preco negativo lanca erro", () => {
  assert.throws(() => calcularDesconto(-10, 5), "Preco invalido");
});

teste("porcentagem > 100 lanca erro", () => {
  assert.throws(() => calcularDesconto(100, 150), "Porcentagem invalida");
});

resumo();
```

---

## Com Node.js Test Runner (Nativo)

```javascript
// A partir do Node 18+
import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("calcularDesconto", () => {
  it("calcula 10% de 100", () => {
    assert.equal(calcularDesconto(100, 10), 90);
  });

  it("lanca erro para preco negativo", () => {
    assert.throws(() => calcularDesconto(-1, 10), { message: /invalido/ });
  });
});
```

---

## Boas Praticas

1. **Um assert por teste** (quando possivel)
2. **Nomes descritivos**: "retorna null quando usuario nao existe"
3. **Testes independentes**: nenhum teste depende de outro
4. **Fast**: testes unitarios devem rodar em milissegundos
5. **Testar edge cases**: null, undefined, vazio, limites, tipos errados

## Piramide de Testes

```
        /\
       /E2E\         ← Poucos, lentos, caros
      /------\
     /Integracao\    ← Medio
    /------------\
   /  Unitarios   \  ← Muitos, rapidos, baratos
  /________________\
```

## Erros Comuns

- Testar implementacao ao inves de comportamento
- Testes que dependem de estado global
- Testar bibliotecas de terceiros ao inves do seu codigo
- Ignorar edge cases "porque nunca vai acontecer"

## Modelo Mental

Teste = contrato. Definir "dado X, espero Y". Se o teste quebra ao refatorar sem mudar comportamento, o teste esta errado.
