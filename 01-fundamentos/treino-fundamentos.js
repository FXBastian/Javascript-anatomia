// =============================================
// TREINO — FUNDAMENTOS DE JAVASCRIPT
// =============================================

// ----- VARIÁVEIS -----

// var nome = "joao";    // var → declara uma variável com escopo de função (não de bloco)
                         // nome → nome da variável (identificador)
                         // = → operador de atribuição (armazena o valor do lado direito na variável)
                         // "joao" → string (texto entre aspas duplas)
                         // ; → ponto e vírgula, finaliza a instrução

// var idade = 20;       // idade → variável que guarda um número
                         // 20 → tipo number (número inteiro, sem aspas)

// ----- CONDICIONAL (if / else) -----

// if (idade >= 18) {                              // if → "se" — testa uma condição
                                                   // ( ) → parênteses obrigatórios envolvendo a condição
                                                   // idade >= 18 → condição: idade maior ou igual a 18
                                                   // >= → operador de comparação "maior ou igual"
                                                   // { → abre o bloco de código que executa SE a condição for verdadeira

//     console.log(nome + " é maior de idade");    // console → objeto global do navegador/Node
                                                   // .log() → método que imprime no terminal/console
                                                   // nome + " é maior de idade" → concatenação de strings com +
                                                   // + → aqui age como operador de concatenação (junta textos)

// } else {                                        // } → fecha o bloco do if
                                                   // else → "senão" — executa se a condição do if for FALSA
                                                   // { → abre o bloco do else

//     console.log(nome + " é menor de idade");    // mesmo padrão: imprime texto concatenado

// }                                               // } → fecha o bloco do else

// ----- FUNÇÃO -----

// function saudacao(nome) {       // function → palavra-chave que declara uma função
                                   // saudacao → nome da função (identificador escolhido por você)
                                   // (nome) → parâmetro — variável local que recebe o valor quando a função é chamada
                                   // { → abre o corpo da função

//     console.log("Olá, " + nome + "!");   // imprime "Olá, " + valor do parâmetro + "!"
                                             // a concatenação junta 3 partes em uma string só

// }                               // } → fecha o corpo da função

// saudacao("Maria");              // saudacao() → chama/invoca a função
                                   // "Maria" → argumento — valor real passado para o parâmetro 'nome'
                                   // resultado no console: "Olá, Maria!"

// ----- LOOP FOR + setTimeout (PEGADINHA CLÁSSICA) -----

for (var i = 0; i < 5; i++) {     // for → loop (repete um bloco de código)
                                   // var i = 0 → inicialização: cria a variável i com valor 0
                                   // i < 5 → condição: enquanto i for menor que 5, continua o loop
                                   // i++ → incremento: após cada volta, soma 1 ao i (i = i + 1)
                                   // { → abre o bloco que será repetido
                                   // ATENÇÃO: var tem escopo de FUNÇÃO, não de bloco

    setTimeout(function() {        // setTimeout() → função da Web API que agenda execução futura
                                   // function() { → callback: função anônima passada como argumento
                                   // essa função NÃO executa agora — vai para a fila (Callback Queue)

        console.log(i);            // imprime o valor de i
                                   // PEGADINHA: quando o callback executa (após 1s), o loop JÁ TERMINOU
                                   // como var i tem escopo de função, todos os callbacks compartilham o MESMO i
                                   // nesse momento i vale 5 (parou quando i < 5 ficou falso)

    }, 1000);                      // 1000 → milissegundos (1 segundo de delay)
                                   // ) → fecha o setTimeout
                                   // ; → finaliza a instrução
}                                  // } → fecha o bloco do for

// RESULTADO: imprime 5 cinco vezes (não 0, 1, 2, 3, 4)
// POR QUÊ? var não cria escopo no bloco do for.
//           Todos os 5 callbacks apontam para a MESMA variável i,
//           que já vale 5 quando eles finalmente executam.
//
// SOLUÇÃO: trocar var por let
//   for (let i = 0; i < 5; i++) { ... }
//   let cria escopo de BLOCO → cada volta do loop tem seu próprio i

