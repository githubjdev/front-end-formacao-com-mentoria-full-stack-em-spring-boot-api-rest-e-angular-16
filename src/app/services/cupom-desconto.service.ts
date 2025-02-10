import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { CupomDesconto } from '../model/cupom-desconto';

@Injectable({
  providedIn: 'root'
})
export class CupomDescontoService {


  private urlApi = environment.urlApi;

    constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { 
  
    }

  listaCupDesconto(){
    return this.http.get<CupomDesconto[]>(this.urlApi + 'listaCupomDesc/' + this.loginService.codEmpresa());
  }




    deletar(c: CupomDesconto): void {
      this.http.post<String>(this.urlApi + 'deletarCupDesc', c).subscribe({
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




      salvarCd(fm : CupomDesconto) {
        return this.http.post<String>(this.urlApi + 'salvarCupDesc', fm).subscribe({
             next: (res) => {
                  var varResposta = JSON.stringify(res);
                  var jsonResposta = JSON.parse(varResposta);
    
                  if (jsonResposta.error != undefined){
                      alert(jsonResposta.error);
                  }else{
                    alert('Salvo com sucesso ID: ' + jsonResposta.id);
                  }
             },
             error: (error) => {
               alert(error.error.error);
             }
        });
      }


}
