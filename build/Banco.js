"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Banco {
    _arraylist;
    constructor() {
        this._arraylist = [];
    }
    inserir(objeto) {
        this._arraylist.push(objeto);
        console.log("Criado com sucesso!");
    }
    remover(objeto) {
        for (let i = 0; i < this._arraylist.length; i++) {
            if (this._arraylist[i] === objeto) {
                this._arraylist.splice(i, 1);
                console.log("Removido com sucesso!");
                return;
            }
            else {
                console.error("Não tem como remover este objeto na lista, já que ele não existe");
            }
        }
    }
    procurarConta(numeroConta) {
        for (let i = 0; i < this._arraylist.length; i++) {
            if (this._arraylist[i]._NumeroConta === numeroConta) {
                return this._arraylist[i];
            }
        }
        console.error("Não foi encontrado esta conta!");
        return null;
    }
    mostrarDados() {
        this._arraylist.forEach(element => {
            console.log(`Número da conta: ${element._NumeroConta}\nSaldo da conta: R$${element._Saldo}`);
        });
    }
}
exports.default = Banco;
