import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { FormaPagamento } from '../model/forma-pagamento';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  private urlApi = environment.urlApi;

  
  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { 

  }


  listaFormaPagamento(){
    return this.http.get<FormaPagamento[]>(this.urlApi + 'listaFormaPagamento/' + this.loginService.codEmpresa());
  }


  deletar(c: FormaPagamento): void {
    this.http.post<String>(this.urlApi + 'deletarFormaPagamento', c).subscribe({
      next: (res) =>{
           var varResposta = JSON.stringify(res);
           var jsonResposta = JSON.parse(varResposta);

           if (jsonResposta.error != undefined){
              alert(jsonResposta.error);
           }else {
              alert(res);
           }
      },

      error: (error) => {
        alert('Error: ' + error);
        console.info(error)
      }
    });
  }


}
