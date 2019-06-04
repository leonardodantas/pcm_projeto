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

  public getPendenciasUsuarioAtrasadas(id: number): Observable<PendenciaUsuario[]>{
    return this.http.get('http://localhost:3000/pendencia_usuario/atrasada/' + id)
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))
  }

  public atualizarPorcentagemPendencia(pendenciaUsuario: PendenciaUsuario): Observable<Response>{

    let headers = new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.put('http://localhost:3000/pendencia',
    JSON.stringify(pendenciaUsuario),
    new RequestOptions({ headers:headers}))
    .pipe(map((response: Response)=>{
      return response
    }, catchError((err:any)=>{
      return err
    })))
  }

  public atualizarPorcentagemUsuario(pendenciaUsuario: PendenciaUsuario): Observable<Response>{

    let headers = new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.put('http://localhost:3000/pendencia/usuario',
    JSON.stringify(pendenciaUsuario),
    new RequestOptions({ headers:headers}))
    .pipe(map((response: Response)=>{
      return response
    }, catchError((err:any)=>{
      return err
    })))

  }

  public atualizarPendenciaUsuario(pendenciaUsuario: PendenciaUsuario): Observable<Response>{

    let headers = new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.post('http://localhost:3000/pendencia/usuario/atualizacao',
    JSON.stringify(pendenciaUsuario),
    new RequestOptions({ headers:headers}))
    .pipe(map((response: Response)=>{
      return response
    }, catchError((err:any)=>{
      return err
    })))

  }

  public getAtualizacaoPendUser(id: number): Observable<PendenciaUsuario[]>{

    return this.http.get('http://localhost:3000/pendencia/atualizacao_pendencia_user/' + id)
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))
  }

  public getAtualizacaoPendencia(usuario: number, pendencia: number): Observable<PendenciaUsuario>{

    return this.http.get('http://localhost:3000/pendencia/atualizacao_pendencia_user/' + usuario + '/' + pendencia)
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))
  }

  public qtdUsuarios(id: number): Observable<number>{

    return this.http.get(`http://localhost:3000/pendencia/quantidade/` + id)
    .pipe(map((response: Response)=>{
      return response.json()[0].count
    }))
  }

  public getQtdAguardandoFinalizacao(): Observable<number>{

    return this.http.get(`http://localhost:3000/pendencia/quantidade/aguardando`)
    .pipe(map((response: Response)=>{
      return response.json()[0].count
    }))
  }

  public getAguardadoFinalizacao(): Observable<Pendencia[]>{

    return this.http.get(`http://localhost:3000/pendencia/aguardadando/finalizacao/`)
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))
  }

  public getAguardanddoFinalizacaoDetalhes(id: number): Observable<PendenciaUsuario[]>{

    return this.http.get(`http://localhost:3000/pendencia/info/aguardadando/finalizacao/` + id)
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))
  }

  public finalizarPendencia(pendencia: Pendencia): Observable<Response>{

    let headers = new Headers()
    headers.append('Content-type', 'application/json')
    return this.http.put(`http://localhost:3000/pendencia/finalizar/`,
    JSON.stringify(pendencia),
    new RequestOptions({ headers:headers}))
    .pipe(map((response: Response)=>{
      return response
    }, catchError((err:any)=>{
      return err
    })))
  }

  public getConcluidasAll(): Observable<Pendencia[]>{

    return this.http.get(`http://localhost:3000/pendencia/concluidas/`)
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))
  }

  public getAndamento(): Observable<Pendencia[]>{

    return this.http.get(`http://localhost:3000/pendencia/andamento/`)
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))
  }

  public getCanceladas(): Observable<Pendencia[]>{

    return this.http.get(`http://localhost:3000/pendencia/canceladas/`)
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))
  }

  public getAtrasadas(): Observable<Pendencia[]>{

    return this.http.get(`http://localhost:3000/pendencia/atrasadas/`)
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))
  }

  public getInfosPendencias(id: number): Observable<PendenciaUsuario[]>{

    return this.http.get(`http://localhost:3000/pendencia/informacoes/` + id)
    .pipe(map((response: Response)=>{
      return response.json()
    }, catchError((err:any)=>{
      return err
    })))
  }

  public cancelarPendencia(pendencia: Pendencia): Observable<Response>{

    let headers = new Headers()
    headers.append('Content-type', 'application/json')

    return this.http.put(`http://localhost:3000/pendencia/cancelar`,
    JSON.stringify(pendencia),
    new RequestOptions({ headers:headers }))
    .pipe(map((response: Response)=>{
      return response
    }, catchError((err:any)=>{
      return err
    })))
  }





}
