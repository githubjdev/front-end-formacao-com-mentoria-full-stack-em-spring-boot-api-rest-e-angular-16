import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { Usuario } from '../model/usuario';
import { UserPessoa } from '../model/user-pessoa';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private urlApi = environment.urlApi;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { 

  }



  listUserByEmpresa () {
    return this.http.get<Usuario[]>(this.urlApi + 'listUserByEmpresa/' + this.loginService.codEmpresa());
  }
  


  buscarPorId(id: any){
    return this.http.get<Usuario>(this.urlApi + 'userById/' + id);
  }


  salvarUserPessoa(u: UserPessoa) {
    return this.http.post<String>(this.urlApi + 'updateUserPessoa', u).subscribe({
      next: (res) => {



        var varResposta = JSON.stringify(res);
        var jsonResposta = JSON.parse(varResposta);
  
        if (jsonResposta.error != undefined){
          alert(jsonResposta.error);
        }else{
          alert(res);
        }
  
            
      },
      error: (error) => {
        alert(error.error.error);
      }
    });
  }


  adicionaRemoreAcesso(idAcesso: any, idUser : any) {

    var userAcesso = idAcesso + '-' + idUser;

    return this.http.post<String>(this.urlApi + 'adicionaRemoreAcesso', userAcesso).subscribe({

      next: (res) => {
        var varResposta = JSON.stringify(res);
        var jsonResposta = JSON.parse(varResposta);
  
        if (jsonResposta.error != undefined){
          alert(jsonResposta.error);
        }else{
          alert(res);
        }
  
      },
      error: (error) => {
        alert(error.error.error);
      }
      
    });

  }

}
