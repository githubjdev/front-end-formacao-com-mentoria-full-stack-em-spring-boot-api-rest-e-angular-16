import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { Endereco } from '../model/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private urlApi = environment.urlApi;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { 

  }


  deletar(m : Endereco): void {

    if (m.id != null) {

      this.http.post<String>(this.urlApi + 'deleteEndereco', m).subscribe({
    
        next: (res) => {
    
          var varResposta = JSON.stringify(res);
          var jsonResposta = JSON.parse(varResposta);
    
          if(jsonResposta.error != undefined){
            alert(jsonResposta.error);
          }else{       
            alert(res);
          }
    
        },
        error: (error) => {
          alert('erro: ' + error);
          console.info(error);
        }
      });
    }
   
  }  


}
