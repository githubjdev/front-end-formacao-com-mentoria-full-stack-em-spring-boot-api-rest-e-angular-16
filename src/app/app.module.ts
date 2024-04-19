import { Component, ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { InterceptorProjetoInterceptor } from './interceptor/interceptor-projeto.interceptor';
import { HomeComponent } from './home/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { guardiaoGuard } from './guard/guardiao.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoriaProdutoComponent } from './components/categoria-produto/categoria-produto.component';
import { MarcaProdutoComponent } from './components/marca-produto/marca-produto.component';
import { AcessoComponent } from './components/acesso/acesso.component';
import { PessoaJuridicaComponent } from './components/pessoa-juridica/pessoa-juridica.component';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { PessoaFisicaComponent } from './components/pessoa-fisica/pessoa-fisica.component';


export const appRoutes : Routes = [

  {path: 'login', component: LoginComponent},
  {path: '', component: AppComponent},
  {path: 'home', component: HomeComponent, canActivate:[guardiaoGuard], data: {role:['ROLE_ADMIN','ROLE_USER','ROLE_FUNCIONARIO']}},
  {path: 'categoria-produto', component: CategoriaProdutoComponent, canActivate:[guardiaoGuard], data: {role:['ROLE_ADMIN','ROLE_USER','ROLE_FUNCIONARIO']}},
  {path: 'marca-produto', component: MarcaProdutoComponent, canActivate:[guardiaoGuard], data: {role:['ROLE_ADMIN','ROLE_USER','ROLE_FUNCIONARIO']}},
  {path: 'acesso', component: AcessoComponent, canActivate:[guardiaoGuard], data: {role:['ROLE_ADMIN']}},
  {path: 'pessoa-juridica', component: PessoaJuridicaComponent, canActivate:[guardiaoGuard], data: {role:['ROLE_ADMIN']}},
  {path: 'pessoa-fisica', component: PessoaFisicaComponent, canActivate:[guardiaoGuard], data: {role:['ROLE_ADMIN']}}
];

export const routes = RouterModule.forRoot(appRoutes);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    CategoriaProdutoComponent,
    MarcaProdutoComponent,
    AcessoComponent,
    PessoaJuridicaComponent,
    PessoaFisicaComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    routes
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorProjetoInterceptor, multi: true},
    provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
