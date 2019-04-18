import { Injectable } from "@angular/core";
import { CanActivate } from '@angular/router'
import { Autenticacao } from "./autenticacao.service";

@Injectable()
export class AutenticacaoGuardServiceAdm{

  constructor(
    private autenticacaoService: Autenticacao
  ){}

  canActivate(): boolean{
    return this.autenticacaoService.autenticarAdm()
  }
}
