import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { FormaPagamentoService } from 'src/app/services/forma-pagamento.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent implements OnInit {


  lista = new Array<FormaPagamento>();
  formPagProdForm: FormGroup;


  constructor(private fb: FormBuilder ,
      private loginService: LoginService, 
       private  formaPagamentoService: FormaPagamentoService){


         this.formPagProdForm = this.fb.group({
                id:[],
                descricao: [null, Validators.required],
                empresa: [this.loginService.objetoEmpresa(), Validators.required]
               });
               

  }

  ngOnInit(): void {

     this.listaFormaPagamento();
   
  }


  listaFormaPagamento (): void {

     this.formaPagamentoService.listaFormaPagamento().subscribe({

      next : (res) => {
         this.lista = res;
      },

       error: (error) => {
        alert(error);
       }
     });
  }


  deletar(c: FormaPagamento): void {

   var confirmar = confirm('Deseja mesmo deletar?');

   if (confirmar){
      this.formaPagamentoService.deletar(c);
      this.listaFormaPagamento();
   }
  }

}
