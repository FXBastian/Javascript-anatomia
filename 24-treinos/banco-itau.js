// ============================
// 🏦 Sistema Bancário - Itaú
// ============================

const readline = require('readline')

// Cria interface para ler dados do usuário no terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Função auxiliar para fazer perguntas e esperar resposta
function perguntar(texto) {
    return new Promise(resolve => rl.question(texto, resolve))
}

// Converte valor digitado pelo usuário (aceita vírgula ou ponto)
// Ex: "1.500,75" ou "1500.75" → 1500.75
function converterValor(texto) {
    // Se tem vírgula como decimal (formato BR: 1.500,75)
    if (texto.includes(',')) {
        texto = texto.replace(/\./g, '').replace(',', '.')
    }
    return parseFloat(texto)
}

// Formata número para o padrão brasileiro: 1.500,75
function formatarBRL(valor) {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Objeto que guarda os dados da conta do usuário
const conta = {
    banco: 'Itaú',
    titular: '',
    contaCorrente: {
        numero: '',
        saldo: 0
    },
    contaPoupanca: {
        numero: '',
        saldo: 0
    }
}

// ---- FUNÇÕES DO BANCO ----

function exibirSaldo() {
    console.log('\n===== SALDO =====')
    console.log(`Titular: ${conta.titular}`)
    console.log(`Conta Corrente (${conta.contaCorrente.numero}): R$ ${formatarBRL(conta.contaCorrente.saldo)}`)
    console.log(`Conta Poupança (${conta.contaPoupanca.numero}): R$ ${formatarBRL(conta.contaPoupanca.saldo)}`)
    console.log('=================\n')
}

function depositar(tipo, valor) {
    if (valor <= 0) {
        console.log('Valor inválido para depósito.')
        return false
    }

    if (tipo === '1') {
        conta.contaCorrente.saldo += valor
        console.log(`Depósito de R$ ${formatarBRL(valor)} na Conta Corrente realizado com sucesso!`)
    } else {
        conta.contaPoupanca.saldo += valor
        console.log(`Depósito de R$ ${formatarBRL(valor)} na Conta Poupança realizado com sucesso!`)
    }
    return true
}

function sacar(tipo, valor) {
    if (valor <= 0) {
        console.log('Valor inválido para saque.')
        return false
    }

    if (tipo === '1') {
        if (valor > conta.contaCorrente.saldo) {
            console.log('Saldo insuficiente na Conta Corrente!')
            return false
        }
        conta.contaCorrente.saldo -= valor
        console.log(`Saque de R$ ${formatarBRL(valor)} da Conta Corrente realizado com sucesso!`)
    } else {
        if (valor > conta.contaPoupanca.saldo) {
            console.log('Saldo insuficiente na Conta Poupança!')
            return false
        }
        conta.contaPoupanca.saldo -= valor
        console.log(`Saque de R$ ${formatarBRL(valor)} da Conta Poupança realizado com sucesso!`)
    }
    return true
}

function transferir(origem, valor) {
    if (valor <= 0) {
        console.log('Valor inválido para transferência.')
        return false
    }

    if (origem === '1') {
        if (valor > conta.contaCorrente.saldo) {
            console.log('Saldo insuficiente na Conta Corrente!')
            return false
        }
        conta.contaCorrente.saldo -= valor
        conta.contaPoupanca.saldo += valor
        console.log(`Transferência de R$ ${formatarBRL(valor)} da Corrente para Poupança realizada!`)
    } else {
        if (valor > conta.contaPoupanca.saldo) {
            console.log('Saldo insuficiente na Conta Poupança!')
            return false
        }
        conta.contaPoupanca.saldo -= valor
        conta.contaCorrente.saldo += valor
        console.log(`Transferência de R$ ${formatarBRL(valor)} da Poupança para Corrente realizada!`)
    }
    return true
}

// ---- MENUS ----

async function menuPrincipal() {
    console.log(`\n====== ${conta.banco} ======`)
    console.log(`Bem-vindo(a), ${conta.titular}!`)
    console.log('1 - Consultar Saldo')
    console.log('2 - Depositar')
    console.log('3 - Sacar')
    console.log('4 - Transferir entre contas')
    console.log('0 - Sair')
    console.log('====================')

    const opcao = await perguntar('Escolha uma opção: ')

    switch (opcao) {
        case '1':
            exibirSaldo()
            break

        case '2': {
            const tipoConta = await perguntar('Depositar em: 1 - Conta Corrente | 2 - Conta Poupança: ')
            const valor = converterValor(await perguntar('Valor do depósito: R$ '))
            depositar(tipoConta, valor)
            break
        }

        case '3': {
            const tipoConta = await perguntar('Sacar de: 1 - Conta Corrente | 2 - Conta Poupança: ')
            const valor = converterValor(await perguntar('Valor do saque: R$ '))
            sacar(tipoConta, valor)
            break
        }

        case '4': {
            const origem = await perguntar('Transferir de: 1 - Corrente para Poupança | 2 - Poupança para Corrente: ')
            const valor = converterValor(await perguntar('Valor da transferência: R$ '))
            transferir(origem, valor)
            break
        }

        case '0':
            console.log(`\nObrigado por usar o ${conta.banco}! Até logo, ${conta.titular}.`)
            rl.close()
            return

        default:
            console.log('Opção inválida! Tente novamente.')
    }

    // Volta ao menu após cada operação
    await menuPrincipal()
}

// ---- CADASTRO / LOGIN ----

async function cadastro() {
    console.log('================================')
    console.log('   Bem-vindo ao Banco Itaú!')
    console.log('================================\n')

    conta.titular = await perguntar('Digite seu nome completo: ')
    conta.contaCorrente.numero = await perguntar('Número da Conta Corrente: ')
    conta.contaPoupanca.numero = await perguntar('Número da Conta Poupança: ')

    const saldoInicial = converterValor(await perguntar('Depósito inicial na Conta Corrente: R$ '))
    if (saldoInicial > 0) {
        conta.contaCorrente.saldo = saldoInicial
    }

    console.log('\nConta criada com sucesso!')
    exibirSaldo()

    await menuPrincipal()
}

async function login() {
    conta.titular = await perguntar('Digite seu nome: ')
    conta.contaCorrente.numero = await perguntar('Número da Conta Corrente: ')

    console.log(`\nBem-vindo de volta, ${conta.titular}!`)
    await menuPrincipal()
}

async function inicio() {
    console.log('================================')
    console.log('       Banco Itaú')
    console.log('================================')
    console.log('1 - Já tenho conta (entrar)')
    console.log('2 - Abrir nova conta')
    console.log('================================')

    const opcao = await perguntar('Escolha uma opção: ')

    if (opcao === '1') {
        await login()
    } else if (opcao === '2') {
        await cadastro()
    } else {
        console.log('Opção inválida!')
        await inicio()
    }
}

// Inicia o programa
inicio()
