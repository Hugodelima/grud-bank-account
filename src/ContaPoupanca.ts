import ContaBancaria from "./ContaBancaria";
import Imprimivel from "./Imprimivel";


class ContaPoupanca extends ContaBancaria implements Imprimivel {
    public taxaDeOperacao:number
    constructor(numeroConta:string, saldo:number, taxaDeOperacao:number){
        super(numeroConta,saldo)
        this.taxaDeOperacao = taxaDeOperacao
    }
    public sacar(valor: number): boolean {
        if (valor + this.taxaDeOperacao > this._Saldo){
            console.error(`Não foi possivel efetuar o saque, tente novamente!`)
            return false
        }else{
            this._Saldo -= (valor + this.taxaDeOperacao)
            console.log("Saque efetuado com sucesso")
            return true
        }
        
    }
    public depositar(valor: number): void {
        this._Saldo += (valor -= this.taxaDeOperacao)
    }

    mostrarDados():void{
        console.log(`Número da conta: ${this._NumeroConta}\nSaldo da conta: R$${this._Saldo}\nTaxa de operação: R$${this.taxaDeOperacao}`)
    }
}

export default ContaPoupanca;