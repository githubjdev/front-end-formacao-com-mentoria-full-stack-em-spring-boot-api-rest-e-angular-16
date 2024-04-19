import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  titulologin = 'Login da loja vitual jdev';

  constructor (private fb: FormBuilder, private loginService: LoginService) {

  }



   /*Pegar dados do formulário */
   loginForm = this.fb.group({
    id:[],
    login: [null, Validators.required],
    senha:[null, Validators.required]
   });
 
   /*Trasnformar em objeto */
   loginObjeto(): Usuario {
     return {
       login: this.loginForm.get('login')?.value!,
       senha: this.loginForm.get('senha')?.value!
     }
   }
 
   fazerLogin() {
     const usuario = this.loginObjeto();
 
     this.loginService.logar(usuario);
     
     console.info('dado de login -> ' + usuario.login);
     console.info('dado de senha -> ' + usuario.senha);
   }
 
   recuperarSenha(){
 
     const usuario = this.loginObjeto();
 
     var login = usuario.login;
 
     console.info( '------> Login : ' +login)
 
     if (login == '' ){
       alert('Informe o login para recuperar a senha');
     }else{
        this.loginService.recuperarSenha(login);
     }
   }

}
