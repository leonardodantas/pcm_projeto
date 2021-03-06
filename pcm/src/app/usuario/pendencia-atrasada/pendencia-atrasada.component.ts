import { Component, OnInit } from '@angular/core';
import { PendenciaService } from 'src/app/services/pendecia.service';
import { PendenciaUsuario } from 'src/app/model/pendencia_usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Pendencia } from 'src/app/model/pendencia';
import { Response } from '@angular/http';

@Component({
  selector: 'app-pendencia-atrasada',
  templateUrl: './pendencia-atrasada.component.html',
  styleUrls: ['./pendencia-atrasada.component.css'],
  providers: [PendenciaService]
})
export class PendenciaAtrasadaComponent implements OnInit {

  public pendenciaUsuario: PendenciaUsuario[]
  public atualizacaoPendencias: PendenciaUsuario[]
  public qtdAtualizadas: boolean
  public pendencia_usuario: PendenciaUsuario
  public isPendenciaUsuario: boolean
  public qtdUsers: number
  public porcentagemMinina: number
  public  abrirForm: boolean
  public atualizarPend: boolean
  public form_pendenciaUsuario = new FormGroup({
    'cod': new FormControl(null),
    'data_criacao': new FormControl(null),
    'data_limite': new FormControl(null),
    'assunto': new FormControl(null),
    'descricao': new FormControl(null),
    'atualizacao': new FormControl(null , [Validators.required]),
    'porcentagem': new FormControl(null,[Validators.required,Validators.min(0), Validators.max(100)])
  })

  constructor(
    private pendenciaService: PendenciaService
  ) {
    this. abrirForm = false
    this.porcentagemMinina = 0
    this.qtdAtualizadas = true
  }

  ngOnInit() {
    this.popularTabelaInicial()
  }

  public popularTabelaInicial(): void{
    let id = parseInt(localStorage.getItem("idUsuario"))
    this.pendenciaService.getPendenciasUsuarioAtrasadas(id).subscribe(
      (pendencia_usuario: PendenciaUsuario[])=>{
        this.pendenciaUsuario = pendencia_usuario
        this.isPendenciaUsuario = pendencia_usuario.length > 0 ? true : false
      }
    )
  }

  public selecionarPendencia(pendencia_usuario: PendenciaUsuario): void{

    this.atualizarPend = pendencia_usuario.porc_total_atual > 99.99 ? false : true
    this.pendenciaService.getAtualizacaoPendUser(pendencia_usuario.id).subscribe(
      (pendencia_usuario: PendenciaUsuario[])=>{
        this.atualizacaoPendencias = pendencia_usuario
        this.qtdAtualizadas = pendencia_usuario.length > 0 ? true : false
      }
    )
    this.pendencia_usuario = pendencia_usuario
    this.porcentagemMinina = pendencia_usuario.porc_total_atual
    this.abrirForm = true

    this.form_pendenciaUsuario.controls.porcentagem.setValidators([Validators.min(this.porcentagemMinina + 1),Validators.max(100)])

    const dataPipe = new DatePipe('en-US')
    let data_criacao = dataPipe.transform(this.pendencia_usuario.data_criacao, 'dd/MM/yyyy')
    let data_limite = dataPipe.transform(this.pendencia_usuario.data_limite, 'dd/MM/yyyy')

    this.form_pendenciaUsuario.controls.cod.setValue(this.pendencia_usuario.cod)
    this.form_pendenciaUsuario.controls.data_criacao.setValue(data_criacao)
    this.form_pendenciaUsuario.controls.data_limite.setValue(data_limite)
    this.form_pendenciaUsuario.controls.assunto.setValue(this.pendencia_usuario.assunto)
    this.form_pendenciaUsuario.controls.descricao.setValue(this.pendencia_usuario.descricao)
    //this.form_pendenciaUsuario.controls.porcentagem.setValue(this.porcentagemMinina)

  }

  public followUp(): void{

    this.pendenciaService.qtdUsuarios(this.pendencia_usuario.id_pendencia).subscribe(
      (qtd: number)=>{
        this.qtdUsers = qtd

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
          this.form_pendenciaUsuario.controls.porcentagem.value - (this.pendencia_usuario.porc_total_atual)/this.qtdUsers,
          null
        )
        let perceAtualizadaGeral =(this.form_pendenciaUsuario.controls.porcentagem.value - (this.pendencia_usuario.porc_total_atual))/this.qtdUsers;

        let porcentagem_pendencia = new PendenciaUsuario(
          null,
          null,
          this.pendencia_usuario.id_pendencia,
          null,
          null,
          null,
          null,
          null,
          perceAtualizadaGeral,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        )

        this.pendenciaService.atualizarPorcentagemPendencia(porcentagem_pendencia).subscribe(
          (response: Response)=>{
            console.log(response)
          },
          (err:any)=>
          console.log(err),
          ()=>{
            let porcentagem_usuario = new PendenciaUsuario(
              null,
              null,
              this.pendencia_usuario.id,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              this.form_pendenciaUsuario.controls.porcentagem.value,
              null,
              null,
              null
            )
            this.pendenciaService.atualizarPorcentagemUsuario(porcentagem_usuario).subscribe(
              (response: Response)=>{
                console.log(response)
              },
              (err: any)=>{
                console.log(err)
              },
              ()=>{
                let pendencia_usuario = new PendenciaUsuario(
                  null,
                  null,
                  this.pendencia_usuario.id,
                  this.form_pendenciaUsuario.controls.atualizacao.value,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  this.form_pendenciaUsuario.controls.porcentagem.value,
                  null,
                  null,
                  null

                )
                this.pendenciaService.atualizarPendenciaUsuario(pendencia_usuario).subscribe(
                  (response: Response)=>{
                    console.log(response)
                  },
                  (err:any)=>{
                    console.log(err)
                  },
                  ()=>{
                    //this.cancelar()
                    this.popularTabelaInicial()
                    this.abrirForm = false
                    this.atualizacaoPendencias = []

                  }
                )
              }
            )
          }
        )
      }


    )
  }
  public cancelar(): void{
    this.abrirForm = false
    this.atualizacaoPendencias = []
    this.form_pendenciaUsuario.reset()
  }
}
