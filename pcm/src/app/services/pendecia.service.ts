import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pendencia } from "../model/pendencia";
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { map, catchError } from 'rxjs/operators'
import { PendenciaUsuario } from "../model/pendencia_usuario";
import { Usuario } from "../model/usuario";

@Injectable()
export class PendenciaService{

  constructor(
    private http: Http
  ){}

  public inserirPendencia(pendencia: Pendencia): Observable<number>{

    let headers = new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.post('http://localhost:3000/pendencia',
    JSON.stringify(pendencia),
    new RequestOptions({ headers: headers})
    ).pipe(map((response: Response)=>{
      console.log(response.json()[0].id)
      return response.json()[0].id
    }, catchError((err:any)=>{
      return err
    })))
  }

  public inserirNovoUsuarioPendencia(pendeciaUsuario: PendenciaUsuario): Observable<Response>{

    let headers = new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.post('http://localhost:3000/pendencia_usuario',
    JSON.stringify(pendeciaUsuario),
    new RequestOptions({headers:headers})
    ).pipe(map((response: Response)=>{
      return response
    }, catchError((err:any)=>{
      return err
    })))
  }

  public getPendenciasUsuario(id: number): Observable<PendenciaUsuario[]>{
    return this.http.get('http://localhost:3000/pendencia_usuario/' + id)
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))
  }

}
