import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { Observable, retry } from 'rxjs';
import { async } from '@angular/core/testing';
import { PessoaJuridica } from '../model/pessoa-juridica';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlApi = environment.urlApi ;

  private verificaAcesso = new Boolean(false);

  constructor(private http: HttpClient, private router: Router) {  

  }


  usuarioLogado(){

    var autorization = ''+ localStorage.getItem('Authorization');

    return autorization !== '' && autorization !== null && autorization !== 'null';
  }


  recuperarSenha(login: String) {

    return this.http.post<String>(this.urlApi + 'recuperarSenha', login).subscribe({

       next: (res) => {
          
        var respJson = JSON.stringify(res);
        var resposta = JSON.parse(respJson);

          alert(resposta.msg);
       },
       error: (error) => {
         var respJson = JSON.stringify(error);
         var resposta = JSON.parse(respJson);

          alert(resposta.msg);
       }

    });
  }


  codEmpresa(){
    return localStorage.getItem("empresa");
  }

  objetoEmpresa(): PessoaJuridica{

    var p = new PessoaJuridica();
    p.id = Number(this.codEmpresa());

    return p;
  }




  logar(usuario: Usuario) {
    return this.http.post<String>(this.urlApi + 'login', usuario).subscribe({

        next: (res) => {
          
        var respJson = JSON.stringify(res);
        var jwt = JSON.parse(respJson);

        localStorage.setItem("Authorization", jwt.Authorization);   
        localStorage.setItem("username", jwt.username);   
        localStorage.setItem("empresa", jwt.empresa);     
          
         this.router.navigate(['home']);
          
        },

        error: (error) => {
          
          console.info(error);
          alert('Deu erro: ' + error.error.text);
        }

    });
  }




  deslogar(): void {
    localStorage.setItem("Authorization",'');   
    localStorage.setItem("username", '');     
      
     this.router.navigate(['login']);
  }

}
