# Orientacao a Objetos - Resumo

## Visao geral
Em JS, orientacao a objetos existe sobre prototipos. A sintaxe `class` organiza melhor, mas por baixo continua sendo prototipo.

## Conceitos principais
- Classe e instancia
- Metodo de instancia e metodo estatico
- Heranca com `extends`
- Encapsulamento por convencao e campos privados

## Exemplo
```javascript
class Conta {
  #saldo = 0;

  depositar(valor) {
    this.#saldo += valor;
  }

  get saldo() {
    return this.#saldo;
  }
}
```

## Boas praticas
- Modele comportamento, nao apenas dados
- Prefira composicao antes de heranca profunda
- Mantenha invariantes dentro da classe

## Fluxo Mental
Pense em objetos como entidades com estado e regras. A classe define o contrato, e cada instancia aplica esse contrato ao proprio estado.
