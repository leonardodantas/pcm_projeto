import { Autenticacao } from "./autenticacao.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AutenticacaoGuardServiceManutencao{

  constructor(
    private autenticacaoService: Autenticacao
  ){}

  canActivate(): boolean{
    return this.autenticacaoService.autenticarManutencao()
  }
}
