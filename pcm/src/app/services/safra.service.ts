import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators'
import { Safra } from "../model/safra";

@Injectable()
export class SafraService{

  constructor(
    private http: Http
  ){}

  public getSafra(): Observable<Safra>{

    return this.http.get('http://localhost:3000/safra')
    .pipe(map((response: Response)=>{
      return response.json()[0]
    },catchError((err:any)=>{
      return err
    })))
  }

  public atualizarSafra(safra: Safra): Observable<Response>{

    let headers = new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.put('http://localhost:3000/safra',
    JSON.stringify(safra),
    new RequestOptions({ headers:headers})
    )
    .pipe(map((response: Response)=>{
      return response
    }, catchError((err:any)=>{
      return err
    })))
  }

  public aumentarCodigo(): Observable<Response>{

    let safra: Safra

    let headers = new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.put('http://localhost:3000/safra/aumentar-codigo',
    JSON.stringify(safra),
    new RequestOptions({ headers:headers})
    )
    .pipe(map((response: Response)=>{
      return response
    }, catchError((err:any)=>{
      return err
    })))
  }
}
