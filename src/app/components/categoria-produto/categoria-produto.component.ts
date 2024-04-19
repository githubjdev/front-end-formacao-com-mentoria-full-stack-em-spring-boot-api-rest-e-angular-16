import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaProduto } from 'src/app/model/categoria-produto';
import { CategoriaProdutoService } from 'src/app/services/categoria-produto.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-categoria-produto',
  templateUrl: './categoria-produto.component.html',
  styleUrls: ['./categoria-produto.component.css']
})
export class CategoriaProdutoComponent implements OnInit  {

  lista = new Array<CategoriaProduto>();
  catProdForm: FormGroup;
  catproduto: CategoriaProduto;
  varPesquisa: String = '';
  qtdPagina: Number = 0;
  arrayNumber: Number[] = [];
  paginaAtual: Number = 0;


  constructor (private fb: FormBuilder, private categoriaProdutoService: CategoriaProdutoService, private loginService: LoginService) {

    this.catproduto = new CategoriaProduto();

       /*Pegar dados do formulário, inici e limpa*/
       this.catProdForm = this.fb.group({
        id:[],
        nomeDesc: [null, Validators.required],
        empresa: [this.loginService.objetoEmpresa(), Validators.required]
       });
       
     
   
  }
  



  /*Executa no momento que a tela abre */
  ngOnInit(): void {  

    this.categoriaProdutoService.qtdPagina().subscribe({
      next: (res) => {

        this.qtdPagina = Number(res); 
        
        this.arrayNumber = Array(this.qtdPagina).fill(0).map((x,i) => i);

        console.info(this.arrayNumber);
     
      },
      error: (error) => {

      }
    });

    this.listaCategorias(0);
  }


atuliazarPagina(): void{
  this.categoriaProdutoService.qtdPagina().subscribe({
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
  this.catProdForm = this.fb.group({
    id:[],
    nomeDesc: [null, Validators.required],
    empresa: [this.loginService.objetoEmpresa(), Validators.required]
   });
 }




  listaCategorias(pagina: Number): void{

    this.categoriaProdutoService.listarCategoriaProduto(pagina).subscribe({

      next: (res) => {

          this.atuliazarPagina(); 
          this.lista = res;
      },
      error: (error) => {
        alert(error);
      }
  
    });

  }


   /*Trasnformar em objeto */
   catProdObjeto(): CategoriaProduto {
    
    return {
      id: this.catProdForm.get('id')?.value!,
      nomeDesc: this.catProdForm.get('nomeDesc')?.value!,
      empresa : this.catProdForm.get('empresa')?.value!
    }
  }

  /*Salvar categoria produtos*/
  cadProdCategoria(){
    const categoria = this.catProdObjeto();
    this.categoriaProdutoService.salvarCategoriaProduto(categoria);

    this.novo();
    this.listaCategorias(this.paginaAtual);

  }


  editarCp(c: CategoriaProduto): void {
   
    this.categoriaProdutoService.buscarPorId(c.id).subscribe({
      next: (data) => {

        this.catproduto = data;

        this.catProdForm = this.fb.group({
          id:[this.catproduto.id],
          nomeDesc: [this.catproduto.nomeDesc, Validators.required],
          empresa: [this.catproduto.empresa, Validators.required]
         });

      },
      error: (error) => {
        alert(error);
      }
    });

  }

  deletar(c: CategoriaProduto): void {
    var confir = confirm('Deseja mesmo deletar?');

    if (confir){
      this.categoriaProdutoService.deletar(c);
      this.listaCategorias(this.paginaAtual);
    }
  }

  setPesquisa(val:String): void {
    this.varPesquisa = val;
  }

  pesquisar(): void {

    if(this.varPesquisa.length <= 0){
      this.listaCategorias(this.paginaAtual);
      return;
    }
   
  this.categoriaProdutoService.buscarPorDescCatgoria(this.varPesquisa).subscribe({

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
    
    this.listaCategorias(this.paginaAtual);
  }

  voltar(): void{


    if(this.paginaAtual.valueOf() > 0){
      this.paginaAtual = this.paginaAtual.valueOf() - 1;
    }

    this.listaCategorias(this.paginaAtual);
  } 

  avancar(): void{

     if(this.paginaAtual.valueOf() < this.qtdPagina.valueOf()){
           this.paginaAtual = this.paginaAtual.valueOf() + 1;
     }

     this.listaCategorias(this.paginaAtual);

  }

}
