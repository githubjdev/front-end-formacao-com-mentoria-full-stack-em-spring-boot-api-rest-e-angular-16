import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CategoriaProduto } from '../model/categoria-produto';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProdutoService {


  private urlApi = environment.urlApi;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { 

  }

deletar(cat : CategoriaProduto): void {

  this.http.post<String>(this.urlApi + 'deleteCategoria', cat).subscribe({

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

salvarCategoriaProduto(categoriaProduto: CategoriaProduto){

return this.http.post<String>(this.urlApi + 'salvarCategoria', categoriaProduto).subscribe({
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



listarCategoriaProduto(pagina: Number){
  return this.http.get<CategoriaProduto[]>(this.urlApi + 'listaPorPageCategoriaProduto/' + this.loginService.codEmpresa() + '/' + pagina);
}


buscarPorId(id: any){
  return this.http.get<CategoriaProduto>(this.urlApi + 'buscarPorId/' + id);
}

buscarPorDescCatgoria(val:String){
  return this.http.get<CategoriaProduto[]>(this.urlApi + 'buscarPorDescCatgoria/' + val + '/' + this.loginService.codEmpresa());
}

qtdPagina() {
  return this.http.get<BigInteger>(this.urlApi + 'qtdPaginaCategoriaProduto/' + this.loginService.codEmpresa());
}

}
