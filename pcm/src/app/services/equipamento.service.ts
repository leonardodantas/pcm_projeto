import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { Equipamento } from "../model/equipamento";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class EquipamentoService{

  constructor(
    private http: Http
  ){}

  public get(): Observable<Equipamento[]>{
    return this.http.get('http://localhost:3000/equipamento')
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))
  }

  public inserirEquipamento(equipamento: Equipamento): Observable<Response>{

    let headers =  new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.post('http://localhost:3000/equipamento',
    JSON.stringify(equipamento),
    new RequestOptions({ headers : headers })
    ).pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err: any)=>{
      return err
    })))
  }

  public updateEquipamento(equipamento: Equipamento): Observable<Response>{
    console.log(JSON.stringify(equipamento))
    let headers =  new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.put('http://localhost:3000/equipamento',
    JSON.stringify(equipamento),
    new RequestOptions({ headers : headers })
    ).pipe(map((response: Response)=>{
      return response
    }, catchError((err: any)=>{
      return err
    })))
  }
}
