import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaFisica } from 'src/app/model/pessoa-fisica';
import { LoginService } from 'src/app/services/login.service';
import { PessoaFisicaService } from 'src/app/services/pessoaFisica.service';


@Component({
  selector: 'app-pessoa-fisica',
  templateUrl: './pessoa-fisica.component.html',
  styleUrls: ['./pessoa-fisica.component.css']
})
export class PessoaFisicaComponent implements OnInit {


  lista = new Array<PessoaFisica>();
  pfProdForm: FormGroup;
  pf: PessoaFisica;
  varPesquisa: String = '';
  qtdPagina: Number = 0;
  arrayNumber: Number[] = [];
  paginaAtual: Number = 0;


  constructor (private fb: FormBuilder, private pjService: PessoaFisicaService, private loginService: LoginService) {

    this.pf = new PessoaFisica();

       /*Pegar dados do formulário, inici e limpa*/
       this.pfProdForm = this.fb.group({
        id:[],
        cpf: [null, !Validators.required],
        dataNascimento:[null, !Validators.required],
        nome: [null, !Validators.required],
        email: [null, !Validators.required],
        telefone: [null, !Validators.required],
        tipoPessoa: ["", !Validators.required],
        empresa: [this.loginService.objetoEmpresa(), Validators.required]
       });
     
   
  }

  ngOnInit(): void {  

    this.pjService.qtdPagina().subscribe({
      next: (res) => {

        this.qtdPagina = Number(res); 
        
        this.arrayNumber = Array(this.qtdPagina).fill(0).map((x,i) => i);

        console.info(this.arrayNumber);
     
      },
      error: (error) => {

      }
    });

    this.listaPj(0);
  }





  listaPj(pagina: Number): void{

    this.pjService.listarPf(pagina).subscribe({

      next: (res) => {
        this.atualizaQtdPagina();
        this.lista = res;
          
      },
      error: (error) => {
        alert(error);
      }
  
    });

  } 
  
  


  atualizaQtdPagina(): void {
    this.pjService.qtdPagina().subscribe({
      next: (res) => {

        this.qtdPagina = Number(res); 
        
        this.arrayNumber = Array(this.qtdPagina).fill(0).map((x,i) => i);

        console.info(this.arrayNumber);
     
      },
      error: (error) => {

      }
    });
  }


  novo(): void{
    this.pfProdForm = this.fb.group({
      id:[],
      cpf: [null, !Validators.required],
      dataNascimento:[null, !Validators.required],
      nome: [null, !Validators.required],
      email: [null, !Validators.required],
      telefone: [null, !Validators.required],
      tipoPessoa: ["", !Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
     });
   }



      /*Trasnformar em objeto */
      pjObjeto(): PessoaFisica {
    
        return {
          id: this.pfProdForm.get('id')?.value!,
          cpf: this.pfProdForm.get('cpf')?.value!,
          dataNascimento: this.pfProdForm.get('dataNascimento')?.value!,
          nome: this.pfProdForm.get('nome')?.value!,
          email: this.pfProdForm.get('email')?.value!,
          telefone: this.pfProdForm.get('telefone')?.value!,
          tipoPessoa: this.pfProdForm.get('tipoPessoa')?.value!,
          empresa : this.pfProdForm.get('empresa')?.value!
        }
      }
  

  /*Salvar marca produtos*/
  salvaPj(){
    const pj = this.pjObjeto();

    console.info(pj);

    this.pjService.salvarpf(pj);

    this.novo();
    this.listaPj(this.paginaAtual);

  }     
  
  

  editarPj(c: PessoaFisica): void {
   
    this.pjService.buscarPorId(c.id).subscribe({
      next: (data) => {

        this.pf = data;

        this.pfProdForm = this.fb.group({
          id:[this.pf.id],
          cpf: [this.pf.cpf, !Validators.required],
          dataNascimento: [this.pf.dataNascimento, !Validators.required],      
          nome: [this.pf.nome, !Validators.required],
          email: [this.pf.email, !Validators.required],
          telefone: [this.pf.telefone, !Validators.required],
          tipoPessoa: [this.pf.tipoPessoa, !Validators.required],
          empresa: [this.loginService.objetoEmpresa(), Validators.required]
         });

      },
      error: (error) => {
        alert(error);
      }
    });

  }



  deletar(c: PessoaFisica): void {
    var confir = confirm('Deseja mesmo deletar?');

    if (confir){
      this.pjService.deletar(c);
      this.listaPj(this.paginaAtual);
    }
  }



  setPesquisa(val:String): void {
    this.varPesquisa = val;
  }



  pesquisar(): void {

    if(this.varPesquisa.length <= 0){
      this.listaPj(this.paginaAtual);
      return;
    }
   
  this.pjService.buscarPorDescPf(this.varPesquisa).subscribe({

    next: (res) =>{
        this.lista = res;
    },
    error: (error) => {
       alert(error);
    }

  });

  }


  buscarPagina(p: Number): void{

    this.paginaAtual = p;
    
    this.listaPj(this.paginaAtual);
  }



  voltar(): void{


    if(this.paginaAtual.valueOf() > 0){
      this.paginaAtual = this.paginaAtual.valueOf() - 1;
    }

    this.listaPj(this.paginaAtual);
  } 


  avancar(): void{

    if(this.paginaAtual.valueOf() < this.qtdPagina.valueOf()){
          this.paginaAtual = this.paginaAtual.valueOf() + 1;
    }

    this.listaPj(this.paginaAtual);

 }

}
