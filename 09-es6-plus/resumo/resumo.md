# ES6+ - Resumo

## Visao geral
ES6+ trouxe recursos que reduziram boilerplate e deixaram o codigo mais expressivo.

## Conceitos principais
- Template literals
- Destructuring
- Spread e rest
- Optional chaining
- Novas palavras-chave (`let`, `const`)

## Exemplo
```javascript
const usuario = { nome: "Mila", endereco: { cidade: "SP" } };
const { nome } = usuario;
const cidade = usuario.endereco?.cidade;
console.log(`${nome} mora em ${cidade}`);
```

## Boas praticas
- Use recursos modernos com intencao, nao por moda
- Prefira destructuring para leitura clara
- Optional chaining evita acesso inseguro em cadeias profundas

## Fluxo Mental
ES6+ e sobre legibilidade e seguranca semantica: menos codigo cerimonial e mais foco na regra de negocio.
