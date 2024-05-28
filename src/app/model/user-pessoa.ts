import { Acesso } from "./acesso";
import { Pessoa } from "./pessoa";

export class UserPessoa {

    id?: Number;
    login?: String;
    senha?: String;
    pessoa?: Pessoa;
    acessos?: Acesso[];
}
