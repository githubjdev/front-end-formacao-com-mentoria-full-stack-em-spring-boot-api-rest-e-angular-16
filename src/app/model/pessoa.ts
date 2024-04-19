import { Endereco } from "./endereco";
import { PessoaJuridica } from "./pessoa-juridica";

export class  Pessoa {

    
    id?: Number;
    nome?: String;
    email?: String;
    telefone?:String;
    tipoPessoa?: String;
    empresa?: PessoaJuridica;
    enderecos?: Endereco[];


    

    constructor(){    
      
    }
   
}
