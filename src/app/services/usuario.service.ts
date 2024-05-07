import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { Usuario } from '../model/usuario';

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
  


}
