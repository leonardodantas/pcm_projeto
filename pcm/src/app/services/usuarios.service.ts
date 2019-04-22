import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators'
import { Usuario } from "../model/usuario";
import { Http, Response, RequestOptions, Headers } from "@angular/http";

@Injectable()
export class UsuariosService{

  constructor(
    private http: Http
  ){}

  public getUsers(): Observable<Usuario[]>{
    return this.http.get('http://localhost:3000/user')
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((erro: any)=>{
      return erro
    })))
  }

  public getAllUsers(): Observable<Usuario[]>{
    return this.http.get('http://localhost:3000/userAll')
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((erro: any)=>{
      return erro
    })))
  }

  public delete(id: number): Observable<any>{
    return this.http.delete('http://localhost:3000/user/' + id)
    .pipe(map((response: Response)=>{
      this.getUsers()
      return response
    }, catchError((err: any)=>{
      return err
    })))
  }

  public validarUser(usuario: Usuario): Observable<any>{
    let body = JSON.stringify(usuario)
    let headers = new Headers()
    headers.append('Content-type', 'application/json')

    return this.http.put('http://localhost:3000/user',
    body,
    new RequestOptions({ headers : headers}))
    .pipe(map((response: Response)=>{
      return response
    }, catchError((err: any)=>{

      return err
    })))
  }

}
