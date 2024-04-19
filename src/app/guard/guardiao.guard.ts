import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { environment } from 'src/environments/environment';

export const guardiaoGuard: CanActivateFn = (route, state) => {

  var username = localStorage.getItem('username');
  var roles = route.data;

  var role = JSON.parse(JSON.stringify(roles)).role.toString();
  var autorization = '' + localStorage.getItem('Authorization');

  var request = new XMLHttpRequest();
  request.open("GET", environment.urlApi + 'possuiAcesso/' + username + '/' + role, false);
  request.setRequestHeader('Authorization', autorization);
  request.send();
  
  var possuiAcessoRetorno = request.responseText === 'true' ||  new Boolean(request.responseText) === true;
  var usuarioLogado = inject(LoginService).usuarioLogado();

  return (usuarioLogado && possuiAcessoRetorno);
};
