import { Usuario } from "../model/usuario";
import { Headers, Http, RequestOptions, Response } from '@angular/http'
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators'
import { Injectable } from "@angular/core";

@Injectable()
export class Autenticacao{

  //public tokenId

  constructor(
    private http: Http
  ){}

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

    //if(this.tokenId === undefined && localStorage.getItem('idToken') != null){
      //this.tokenId = localStorage.getItem('idToken')
   // }
    //if(this.tokenId === undefined){
      //this.route.navigate(['/'])
    //}

    return true

  }

}


