import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Acesso } from 'src/app/model/acesso';
import { AcessoService } from 'src/app/services/acesso.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent implements OnInit  {

  lista = new Array<Acesso>();
  acessoProdForm: FormGroup;
  acesso: Acesso;
  varPesquisa: String = '';
  qtdPagina: Number = 0;
  arrayNumber: Number[] = [];
  paginaAtual: Number = 0;


  constructor (private fb: FormBuilder, private acessoService: AcessoService, private loginService: LoginService) {

    this.acesso = new Acesso();

       /*Pegar dados do formulário, inici e limpa*/
       this.acessoProdForm = this.fb.group({
        id:[],
        descricao: [null, Validators.required],
        empresa: [this.loginService.objetoEmpresa(), Validators.required]
       });
     
   
  }
  



  /*Executa no momento que a tela abre */
  ngOnInit(): void {  

    this.acessoService.qtdPagina().subscribe({
      next: (res) => {

        this.qtdPagina = Number(res); 
        
        this.arrayNumber = Array(this.qtdPagina).fill(0).map((x,i) => i);

        console.info(this.arrayNumber);
     
      },
      error: (error) => {

      }
    });

    this.listaAcesso(0);
  }


  atualizaQtdPagina(): void {
    this.acessoService.qtdPagina().subscribe({
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
  this.acessoProdForm = this.fb.group({
    id:[],
    descricao: [null, Validators.required],
    empresa: [this.loginService.objetoEmpresa(), Validators.required]
   });
 }




  listaAcesso(pagina: Number): void{

    this.acessoService.listarAcesso(pagina).subscribe({

      next: (res) => {
        this.atualizaQtdPagina();
        this.lista = res;
          
      },
      error: (error) => {
        alert(error);
      }
  
    });

  }


   /*Trasnformar em objeto */
   acessoObjeto(): Acesso {
    
    return {
      id: this.acessoProdForm.get('id')?.value!,
      descricao: this.acessoProdForm.get('descricao')?.value!,
      empresa : this.acessoProdForm.get('empresa')?.value!
    }
  }

  /*Salvar marca produtos*/
  salvaAcesso(){
    const acesso = this.acessoObjeto();
    this.acessoService.salvarAcesso(acesso);

    this.novo();
    this.listaAcesso(this.paginaAtual);

  }


  editarAcesso(c: Acesso): void {
   
    this.acessoService.buscarPorId(c.id).subscribe({
      next: (data) => {

        this.acesso = data;

        this.acessoProdForm = this.fb.group({
          id:[this.acesso.id],
          descricao: [this.acesso.descricao, Validators.required],
          empresa: [this.acesso.empresa, Validators.required]
         });

      },
      error: (error) => {
        alert(error);
      }
    });

  }

  deletar(c: Acesso): void {
    var confir = confirm('Deseja mesmo deletar?');

    if (confir){
      this.acessoService.deletar(c);
      this.listaAcesso(this.paginaAtual);
    }
  }

  setPesquisa(val:String): void {
    this.varPesquisa = val;
  }

  pesquisar(): void {

    if(this.varPesquisa.length <= 0){
      this.listaAcesso(this.paginaAtual);
      return;
    }
   
  this.acessoService.buscarPorDescAcesso(this.varPesquisa).subscribe({

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
    
    this.listaAcesso(this.paginaAtual);
  }

  voltar(): void{


    if(this.paginaAtual.valueOf() > 0){
      this.paginaAtual = this.paginaAtual.valueOf() - 1;
    }

    this.listaAcesso(this.paginaAtual);
  } 

  avancar(): void{

     if(this.paginaAtual.valueOf() < this.qtdPagina.valueOf()){
           this.paginaAtual = this.paginaAtual.valueOf() + 1;
     }

     this.listaAcesso(this.paginaAtual);

  }

}
