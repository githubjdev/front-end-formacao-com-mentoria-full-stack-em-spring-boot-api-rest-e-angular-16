import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Acesso } from 'src/app/model/acesso';
import { UserPessoa } from 'src/app/model/user-pessoa';
import { AcessoService } from 'src/app/services/acesso.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {


  lista = new Array<UserPessoa>();
  acesso = new Array<Acesso>();
  userProdForm: FormGroup;
  user: UserPessoa;

  constructor (private fb: FormBuilder, private loginService: LoginService, private usuarioService: UsuarioService, private acessoService: AcessoService) {

    this.user = new UserPessoa();

    this.userProdForm = this.fb.group({
      id:[],
      login: [null, Validators.required],
      senha: [null, Validators.required],
      pessoa: [null, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required],
    }); 
  }


  ngOnInit(): void {
    
    this.listUser();
  }


  listUser(){

    this.usuarioService.listUserByEmpresa().subscribe({
      next: (res) => {
        this.lista = res;
        //console.info(this.lista);
      },
      error: (error) => {
        alert(error);
      }
    });
  }



  novo() : void {
    this.userProdForm = this.fb.group({
      id:[],
      login: [null, Validators.required],
      senha: [null, Validators.required],
      pessoa: [null, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required],
    }); 
  }

  userObjeto(): UserPessoa {
    return {
      id: this.userProdForm.get('id')?.value!,   
      login: this.userProdForm.get('login')?.value!,   
      senha: this.userProdForm.get('senha')?.value!,   
    }
  }

  editarUser(id : any): void {

   this.usuarioService.buscarPorId(id).subscribe({

     next: (data) => {

      this.user = data;

      console.info('userrrr ----------- ');
      console.info(this.user.acessos);

      this.userProdForm = this.fb.group({
        id:[this.user.id],
        login:[this.user.login],
        senha:[this.user.senha],
        pessoa:[this.user.pessoa?.nome],
      });


      this.acessoService.listarAcessoTodos().subscribe({
        next: (data) => {
          
           this.acesso = data;

            this.acesso.forEach((ab) => {
                   
              this.user.acessos?.forEach((au) => {
                   if (ab.id == au.id){
                     ab.possuiAcesso = true;
                   }
              });
            });

           console.info('---------------acessos----------------');
           console.info(this.acesso);
        }

      });

     },
     error: (error) => {
        alert(error);
     }

   });

  }


  salvarUser(): void{
    this.user = this.userObjeto();
    this.usuarioService.salvarUserPessoa(this.user);
  }


  
  adicionaRemoreAcesso(ac:  Acesso) : void {

    console.info(ac.id);
    console.info(this.user.id);

    this.usuarioService.adicionaRemoreAcesso(ac.id, this.user.id);

  }

}
