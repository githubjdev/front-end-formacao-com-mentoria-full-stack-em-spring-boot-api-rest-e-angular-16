import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { Acesso } from '../model/acesso';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {


  private urlApi = environment.urlApi;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { 

  }

deletar(m : Acesso): void {

  this.http.post<String>(this.urlApi + 'deleteAcesso', m).subscribe({

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

salvarAcesso(m: Acesso){

return this.http.post<String>(this.urlApi + 'salvarAcesso', m).subscribe({
   next: (res) => {

      var varResposta = JSON.stringify(res);
      var jsonResposta = JSON.parse(varResposta);

      if (jsonResposta.error != undefined){
        alert(jsonResposta.error);
      }else{
        alert('Salvo com sucesso: ID: ' + jsonResposta.id);
      }

   },
   error: (error) => {
    
    console.info(error.error.error);
    alert(error.error.error);
   }

});

}



listarAcesso(pagina: Number){
  return this.http.get<Acesso[]>(this.urlApi + 'listaPorPageAcesso/' + this.loginService.codEmpresa() + '/' + pagina);
}


buscarPorId(id: any){
  return this.http.get<Acesso>(this.urlApi + 'obterAcesso/' + id);
}

buscarPorDescAcesso(val:String){
  return this.http.get<Acesso[]>(this.urlApi + 'buscarPorAcesso/' + val + '/' + this.loginService.codEmpresa());
}

qtdPagina() {
  return this.http.get<BigInteger>(this.urlApi + 'qtdPaginaAcesso/' + this.loginService.codEmpresa());
}

}
