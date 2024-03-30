import ContaCorrente from "./ContaCorrente";
import ContaPoupanca from "./ContaPoupanca";
import Relatorio from "./Relatorio";

class Executavel{
    private _corrente: ContaCorrente
    private _poupanca: ContaPoupanca
    constructor(corrente: ContaCorrente, poupanca: ContaPoupanca){
        this._corrente = corrente
        this._poupanca = poupanca
    }

    executa():void{
        this._corrente.depositar(200) 
        this._poupanca.depositar(100)

        this._corrente.sacar(401) 
        this._poupanca.sacar(10)
        

        const relatorio = new Relatorio()
        relatorio.GerarRelatorio(this._corrente)
        relatorio.GerarRelatorio(this._poupanca)
        
    }
}

const corrente = new ContaCorrente('1234',0,200)
const poupanca = new ContaPoupanca('5678',0,6.50)

const executavel = new Executavel(corrente,poupanca)

executavel.executa()