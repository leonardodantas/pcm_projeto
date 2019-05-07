import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { FichaEmprestimo } from "../model/ficha_emprestimo";
import { map, catchError } from 'rxjs/operators'

@Injectable()
export class FichaEmprestimoService{

  constructor(
    private http: Http
  ){}

  public post(ficha_emprestimo: FichaEmprestimo): Observable<Response>{

    let headers = new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.post('http://localhost:3000/ficha_emprestimo',
    JSON.stringify(ficha_emprestimo),
    new RequestOptions({ headers : headers})
    ).pipe(map((response: Response)=>{
      return response
    }, catchError((err : any)=>{
      return err
    })))
  }

  public getEspera(id: number): Observable<FichaEmprestimo[]>{

    return this.http.get('http://localhost:3000/ficha_emprestimo/' + id)
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))
  }

  public getEsperaAll(): Observable<FichaEmprestimo[]>{

    return this.http.get('http://localhost:3000/ficha_emprestimo/espera_all')
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))
  }
}
