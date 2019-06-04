import { Component, OnInit } from '@angular/core';
import { PendenciaService } from 'src/app/services/pendecia.service';
import { Pendencia } from 'src/app/model/pendencia';
import { PendenciaUsuario } from 'src/app/model/pendencia_usuario';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Response } from '@angular/http';

@Component({
  selector: 'app-canceladas',
  templateUrl: './canceladas.component.html',
  styleUrls: ['./canceladas.component.css'],
  providers: [PendenciaService]
})
export class CanceladasComponent implements OnInit {

  public pendencias: Pendencia[]
  public pendencia: Pendencia

  public pendencias_usuarios: PendenciaUsuario[]

  public visualizarPend: boolean

  public form_detalhes = new FormGroup({
    'cod': new FormControl(null),
    'data_criacao': new FormControl(null),
    'data_limite': new FormControl(null),
    'assunto': new FormControl(null),
    'descricao': new FormControl(null)
  })

  constructor(
    private pendenciaService: PendenciaService,
  ) { }

  ngOnInit() {
    this.pendenciaService.getCanceladas().subscribe(
      (pendencias: Pendencia[])=>{
        this.pendencias = pendencias
        console.log(pendencias)
      }
    )
  }

  public visualizarInfos(pendencia: Pendencia){
    this.pendencia = pendencia

    this.pendenciaService.getInfosPendencias(pendencia.id).subscribe(
      (pendencia_usuario: PendenciaUsuario[])=>{
        this.pendencias_usuarios = pendencia_usuario
      },
      (err: any)=>{
        return err
      },
      ()=>{
        const datPipe = new DatePipe('en-US')
        let data_criacao = datPipe.transform(pendencia.data_criacao, 'dd/MM/yyyy')
        let data_limite = datPipe.transform(pendencia.data_limite, 'dd/MM/yyyy')
        this.form_detalhes.controls.cod.setValue(pendencia.cod)
        this.form_detalhes.controls.data_criacao.setValue(data_criacao)
        this.form_detalhes.controls.data_limite.setValue(data_limite)
        this.form_detalhes.controls.assunto.setValue(pendencia.assunto)
        this.form_detalhes.controls.descricao.setValue(pendencia.descricao)
        this.visualizarPend = true
      }
    )
  }

  public cancelar(): void{
    this.visualizarPend = false
    this.form_detalhes.reset()
    this.pendencias_usuarios = []
  }

}
