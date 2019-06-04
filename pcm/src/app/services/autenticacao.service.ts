import { Usuario } from "../model/usuario";
import { Headers, Http, RequestOptions, Response } from '@angular/http'
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators'
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class Autenticacao{

  public tokenId

  constructor(
    private http: Http,
    private route: Router
  ){}

  public inserirUsuario(usuario: Usuario): Observable<Usuario>{

    let headers = new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.post('http://localhost:3000/user',
    JSON.stringify(usuario),
    new RequestOptions({ headers : headers })
    ).pipe(map((response: Response)=>{
      return response.json()
    }, catchError((erro: any)=>{
      return erro
    })))
  }

  public autenticar(usuario: Usuario): Observable<any>{

    let headers = new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.post('http://localhost:3000/auth',
    JSON.stringify(usuario),
    new RequestOptions({ headers : headers })
    ).pipe(map((respose: Response)=>{
      return respose.json()
    }, catchError((erro: any)=>{
      return erro
    })))

  }

  public autenticarAdm(): boolean{

    if(this.tokenId === undefined && localStorage.getItem('idUsuario') != null && localStorage.getItem('idCargo') === '4'){
      this.tokenId = localStorage.getItem('idUsuario')
    }
    if(this.tokenId === undefined){
      this.route.navigate(['/'])
    }

    return localStorage.getItem('idUsuario') !== null

  }

  public autenticarManutencao(): boolean{
    if(this.tokenId === undefined && localStorage.getItem('idUsuario') != null && localStorage.getItem('idCargo') === '2'){
      this.tokenId = localStorage.getItem('idUsuario')
    }
    if(this.tokenId === undefined){
      this.route.navigate(['/'])
    }

    return localStorage.getItem('idUsuario') !== null
  }

  public autenticarUsuario(): boolean{
    if(this.tokenId === undefined && localStorage.getItem('idUsuario') != null && localStorage.getItem('idCargo') === '3'){
      this.tokenId = localStorage.getItem('idUsuario')
    }
    if(this.tokenId === undefined){
      this.route.navigate(['/'])
    }

    return localStorage.getItem('idUsuario') !== null
  }

  public autenticarGerencia(): boolean{
    if(this.tokenId === undefined && localStorage.getItem('idUsuario') != null && localStorage.getItem('idCargo') === '1'){
      this.tokenId = localStorage.getItem('idUsuario')
    }
    if(this.tokenId === undefined){
      this.route.navigate(['/'])
    }

    return localStorage.getItem('idUsuario') !== null
  }

}


