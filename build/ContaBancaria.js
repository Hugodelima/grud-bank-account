"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContaBancaria {
    _numeroConta;
    _saldo;
    constructor(numeroConta, saldo) {
        this._numeroConta = numeroConta;
        this._saldo = saldo;
    }
    transferir(valor, objeto) {
        const saqueEfetuado = this.sacar(valor);
        if (saqueEfetuado) {
            objeto.depositar(valor);
            console.log('Transferido com sucesso');
        }
        else {
            console.log('Não foi possivel fazer a transferência');
        }
    }
    get _NumeroConta() { return this._numeroConta; }
    ;
    get _Saldo() { return this._saldo; }
    ;
    set _Saldo(valor) { this._saldo = valor; }
    ;
}
exports.default = ContaBancaria;
