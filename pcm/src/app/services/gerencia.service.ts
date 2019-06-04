import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators'
import { Pendencia } from "../model/pendencia";
import { Equipamento } from "../model/equipamento";

//AS ROTAS REFERENTES A ESTE SERVIÇO ESTÃO NO ARQUIVO FUNÇÃO
@Injectable()
export class GerenciaService{

  constructor(
    private http: Http
  ){}

  public getPendenciasGerencia(): Observable<Pendencia[]>{

    return this.http.get(`http://localhost:3000/gerencia_pendencias`)
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    }) ))
  }

  public getEquipamentosGerencia(): Observable<Equipamento[]>{

    return this.http.get(`http://localhost:3000/gerencia_equipamentos`)
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))

  }

}
