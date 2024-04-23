import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Endereco } from 'src/app/model/endereco';
import { PessoaFisica } from 'src/app/model/pessoa-fisica';
import { EnderecoService } from 'src/app/services/endereco.service';
import { LoginService } from 'src/app/services/login.service';
import { PessoaFisicaService } from 'src/app/services/pessoaFisica.service';


@Component({
  selector: 'app-pessoa-fisica',
  templateUrl: './pessoa-fisica.component.html',
  styleUrls: ['./pessoa-fisica.component.css']
})
export class PessoaFisicaComponent implements OnInit {


  lista = new Array<PessoaFisica>();
  enderecos = new Array<Endereco>();
  pfProdForm: FormGroup;
  endFormGroup: FormGroup;
  pf: PessoaFisica;
  varPesquisa: String = '';
  qtdPagina: Number = 0;
  arrayNumber: Number[] = [];
  paginaAtual: Number = 0;


  constructor (private fb: FormBuilder, private pjService: PessoaFisicaService, private loginService: LoginService, private enderecoService: EnderecoService) {

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
    this.enderecos = new Array<Endereco>();

    this.pfProdForm = this.fb.group({
      id:[],
      cpf: [null, !Validators.required],
      dataNascimento:[null, !Validators.required],
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
          enderecos: this.enderecos,
          empresa : this.pfProdForm.get('empresa')?.value!
        }
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
 
 
 removeEndereco(end: Endereco): void{

  var confirma = confirm('Deseja mesmo deletar o endereço?');

  if (confirma) {

    this.enderecoService.deletar(end);
    
    var index = this.enderecos.map(e => e.cep).indexOf(end.cep);
    this.enderecos.splice(index,1);
    
   
    console.info(this.enderecos);
  }
 }

  

  /*Salvar marca produtos*/
  salvaPf(){
    const pj = this.pjObjeto();

    console.info(pj);

    this.pjService.salvarpf2(pj, this);

    //this.novo();
    this.listaPj(this.paginaAtual);

  }     
  
  

  editarPj(c: PessoaFisica): void {
   
    this.pjService.buscarPorId(c.id).subscribe({
      next: (data) => {

        this.pf = data;

        this.enderecos = this.pf.enderecos !== undefined ? this.pf.enderecos : new Array<Endereco>();

        this.pfProdForm = this.fb.group({
          id:[this.pf.id],
          cpf: [this.pf.cpf, !Validators.required],
          dataNascimento: [this.pf.dataNascimento, !Validators.required],      
          nome: [this.pf.nome, !Validators.required],
          email: [this.pf.email, !Validators.required],
          telefone: [this.pf.telefone, !Validators.required],
          tipoPessoa: [this.pf.tipoPessoa, !Validators.required],
          enderecos: [this.enderecos, !Validators.required],
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
