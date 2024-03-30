"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContaBancaria_1 = __importDefault(require("./ContaBancaria"));
class ContaPoupanca extends ContaBancaria_1.default {
    taxaDeOperacao;
    constructor(numeroConta, saldo, taxaDeOperacao) {
        super(numeroConta, saldo);
        this.taxaDeOperacao = taxaDeOperacao;
    }
    sacar(valor) {
        if (valor + this.taxaDeOperacao > this._Saldo) {
            console.error(`Não foi possivel efetuar o saque, tente novamente!`);
            return false;
        }
        else {
            this._Saldo -= (valor + this.taxaDeOperacao);
            console.log("Saque efetuado com sucesso");
            return true;
        }
    }
    depositar(valor) {
        this._Saldo += (valor -= this.taxaDeOperacao);
    }
    mostrarDados() {
        console.log(`Número da conta: ${this._NumeroConta}\nSaldo da conta: R$${this._Saldo}\nTaxa de operação: R$${this.taxaDeOperacao}`);
    }
}
exports.default = ContaPoupanca;
