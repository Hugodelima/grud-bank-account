import { BlobOptions } from "buffer";
import ContaCorrente from "./ContaCorrente";
import ContaPoupanca from "./ContaPoupanca";

abstract class ContaBancaria{
    private readonly _numeroConta:string;
    private _saldo:number;
    constructor(numeroConta:string, saldo:number){
        this._numeroConta = numeroConta;
        this._saldo = saldo;
    }

    public abstract sacar(valor:number):boolean;
    public abstract depositar(valor:number):void;

    public transferir(valor: number, objeto: ContaBancaria): void {
        const saqueEfetuado = this.sacar(valor);
        if (saqueEfetuado) {
            objeto.depositar(valor);
            console.log('Transferido com sucesso');
        }else{
            console.log('Não foi possivel fazer a transferência')
        }
    }
    
    
    public get _NumeroConta():string{return this._numeroConta};
    public get _Saldo():number{return this._saldo};
    public set _Saldo(valor:number){this._saldo = valor};

}

export default ContaBancaria;