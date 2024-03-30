"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContaCorrente_1 = __importDefault(require("./ContaCorrente"));
const ContaPoupanca_1 = __importDefault(require("./ContaPoupanca"));
const Relatorio_1 = __importDefault(require("./Relatorio"));
class Executavel {
    _corrente;
    _poupanca;
    constructor(corrente, poupanca) {
        this._corrente = corrente;
        this._poupanca = poupanca;
    }
    executa() {
        this._corrente.depositar(200);
        this._poupanca.depositar(100);
        this._corrente.sacar(401);
        this._poupanca.sacar(10);
        const relatorio = new Relatorio_1.default();
        relatorio.GerarRelatorio(this._corrente);
        relatorio.GerarRelatorio(this._poupanca);
    }
}
const corrente = new ContaCorrente_1.default('1234', 0, 200);
const poupanca = new ContaPoupanca_1.default('5678', 0, 6.50);
const executavel = new Executavel(corrente, poupanca);
executavel.executa();
