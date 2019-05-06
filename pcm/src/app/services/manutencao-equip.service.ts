import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ManutencaoEquipamento } from "../model/manutecao_equipamento";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class ManutencaoEquipService{

  constructor(
    private http: Http
  ){}

  public post(manu_equip: ManutencaoEquipamento): Observable<Response>{

    let headers = new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.post('http://localhost:3000/MANU_EQUIP',
    JSON.stringify(manu_equip),
    new RequestOptions({ headers :  headers})
    ).pipe(map((response: Response)=>{
      return response
    }, catchError((err:any)=>{
      return err
    })))
  }

  public get(): Observable<ManutencaoEquipamento[]>{

    return this.http.get('http://localhost:3000/MANU_EQUIP')
    .pipe(map((manuEquip: Response)=>{
      return manuEquip.json()
    }, catchError((err:any)=>{
      return err
    })))
  }

  public getAll(): Observable<ManutencaoEquipamento[]>{

    return this.http.get('http://localhost:3000/MANU_EQUIP/all')
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))
  }

  public finally(): Observable<ManutencaoEquipamento[]>{

    return this.http.get('http://localhost:3000/MANU_EQUIP/finally')
    .pipe(map((manuEquip: Response)=>{
      return manuEquip.json()
    }, catchError((err: any)=> err )))
  }

  public started(): Observable<ManutencaoEquipamento[]>{

    return this.http.get('http://localhost:3000/MANU_EQUIP/started')
    .pipe(map((manuEquip: Response)=>{
      return manuEquip.json()
    }, catchError((err: any)=>{
      return err
    })))
  }

  public atualizar(manu_equip: ManutencaoEquipamento): Observable<Response>{

    let headers =  new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.put('http://localhost:3000/MANU_EQUIP/',
    JSON.stringify(manu_equip),
    new RequestOptions({ headers : headers}))
    .pipe(map((response: Response)=>{
      return response
    }, catchError((err : any)=>{
      return err
    })))

  }

  public finalizar(manu_equip: ManutencaoEquipamento): Observable<Response>{
    console.log(JSON.stringify(manu_equip))
    let headers =  new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.put('http://localhost:3000/manu_equip/finally',
    JSON.stringify(manu_equip),
    new RequestOptions({ headers : headers})
    )
    .pipe(map((response: Response)=>{
      return response
    },catchError((err:any)=>{
      return err
    })))

  }
}
