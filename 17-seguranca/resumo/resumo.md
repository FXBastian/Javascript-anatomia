# Seguranca em JavaScript - Resumo

## Visao geral
Seguranca aqui envolve comparacoes, coercoes e validacoes para evitar comportamento inesperado e vulnerabilidades basicas.

## Conceitos principais
- Diferenca entre `==` e `===`
- Coercao implicita pode mascarar erro
- Sanitizacao e validacao de entrada
- Menor privilegio no acesso a dados sensiveis

## Exemplo
```javascript
const entrada = "0";
if (entrada === 0) {
  // nao entra, tipos diferentes
}
```

## Boas praticas
- Prefira comparacao estrita
- Nunca confie em entrada do usuario
- Evite inserir texto nao confiavel com `innerHTML`

## Fluxo Mental
Seguranca comeca em pequenas decisoes: comparar corretamente, validar cedo e limitar superficie de ataque no front e no back.
