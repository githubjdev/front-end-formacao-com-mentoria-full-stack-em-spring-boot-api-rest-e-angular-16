import { environment } from "src/environments/environment";
import { PessoaJuridica } from "./pessoa-juridica";

export class CupomDesconto {

        constructor(){}
    
        id?: Number;
        codDesc?: String;
        dataValidadeCupom?: Date;
        valorRealDesc?: Number;
        valorPorcentDesc?: Number;
        empresa?: PessoaJuridica;
}
