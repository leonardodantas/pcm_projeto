import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators'
import { Usuario } from "../model/usuario";
import { Http, Response } from "@angular/http";

@Injectable()
export class UsuariosService{

  constructor(
    private http: Http
  ){}

  public getUsers(): Observable<Usuario>{
    return this.http.get('http://localhost:3000/user')
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((erro: any)=>{
      return erro
    })))
  }

  public getQtdId(): Observable<number>{
    return this.http.get('http://localhost:3000/userqtd')
    .pipe(map((response: Response)=>{
      return response.json()[0].count
    },catchError((erro: any)=>{
      return erro
    })))
  }

}
