import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { PessoaJuridica } from '../model/pessoa-juridica';

@Injectable({
  providedIn: 'root'
})
export class PessoaJuridicaService {


  private urlApi = environment.urlApi;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { 

  }

deletar(m : PessoaJuridica): void {

  this.http.post<String>(this.urlApi + 'deletePessoaJuridicia', m).subscribe({

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

salvarpj(m: PessoaJuridica){

return this.http.post<String>(this.urlApi + 'salvarPj', m).subscribe({
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



listarPj(pagina: Number){
  return this.http.get<PessoaJuridica[]>(this.urlApi + 'listaPorPagePj/' + this.loginService.codEmpresa() + '/' + pagina);
}


buscarPorId(id: any){
  return this.http.get<PessoaJuridica>(this.urlApi + 'buscarPjId/' + id);
}

buscarPorDescPj(val:String){
  return this.http.get<PessoaJuridica[]>(this.urlApi + 'buscarPorNomePj/' + val + '/' + this.loginService.codEmpresa());
}

qtdPagina() {
  return this.http.get<BigInteger>(this.urlApi + 'qtdPaginaPj/' + this.loginService.codEmpresa());
}

}
