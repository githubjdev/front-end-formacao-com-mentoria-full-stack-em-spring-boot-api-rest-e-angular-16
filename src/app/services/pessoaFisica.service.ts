import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { PessoaFisica } from '../model/pessoa-fisica';
import { PessoaFisicaComponent } from '../components/pessoa-fisica/pessoa-fisica.component';

@Injectable({
  providedIn: 'root'
})
export class PessoaFisicaService {


  private urlApi = environment.urlApi;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { 

  }

deletar(m : PessoaFisica): void {

  this.http.post<String>(this.urlApi + 'deletePessoaFisica', m).subscribe({

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

salvarpf(m: PessoaFisica){

return this.http.post<String>(this.urlApi + 'salvarPf', m).subscribe({
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




salvarpf2(m: PessoaFisica, c: PessoaFisicaComponent){

  return this.http.post<String>(this.urlApi + 'salvarPf', m).subscribe({
     next: (res) => {
  
        var varResposta = JSON.stringify(res);
        var jsonResposta = JSON.parse(varResposta);
  
        if (jsonResposta.error != undefined){
          alert(jsonResposta.error);
        }else{
          c.novo();
          alert('Salvo com sucesso: ID: ' + jsonResposta.id);
        }
  
     },
     error: (error) => {
      
      console.info(error.error.error);
      alert(error.error.error);
     }
  
  });
  
  }


listarPf(pagina: Number){
  return this.http.get<PessoaFisica[]>(this.urlApi + 'listaPorPagePf/' + this.loginService.codEmpresa() + '/' + pagina);
}


buscarPorId(id: any){
  return this.http.get<PessoaFisica>(this.urlApi + 'buscarPfId/' + id);
}

buscarPorDescPf(val:String){
  return this.http.get<PessoaFisica[]>(this.urlApi + 'buscarPorNomePf/' + val + '/' + this.loginService.codEmpresa());
}

qtdPagina() {
  return this.http.get<BigInteger>(this.urlApi + 'qtdPaginaPf/' + this.loginService.codEmpresa());
}

}
