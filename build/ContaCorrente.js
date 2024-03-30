"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContaBancaria_1 = __importDefault(require("./ContaBancaria"));
class ContaCorrente extends ContaBancaria_1.default {
    _limite;
    constructor(numeroConta, saldo, limite) {
        super(numeroConta, saldo);
        this._limite = limite;
    }
    sacar(valor) {
        if (this._limite <= 0 || this._Saldo <= 0) {
            console.error("Sem limite ou saldo");
            return false;
        }
        else if (this._Saldo <= 0) {
            const saldoNegativo = this._Saldo -= valor;
            this._limite += saldoNegativo;
            console.log("Saque efetuado no limite visto que não tem saldo!");
            return true;
        }
        else if (this._Saldo >= valor) {
            this._Saldo -= valor;
            console.log("Saque efetuado diretamente do saldo bancário");
            return true;
        }
        else if (this._Saldo + this._limite <= valor) {
            this._limite = (this._Saldo + this._limite) - valor;
            this._Saldo = valor * -1;
            console.log("Foi efetuado o saque no limite e no saldo");
            return true;
        }
        else {
            return false;
        }
    }
    depositar(valor) {
        if (this._Saldo < 0) {
            this._Saldo -= valor * -1;
        }
        else {
            this._Saldo += valor;
        }
    }
    mostrarDados() {
        console.log(`Número da conta: ${this._NumeroConta}\nSaldo da conta: R$${this._Saldo}\nLimite: R$${this._limite}`);
    }
}
exports.default = ContaCorrente;
