import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Endereco } from 'src/app/model/endereco';
import { PessoaJuridica } from 'src/app/model/pessoa-juridica';
import { EnderecoService } from 'src/app/services/endereco.service';
import { LoginService } from 'src/app/services/login.service';
import { PessoaJuridicaService } from 'src/app/services/pessoaJuridica.service';


@Component({
  selector: 'app-pessoa-juridica',
  templateUrl: './pessoa-juridica.component.html',
  styleUrls: ['./pessoa-juridica.component.css']
})
export class PessoaJuridicaComponent implements OnInit {


  lista = new Array<PessoaJuridica>();
  enderecos = new Array<Endereco>();
  pjProdForm: FormGroup;
  endFormGroup: FormGroup;
  pj: PessoaJuridica;
  varPesquisa: String = '';
  qtdPagina: Number = 0;
  arrayNumber: Number[] = [];
  paginaAtual: Number = 0;


  constructor (private fb: FormBuilder, private pjService: PessoaJuridicaService, private loginService: LoginService, private enderecoService: EnderecoService) {

    this.pj = new PessoaJuridica();

       /*Pegar dados do formulário, inici e limpa*/
       this.pjProdForm = this.fb.group({
        id:[],
        cnpj: [null, Validators.required],
        inscEstadual: [null, Validators.required],
        inscMunicipal: [null, Validators.required],
        nomeFantasia: [null, Validators.required],
        razaoSocial: [null, Validators.required],
        categoria: ["", Validators.required],
        nome: [null, !Validators.required],
        email: [null, !Validators.required],
        telefone: [null, !Validators.required],
        tipoPessoa: ["", !Validators.required],
        enderecos: [this.enderecos, !Validators.required],
        empresa: [this.loginService.objetoEmpresa(), Validators.required]
       });

       this.endFormGroup = this.fb.group({
        id:["",!Validators.required],
        ruaLogra: [null, Validators.required],
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null, Validators.required],
        bairro: [null, Validators.required],
        uf: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
        tipoEndereco: ["", Validators.required],
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

    this.pjService.listarPj(pagina).subscribe({

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
    this.enderecos = new Array<Endereco>();

    this.pjProdForm = this.fb.group({
      id:[],
      cnpj: [null, Validators.required],
      inscEstadual: [null, Validators.required],
      inscMunicipal: [null, Validators.required],
      nomeFantasia: [null, Validators.required],
      razaoSocial: [null, Validators.required],
      categoria: ["", Validators.required],
      nome: [null, !Validators.required],
      email: [null, !Validators.required],
      telefone: [null, !Validators.required],
      tipoPessoa: ["", !Validators.required],
      enderecos: [this.enderecos, !Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
     });

     this.endFormGroup = this.fb.group({
      id:["",!Validators.required],
      ruaLogra: [null, Validators.required],
      cep: [null, Validators.required],
      numero: [null, Validators.required],
      complemento: [null, Validators.required],
      bairro: [null, Validators.required],
      uf: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required],
      tipoEndereco: ["", Validators.required],
     });


   }


   endObjt(): Endereco {
    return {
      id: this.endFormGroup.get("id")?.value,
      ruaLogra: this.endFormGroup.get("ruaLogra")?.value,
      cep: this.endFormGroup.get("cep")?.value,
      numero: this.endFormGroup.get("numero")?.value,
      complemento: this.endFormGroup.get("complemento")?.value,
      bairro: this.endFormGroup.get("bairro")?.value,
      uf: this.endFormGroup.get("uf")?.value,
      cidade: this.endFormGroup.get("cidade")?.value,
      estado: this.endFormGroup.get("estado")?.value,
      tipoEndereco: this.endFormGroup.get("tipoEndereco")?.value,
    }
   }

      /*Trasnformar em objeto */
      pjObjeto(): PessoaJuridica {
    
        return {
          id: this.pjProdForm.get('id')?.value!,   
          cnpj: this.pjProdForm.get('cnpj')?.value!,
          inscEstadual: this.pjProdForm.get('inscEstadual')?.value!,
          inscMunicipal: this.pjProdForm.get('inscMunicipal')?.value!,
          nomeFantasia: this.pjProdForm.get('nomeFantasia')?.value!,
          razaoSocial: this.pjProdForm.get('razaoSocial')?.value!,
          categoria: this.pjProdForm.get('categoria')?.value!,
          nome: this.pjProdForm.get('nome')?.value!,
          email: this.pjProdForm.get('email')?.value!,
          telefone: this.pjProdForm.get('telefone')?.value!,
          tipoPessoa: this.pjProdForm.get('tipoPessoa')?.value!,
          enderecos: this.enderecos,
          empresa : this.pjProdForm.get('empresa')?.value! 
        }
      }
  

  addEndereco(){
     const end = this.endObjt();

     if (end.id != null && end.id != undefined){
        for(var i = 0; i< this.enderecos.length; i++){
            var e = this.enderecos[i];
            if(e.cep === end.cep && e.id != end.id){
              return;
            }
        }
     }
      
     var index = this.enderecos.map(e => e.cep).indexOf(end.cep);
     var indexId = this.enderecos.map(e => e.id).indexOf(end.id);
  

     if (index < 0 && indexId < 0) {
      this.enderecos.push(end);
     }else{
      this.enderecos.splice(index,1);
      this.enderecos.push(end);
     }
   
    console.info(this.enderecos);
  }   
  
  


  removeEndereco(end: Endereco): void{

    var confirma = confirm('Deseja mesmo deletar o endereço?');
  
    if (confirma) {
  
      this.enderecoService.deletar(end);
      
      var index = this.enderecos.map(e => e.cep).indexOf(end.cep);
      this.enderecos.splice(index,1);
      
     
      console.info(this.enderecos);
    }
   }
  
   novoEndereco(): void{
    this.endFormGroup = this.fb.group({
      id:["",!Validators.required],
      ruaLogra: [null, Validators.required],
      cep: [null, Validators.required],
      numero: [null, Validators.required],
      complemento: [null, Validators.required],
      bairro: [null, Validators.required],
      uf: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required],
      tipoEndereco: ["", Validators.required],
     });
   }
   

  /*Salvar marca produtos*/
  salvaPj(){
    const pj = this.pjObjeto();

 
    this.pjService.salvarpj2(pj, this);

    //this.novo();
    this.listaPj(this.paginaAtual);

  }     
  
  verEnd(c: Endereco): void {

    this.endFormGroup = this.fb.group({
      id:[c.id,!Validators.required],
      ruaLogra: [c.ruaLogra, Validators.required],
      cep: [c.cep, Validators.required],
      numero: [c.numero, Validators.required],
      complemento: [c.complemento, Validators.required],
      bairro: [c.bairro, Validators.required],
      uf: [c.uf, Validators.required],
      cidade: [c.cidade, Validators.required],
      estado: [c.estado, Validators.required],
      tipoEndereco: [c.tipoEndereco, Validators.required],
     });
  }

  editarPj(c: PessoaJuridica): void {
   
    this.pjService.buscarPorId(c.id).subscribe({
      next: (data) => {

        this.pj = data;

        this.enderecos = this.pj.enderecos !== undefined ? this.pj.enderecos : new Array<Endereco>();

        this.pjProdForm = this.fb.group({
          id:[this.pj.id],
          cnpj: [this.pj.cnpj, Validators.required],
          inscEstadual: [this.pj.inscEstadual, Validators.required],
          inscMunicipal: [this.pj.inscMunicipal, Validators.required],
          nomeFantasia: [this.pj.nomeFantasia, Validators.required],
          razaoSocial: [this.pj.razaoSocial, Validators.required],
          categoria: [this.pj.categoria, Validators.required],
          nome: [this.pj.nome, !Validators.required],
          email: [this.pj.email, !Validators.required],
          telefone: [this.pj.telefone, !Validators.required],
          tipoPessoa: [this.pj.tipoPessoa, !Validators.required],
          enderecos: [this.enderecos, !Validators.required],
          empresa: [this.loginService.objetoEmpresa(), Validators.required]
         });

      },
      error: (error) => {
        alert(error);
      }
    });

  }



  deletar(c: PessoaJuridica): void {
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
   
  this.pjService.buscarPorDescPj(this.varPesquisa).subscribe({

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
