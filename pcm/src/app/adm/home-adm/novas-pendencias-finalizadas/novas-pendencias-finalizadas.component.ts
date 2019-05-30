import { Component, OnInit } from '@angular/core';
import { PendenciaService } from 'src/app/services/pendecia.service';
import { Pendencia } from 'src/app/model/pendencia';
import { PendenciaUsuario } from 'src/app/model/pendencia_usuario';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Response } from '@angular/http';
import { RealTime } from 'src/app/services/realdate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novas-pendencias-finalizadas',
  templateUrl: './novas-pendencias-finalizadas.component.html',
  styleUrls: ['./novas-pendencias-finalizadas.component.css'],
  providers: [PendenciaService]
})
export class NovasPendenciasFinalizadasComponent implements OnInit {

  public pendencias: Pendencia[]
  public pendencia: Pendencia
  public pendencia_usuarios: PendenciaUsuario[]

  public infoFinalizadas: boolean

  public finalzacaoSucess: boolean
  public finalzacaoErr: boolean

  public form_detalhes = new FormGroup({
    'cod': new FormControl(null),
    'data_criacao': new FormControl(null),
    'data_limite': new FormControl(null),
    'assunto': new FormControl(null),
    'descricao': new FormControl(null)
  })

  constructor(
    private pendenciaService: PendenciaService,
    private realTimeService: RealTime,
    private router: Router
  ) { }

  ngOnInit() {
    this.pendenciaService.getAguardadoFinalizacao().subscribe(
      (pendencia: Pendencia[])=>{
        this.pendencias = pendencia
      },
      (err:any)=>{
        console.log(err)
      }
    )
  }

  public visualizarAtualizacoes(pendencia: Pendencia): void{
    this.pendencia = pendencia
    this.pendenciaService.getAguardanddoFinalizacaoDetalhes(pendencia.id).subscribe(
      (pendencia_usuario: PendenciaUsuario[])=>{
        this.pendencia_usuarios = pendencia_usuario
      },
      (err:any)=> console.log(err),
      ()=>{

        const datePipe = new DatePipe('en-US')
        let data_criacao = datePipe.transform(pendencia.data_criacao, 'dd/MM/yyyy')
        let data_limite = datePipe.transform(pendencia.data_limite, 'dd/MM/yyyy')

        this.form_detalhes.controls.cod.setValue(pendencia.cod)
        this.form_detalhes.controls.data_criacao.setValue(data_criacao)
        this.form_detalhes.controls.data_limite.setValue(data_limite)
        this.form_detalhes.controls.assunto.setValue(pendencia.assunto)
        this.form_detalhes.controls.descricao.setValue(pendencia.descricao)

        this.infoFinalizadas = true

      }
    )

  }

  public finalizar(): void{

    this.pendenciaService.finalizarPendencia(this.pendencia).subscribe(
      (response: Response)=>{
        this.realTimeService.diminuirPendenciasAguard()
        let index = this.pendencias.indexOf(this.pendencia)
        this.pendencias.splice(index, 1)
        this.infoFinalizadas = false
        if(this.pendencias.length === 0)
          this.router.navigate(['/adm'])
      },
      (err:any)=>{
        this.finalzacaoErr = true
      },
      ()=>{
        this.finalzacaoSucess = true
        setTimeout(() => {
            this.finalzacaoSucess = false
        }, 4000);
      }
    )
  }

  public cancelar(): void{
    this.infoFinalizadas = false
    this.form_detalhes.reset()
  }

}
