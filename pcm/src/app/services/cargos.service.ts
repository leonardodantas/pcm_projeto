import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { Cargos } from "../model/cargos";
import { map, catchError } from 'rxjs/operators'

@Injectable()
export class CargosService{

  constructor(
    private http: Http
  ){}

  public get(): Observable<Cargos[]>{
    return this.http.get('http://localhost:3000/cargos')
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((erro: any)=>{
      return erro
    })))
  }

}
