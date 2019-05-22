import { Component, OnInit } from '@angular/core';
import { PendenciaUsuario } from 'src/app/model/pendencia_usuario';
import { PendenciaService } from 'src/app/services/pendecia.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Pendencia } from 'src/app/model/pendencia';

@Component({
  selector: 'app-pendencia-atual',
  templateUrl: './pendencia-atual.component.html',
  styleUrls: ['./pendencia-atual.component.css'],
  providers: [PendenciaService]
})
export class PendenciaAtualComponent implements OnInit {

  public pendenciaUsuario: PendenciaUsuario[]
  public pendencia_usuario: PendenciaUsuario
  public isPendenciaUsuario: boolean
  public porcentagemMinina: number
  public  abrirForm: boolean
  public form_pendenciaUsuario = new FormGroup({
    'cod': new FormControl(null),
    'data_criacao': new FormControl(null),
    'data_limite': new FormControl(null),
    'assunto': new FormControl(null),
    'descricao': new FormControl(null),
    'atualizacao': new FormControl(null),
    'porcentagem': new FormControl(null)
  })

  constructor(
    private pendenciaService: PendenciaService
  ) {
    this. abrirForm = false
    this.porcentagemMinina = 0
  }

  ngOnInit() {
    let id = parseInt(localStorage.getItem("idUsuario"))
    this.pendenciaService.getPendenciasUsuario(id).subscribe(
      (pendencia_usuario: PendenciaUsuario[])=>{
        this.pendenciaUsuario = pendencia_usuario
        this.isPendenciaUsuario = pendencia_usuario.length > 0 ? true : false
      }
    )
  }

  public selecionarPendencia(pendencia_usuario: PendenciaUsuario): void{
    this.pendencia_usuario = pendencia_usuario
    this.porcentagemMinina = pendencia_usuario.porc_total_atual
    this.abrirForm = true

    const dataPipe = new DatePipe('en-US')
    let data_criacao = dataPipe.transform(this.pendencia_usuario.data_criacao, 'dd/MM/yyyy')
    let data_limite = dataPipe.transform(this.pendencia_usuario.data_limite, 'dd/MM/yyyy')

    this.form_pendenciaUsuario.controls.cod.setValue(this.pendencia_usuario.cod)
    this.form_pendenciaUsuario.controls.data_criacao.setValue(data_criacao)
    this.form_pendenciaUsuario.controls.data_limite.setValue(data_limite)
    this.form_pendenciaUsuario.controls.assunto.setValue(this.pendencia_usuario.assunto)
    this.form_pendenciaUsuario.controls.descricao.setValue(this.pendencia_usuario.descricao)

  }

  public followUp(): void{
    let qtdUsuario = 4
    let pendencia = new Pendencia(
      this.pendencia_usuario.id_pendencia,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      this.form_pendenciaUsuario.controls.porcentagem.value - (this.pendencia_usuario.porc_total_atual)/qtdUsuario
    )
    let perceAtualizadaGeral =(this.form_pendenciaUsuario.controls.porcentagem.value - (this.pendencia_usuario.porc_total_atual))/qtdUsuario;
    console.log('id pendencia: ' + this.pendencia_usuario.id_pendencia)
    console.log('id usuario: ' + parseInt(localStorage.getItem("idUsuario")))
    console.log('atualização: ' + this.form_pendenciaUsuario.controls.atualizacao.value )
    console.log('Porcentagem usuario: ' + this.form_pendenciaUsuario.controls.porcentagem.value)
    console.log('Porcentagem total atualizada: ' + perceAtualizadaGeral)


  }

}
