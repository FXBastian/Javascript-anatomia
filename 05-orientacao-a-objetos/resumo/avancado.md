# Orientacao a Objetos - Visao Avancada

## Funcionamento real do JavaScript
`class` melhora legibilidade, mas metodos vao para o prototipo. Entender isso explica compartilhamento de comportamento entre instancias.

```javascript
class Animal {
  falar() {
    return "som";
  }
}

const a1 = new Animal();
const a2 = new Animal();
console.log(a1.falar === a2.falar); // true
```

## Cadeia de prototipos
Quando uma propriedade nao existe no objeto atual, a engine sobe na cadeia (`[[Prototype]]`) ate achar ou chegar em `null`.

## Pegadinhas comuns
- Esquecer `new` em funcao construtora antiga
- Reatribuir metodos por instancia sem necessidade (custo de memoria)
- Heranca profunda criando acoplamento rigido

## Comparacoes importantes
- Heranca: compartilha API, porem aumenta dependencia entre niveis
- Composicao: monta comportamento por partes, tende a escalar melhor

## Modelo mental
Use classe quando ha identidade e ciclo de vida claro. Use funcoes/composicao quando o problema e apenas transformar dados.
