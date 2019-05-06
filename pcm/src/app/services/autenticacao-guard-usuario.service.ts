import { Autenticacao } from "./autenticacao.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AutenticacaoGuardServiceUsuario{

  constructor(
    private autenticacaoService: Autenticacao
  ){}

  canActivate(): boolean{
    return this.autenticacaoService.autenticarUsuario()
  }
}
