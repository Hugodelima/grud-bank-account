"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Banco_1 = __importDefault(require("./Banco"));
const ContaCorrente_1 = __importDefault(require("./ContaCorrente"));
const ContaPoupanca_1 = __importDefault(require("./ContaPoupanca"));
const Relatorio_1 = __importDefault(require("./Relatorio"));
const inquirer = require("inquirer");
class ExecutavelMenu {
    _banco;
    constructor() {
        this._banco = new Banco_1.default();
    }
    mostrarMenu() {
        inquirer
            .prompt([
            {
                type: "list",
                name: "opcaoMenu",
                message: "Selecione a opção desejada:",
                choices: ["Criar Conta", "Selecionar Conta", "Remover Conta", "Gerar Relatório", "Finalizar"],
            },
        ])
            .then((respostas) => {
            const resp = respostas.opcaoMenu;
            if (resp === "Criar Conta") {
                inquirer
                    .prompt([
                    {
                        type: "list",
                        name: "opcaoConta",
                        message: "Seleciona qual tipo de conta",
                        choices: ["Conta Poupança", "Conta Corrente"]
                    },
                ])
                    .then((respostas) => {
                    const resp = respostas.opcaoConta;
                    if (resp === "Conta Poupança") {
                        this.criarContaPoupanca();
                    }
                    else if (resp === "Conta Corrente") {
                        this.criarContaCorrente();
                    }
                }).catch((err) => {
                    console.error(err);
                });
            }
            else if (resp === "Selecionar Conta") {
                inquirer
                    .prompt([
                    {
                        type: "input",
                        name: "numeroConta",
                        message: "Qual é o número da conta",
                    },
                ])
                    .then((respostaProcurarConta) => {
                    const bancoBusca = this._banco.procurarConta(respostaProcurarConta.numeroConta);
                    if (bancoBusca !== null) {
                        console.log("Encontrado a conta!");
                        this.menuProcurarConta(bancoBusca);
                    }
                    else {
                        this.mostrarMenu();
                    }
                })
                    .catch((err) => {
                    console.log(err);
                });
            }
            else if (resp === "Remover Conta") {
                inquirer
                    .prompt([
                    {
                        type: "input",
                        name: "remover",
                        message: "Qual o número da conta?"
                    },
                ])
                    .then((respostaremover) => {
                    const numeroRemocao = (respostaremover.remover);
                    const objeto = this._banco.procurarConta(numeroRemocao);
                    if (objeto !== null) {
                        this._banco.remover(objeto);
                    }
                    this.mostrarMenu();
                })
                    .catch((err) => {
                    console.log(err);
                });
            }
            else if (resp === "Gerar Relatório") {
                this._banco.mostrarDados();
                this.mostrarMenu();
            }
            else if (resp === "Finalizar") {
                console.log("Finalizando...");
                return;
            }
        })
            .catch((err) => {
            console.log(err);
        });
    }
    criarContaPoupanca() {
        inquirer
            .prompt([
            {
                type: "input",
                name: "numeroConta",
                message: "Qual é o número da sua conta?"
            },
            {
                type: "input",
                name: "saldo",
                message: "Qual é o seu saldo?"
            },
            {
                type: "input",
                name: "taxa",
                message: "Qual será a taxa?"
            }
        ])
            .then((respostasConta) => {
            const numeroConta = respostasConta.numeroConta;
            const saldo = parseFloat(respostasConta.saldo);
            const taxa = parseFloat(respostasConta.taxa);
            const contapoupanca = new ContaPoupanca_1.default(numeroConta, saldo, taxa);
            this._banco.inserir(contapoupanca);
            this.mostrarMenu();
        })
            .catch((err) => {
            console.log(err);
        });
    }
    criarContaCorrente() {
        inquirer
            .prompt([
            {
                type: "input",
                name: "numeroConta",
                message: "Qual é o número da sua conta?"
            },
            {
                type: "input",
                name: "saldo",
                message: "Qual é o seu saldo?"
            },
            {
                type: "input",
                name: "limite",
                message: "Qual será o limite?"
            }
        ])
            .then((respostasConta) => {
            const numeroConta = respostasConta.numeroConta;
            const saldo = parseFloat(respostasConta.saldo);
            const limite = parseFloat(respostasConta.limite);
            const contacorrente = new ContaCorrente_1.default(numeroConta, saldo, limite);
            this._banco.inserir(contacorrente);
            this.mostrarMenu();
        })
            .catch((err) => {
            console.log(err);
        });
    }
    menuProcurarConta(bancoBusca) {
        inquirer
            .prompt([
            {
                type: "list",
                name: "opcaoMenuProcurarConta",
                message: "Selecione a opção desejada:",
                choices: ["Depositar", "Sacar", "Transferir", "Gerar Relatório", "Retornar ao menu anterior"],
            },
        ])
            .then((respostas) => {
            const resp = respostas.opcaoMenuProcurarConta;
            if (resp === "Depositar") {
                inquirer
                    .prompt([
                    {
                        type: "input",
                        name: "deposito",
                        message: "Qual será o valor do déposito?"
                    },
                ])
                    .then((respostaDeposito) => {
                    const deposito = parseFloat(respostaDeposito.deposito);
                    if (bancoBusca instanceof ContaCorrente_1.default) {
                        bancoBusca.depositar(deposito);
                        console.log("Deposito efetuado com sucesso");
                    }
                    else if (bancoBusca instanceof ContaPoupanca_1.default) {
                        bancoBusca.depositar(deposito);
                        console.log("Deposito efetuado com sucesso");
                    }
                    this.menuProcurarConta(bancoBusca);
                })
                    .catch((err) => {
                    console.log(err);
                });
            }
            else if (resp === "Sacar") {
                inquirer
                    .prompt([
                    {
                        type: "input",
                        name: "saque",
                        message: "Qual será o valor do saque?"
                    },
                ])
                    .then((respostaSaque) => {
                    const saque = parseFloat(respostaSaque.saque);
                    if (bancoBusca instanceof ContaCorrente_1.default) {
                        bancoBusca.sacar(saque);
                    }
                    else if (bancoBusca instanceof ContaPoupanca_1.default) {
                        bancoBusca.sacar(saque);
                    }
                    this.menuProcurarConta(bancoBusca);
                })
                    .catch((err) => {
                    console.log(err);
                });
            }
            else if (resp === "Transferir") {
                inquirer
                    .prompt([
                    {
                        type: "input",
                        name: "transferencia",
                        message: "Qual será o valor da transferência?"
                    },
                    {
                        type: "input",
                        name: "destinatario",
                        message: "Qual o número da conta que vai transferir"
                    },
                ])
                    .then((respostastransferencia) => {
                    const transferenciaValor = parseFloat(respostastransferencia.transferencia);
                    const destinatarioNumero = respostastransferencia.destinatario;
                    const contaDestintario = this._banco.procurarConta(destinatarioNumero);
                    if (contaDestintario !== null) {
                        if (bancoBusca instanceof ContaPoupanca_1.default) {
                            bancoBusca.transferir(transferenciaValor, contaDestintario);
                        }
                        else if (bancoBusca instanceof ContaCorrente_1.default) {
                            bancoBusca.transferir(transferenciaValor, contaDestintario);
                        }
                    }
                    else {
                        console.error("Esta conta não foi encontrada para fazer transferência");
                    }
                    this.menuProcurarConta(bancoBusca);
                })
                    .catch((err) => {
                    console.log(err);
                });
            }
            else if (resp === "Gerar Relatório") {
                const relatorio = new Relatorio_1.default();
                if (bancoBusca instanceof ContaCorrente_1.default) {
                    relatorio.GerarRelatorio(bancoBusca);
                }
                else if (bancoBusca instanceof ContaPoupanca_1.default) {
                    relatorio.GerarRelatorio(bancoBusca);
                }
                this.menuProcurarConta(bancoBusca);
            }
            else if (resp === "Retornar ao menu anterior") {
                this.mostrarMenu();
            }
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
const executado = new ExecutavelMenu();
executado.mostrarMenu();
