import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {


  lista = new Array<Usuario>();

  constructor (private fb: FormBuilder, private loginService: LoginService, private usuarioService: UsuarioService) {
 
  }


  ngOnInit(): void {
    
    this.listUser();
  }


  listUser(){

    this.usuarioService.listUserByEmpresa().subscribe({
      next: (res) => {
        this.lista = res;
        console.info(this.lista);
      },
      error: (error) => {
        alert(error);
      }
    });
  }

}
