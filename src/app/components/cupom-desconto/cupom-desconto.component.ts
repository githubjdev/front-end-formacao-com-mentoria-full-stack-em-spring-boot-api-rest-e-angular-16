import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CupomDesconto } from 'src/app/model/cupom-desconto';
import { CupomDescontoService } from 'src/app/services/cupom-desconto.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cupom-desconto',
  templateUrl: './cupom-desconto.component.html',
  styleUrls: ['./cupom-desconto.component.css']
})
export class CupomDescontoComponent implements OnInit {


    lista = new Array<CupomDesconto>();
    cupDescProdForm: FormGroup;
    formPag: CupomDesconto;



      constructor(private fb: FormBuilder ,
          private loginService: LoginService, 
           private  cupomDescontoService: CupomDescontoService){
    
            this.formPag = new CupomDesconto(); 
    
             this.cupDescProdForm = this.fb.group({
                    id:[],
                    codDesc: [null, Validators.required],
                    dataValidadeCupom: [null, Validators.required],
                    valorRealDesc: [null, Validators.required],
                    valorPorcentDesc: [null, Validators.required],
                    empresa: [this.loginService.objetoEmpresa(), Validators.required]
             });
                   
    
      }


      ngOnInit(): void {
        this.listarCd();
      }

      listarCd (): void {

        this.cupomDescontoService.listaCupDesconto().subscribe({
   
         next : (res) => {
            this.lista = res;
         },
   
          error: (error) => {
           alert(error);
          }
        });
     }  
     
     novo(): void{
      this.cupDescProdForm = this.fb.group({
        id:[],
        codDesc: [null, Validators.required],
        dataValidadeCupom: [null, Validators.required],
        valorRealDesc: [null, Validators.required],
        valorPorcentDesc: [null, Validators.required],
        empresa: [this.loginService.objetoEmpresa(), Validators.required]
       });
     }  
     
     
  deletar(c: CupomDesconto): void {

   var confirmar = confirm('Deseja mesmo deletar?');

   if (confirmar){
      this.cupomDescontoService.deletar(c);
      this.listarCd();
   }
  }    
  
  

    editarFp(c: CupomDesconto): void {
  
     
     this.formPag = c;
  
    this.cupDescProdForm = this.fb.group({
        id:[c.id],
        codDesc: [c.codDesc, Validators.required],
        dataValidadeCupom: [c.dataValidadeCupom, Validators.required],
        valorRealDesc: [c.valorRealDesc, Validators.required],
        valorPorcentDesc: [c.valorPorcentDesc, Validators.required],
        empresa: [c.empresa, Validators.required]
    });
  
    }


      /*Tranformar em objeto*/
    
      cupDescObjeto(): CupomDesconto{
    
        return {
         id: this.cupDescProdForm.get('id')?.value!,
         codDesc: this.cupDescProdForm.get('codDesc')?.value!,
         dataValidadeCupom: this.cupDescProdForm.get('dataValidadeCupom')?.value!,
         valorRealDesc: this.cupDescProdForm.get('valorRealDesc')?.value!,
         valorPorcentDesc: this.cupDescProdForm.get('valorPorcentDesc')?.value!,
         empresa: this.cupDescProdForm.get('empresa')?.value! 
        }
      }

      salvarCd(){

        const fp = this.cupDescObjeto();
     
        this.cupomDescontoService.salvarCd(fp);
     
        this.novo();
        this.listarCd();
     
       }      

}
