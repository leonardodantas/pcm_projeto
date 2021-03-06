import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { Funcao } from "../model/funcao";
import { map, catchError } from 'rxjs/operators'
import { Injectable } from "@angular/core";

@Injectable()
export class FuncoesService{

  constructor(
    private http: Http
  ){}

  public get(): Observable<Funcao[]>{
    return this.http.get('http://localhost:3000/funcao')
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err: any)=>{
      return err
    })))
  }

  public post(funcao: Funcao): Observable<any>{

    let headers = new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.post('http://localhost:3000/funcao',
    JSON.stringify(funcao),
    new RequestOptions({ headers : headers})
    )
    .pipe(map((response: Response)=>{
      return response
    }, catchError((err: any)=>{
      return err
    })))

  }

  public delete(id: number): Observable<any>{
    return this.http.delete('http://localhost:3000/funcao/' + id)
    .pipe(map((response: Response)=>{
      return response
    }, catchError((err:any)=>{
      return err
    })))
  }

  public put(funcao: Funcao): Observable<any>{

    let headers = new Headers()
    headers.append('Content-type', 'application/json')

    return this.http.put('http://localhost:3000/funcao',
    JSON.stringify(funcao),
    new RequestOptions({ headers : headers})
    )
    .pipe(map((response: Response)=>{
      return response
    }, catchError((err: any)=>{
      return err
    })))
  }
}
