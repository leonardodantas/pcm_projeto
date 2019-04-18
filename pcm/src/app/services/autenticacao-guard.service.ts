import { Injectable } from "@angular/core";
import { CanActivate } from '@angular/router'
import { Autenticacao } from "./autenticacao.service";

@Injectable()
export class AutenticacaoGuardService{

  constructor(
    private autenticacaoService: Autenticacao
  ){}

  //public autenticarAdm(): boolean{
    //return this.autenticacaoService.autenticarAdm()
  //}
}
