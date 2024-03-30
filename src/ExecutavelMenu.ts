import Banco from "./Banco";
import ContaBancaria from "./ContaBancaria";
import ContaCorrente from "./ContaCorrente";
import ContaPoupanca from "./ContaPoupanca";
import Relatorio from "./Relatorio";

const inquirer = require("inquirer")

class ExecutavelMenu {
    private _banco:Banco

    constructor(){
        this._banco = new Banco();
    }
    
    public mostrarMenu():void{
        inquirer 
            .prompt([
                {
                    type:"list",
                    name:"opcaoMenu",
                    message: "Selecione a opção desejada:",
                    choices: ["Criar Conta", "Selecionar Conta", "Remover Conta","Gerar Relatório","Finalizar"],
                },
            ])
            .then((respostas:{opcaoMenu:string}) => {
                const resp = respostas.opcaoMenu
          
                if (resp === "Criar Conta") {
                    inquirer
                        .prompt([
                            {
                                type:"list",
                                name:"opcaoConta",
                                message:"Seleciona qual tipo de conta",
                                choices: ["Conta Poupança", "Conta Corrente"]
                            },
                        ])
                        .then((respostas:{opcaoConta:string})=>{
                            const resp = respostas.opcaoConta

                            if (resp === "Conta Poupança"){
                                this.criarContaPoupanca()
                                
                                
                                
                            }else if (resp === "Conta Corrente"){
                                this.criarContaCorrente()
                                
                            }
                            
                        }).catch((err:any) =>{
                            console.error(err)
                        })
                } else if (resp === "Selecionar Conta") {
                    inquirer 
                        .prompt ([
                            {
                                type:"input",
                                name:"numeroConta",
                                message:"Qual é o número da conta",
                            },
                        ])
                        .then((respostaProcurarConta: {numeroConta: string}) => {
                            const bancoBusca = this._banco.procurarConta(respostaProcurarConta.numeroConta)
                            if (bancoBusca !== null){
                                console.log("Encontrado a conta!")
                                this.menuProcurarConta(bancoBusca)
                                
                                
                            }else{
                                this.mostrarMenu()
                            }
                            
                        })
                        .catch((err: any) => {
                            console.log(err);
                        });
                    
                  
                } else if (resp === "Remover Conta") {
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "remover",
                                message: "Qual o número da conta?"
                            },
                        ])
                        .then((respostaremover: {remover: string}) => {
                            const numeroRemocao = (respostaremover.remover)

                            const objeto = this._banco.procurarConta(numeroRemocao)
                            if (objeto !== null){
                                this._banco.remover(objeto)
                            }
                            this.mostrarMenu()
                            
                            
                        })
                        .catch((err: any) => {
                            console.log(err);
                        });
                
                } else if (resp === "Gerar Relatório") {
                    this._banco.mostrarDados()
                    this.mostrarMenu()
                  
                }else if (resp === "Finalizar") {
                    console.log("Finalizando...")
                  return
                }
            })
            .catch((err:any) => {
                console.log(err);
            });
    }
    
    public criarContaPoupanca()    {
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
            .then((respostasConta: {numeroConta: string, saldo: string, taxa: string}) => {
                const numeroConta = respostasConta.numeroConta;
                const saldo = parseFloat(respostasConta.saldo);
                const taxa = parseFloat(respostasConta.taxa);

                const contapoupanca = new ContaPoupanca(numeroConta,saldo,taxa)
                this._banco.inserir(contapoupanca)
                this.mostrarMenu()
               
            })
            .catch((err: any) => {
                console.log(err);
            });
            
    }
    public criarContaCorrente()    {
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
            .then((respostasConta: {numeroConta: string, saldo: string, limite: string}) => {
                const numeroConta = respostasConta.numeroConta;
                const saldo = parseFloat(respostasConta.saldo);
                const limite = parseFloat(respostasConta.limite);

                const contacorrente = new ContaCorrente(numeroConta,saldo,limite)
                this._banco.inserir(contacorrente)
                this.mostrarMenu()
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    public menuProcurarConta(bancoBusca:ContaBancaria):void{
        inquirer 
            .prompt([
                {
                    type:"list",
                    name:"opcaoMenuProcurarConta",
                    message: "Selecione a opção desejada:",
                    choices: ["Depositar", "Sacar", "Transferir","Gerar Relatório","Retornar ao menu anterior"],
                },
            ])
            .then((respostas:{opcaoMenuProcurarConta:string}) => {
                const resp = respostas.opcaoMenuProcurarConta
          
                if (resp === "Depositar") {
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "deposito",
                                message: "Qual será o valor do déposito?"
                            },
                        ])
                        .then((respostaDeposito: {deposito: string}) => {
                            const deposito = parseFloat(respostaDeposito.deposito)
                            if (bancoBusca instanceof ContaCorrente){
                                bancoBusca.depositar(deposito)
                                console.log("Deposito efetuado com sucesso")
                            }else if(bancoBusca instanceof ContaPoupanca){
                                bancoBusca.depositar(deposito)
                                console.log("Deposito efetuado com sucesso")
                            }

                           
                            this.menuProcurarConta(bancoBusca)
                        })
                        .catch((err: any) => {
                            console.log(err);
                        });
                    
                } else if (resp === "Sacar") {
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "saque",
                                message: "Qual será o valor do saque?"
                            },
                        ])
                        .then((respostaSaque: {saque: string}) => {
                            const saque = parseFloat(respostaSaque.saque)

                            if (bancoBusca instanceof ContaCorrente){
                                bancoBusca.sacar(saque)
                            }else if(bancoBusca instanceof ContaPoupanca){
                                bancoBusca.sacar(saque)
                            }
                            this.menuProcurarConta(bancoBusca)
                        })
                        .catch((err: any) => {
                            console.log(err);
                        });
                   
                } else if (resp === "Transferir") {
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
                        .then((respostastransferencia: {transferencia: string, destinatario:string}) => {
                            const transferenciaValor = parseFloat(respostastransferencia.transferencia)
                            const destinatarioNumero = respostastransferencia.destinatario

                            const contaDestintario = this._banco.procurarConta(destinatarioNumero)
                            if (contaDestintario !== null){
                                if (bancoBusca instanceof ContaPoupanca){
                                    bancoBusca.transferir(transferenciaValor, contaDestintario)
                                }else if(bancoBusca instanceof ContaCorrente){
                                    bancoBusca.transferir(transferenciaValor, contaDestintario)
                                }
                                
                                
                            }else{
                                console.error("Esta conta não foi encontrada para fazer transferência")
                            }
                            this.menuProcurarConta(bancoBusca)
                            
                            
                        })
                        .catch((err: any) => {
                            console.log(err);
                        });
                  
                } else if (resp === "Gerar Relatório") {
                    const relatorio = new Relatorio()

                    if (bancoBusca instanceof ContaCorrente){
                        relatorio.GerarRelatorio(bancoBusca)
                    }else if(bancoBusca instanceof ContaPoupanca){
                        relatorio.GerarRelatorio(bancoBusca)
                    }
                    this.menuProcurarConta(bancoBusca)
                  
                }else if (resp === "Retornar ao menu anterior") {
                  this.mostrarMenu()
                }
            })
            .catch((err:any) => {
                console.log(err);
            });
        }
}

const executado = new ExecutavelMenu()
executado.mostrarMenu()