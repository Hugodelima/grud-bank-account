import ContaBancaria from "./ContaBancaria"
import Imprimivel from "./Imprimivel"

class Banco implements Imprimivel{
    private _arraylist:Array<ContaBancaria>
    constructor(){
        this._arraylist = []
    }
    public inserir(objeto:ContaBancaria):void{
        this._arraylist.push(objeto)
        console.log("Criado com sucesso!")
    }
    public remover(objeto:ContaBancaria){
        for (let i = 0; i < this._arraylist.length; i++){
            if(this._arraylist[i] === objeto){
                this._arraylist.splice(i, 1)
                console.log("Removido com sucesso!")
                return
            }else{
                console.error("Não tem como remover este objeto na lista, já que ele não existe")
            }

        }
       
    }
    public procurarConta(numeroConta:string):any{
        for (let i = 0; i < this._arraylist.length ;i++){
            if(this._arraylist[i]._NumeroConta === numeroConta){
                return this._arraylist[i]
            }
           
        }
        console.error("Não foi encontrado esta conta!")
        return null
    }

    public mostrarDados():void{
        this._arraylist.forEach(element => {
            console.log(`Número da conta: ${element._NumeroConta}\nSaldo da conta: R$${element._Saldo}`)
        });
    }
}

export default Banco