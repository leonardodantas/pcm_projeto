import { Component, OnInit } from '@angular/core';
import { FichaEmprestimoService } from 'src/app/services/ficha-emprestimo.service';
import { FichaEmprestimo } from 'src/app/model/ficha_emprestimo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Response } from '@angular/http';
import { Equipamento } from 'src/app/model/equipamento';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { RealTime } from 'src/app/services/realdate.service';

@Component({
  selector: 'app-novas-requisicoes',
  templateUrl: './novas-requisicoes.component.html',
  styleUrls: ['./novas-requisicoes.component.css'],
  providers: [FichaEmprestimoService, EquipamentoService]
})
export class NovasRequisicoesComponent implements OnInit {

  public ficha_emprestimo: FichaEmprestimo[]
  public isValidFicha: boolean

  public liberarEquipamento: boolean
  public ficha: FichaEmprestimo

  public status: string
  public finalizar: boolean

  public form_liberarEquipament = new FormGroup({
    'id':  new FormControl(null),
    'data_envio': new FormControl(null),
    'equipamento': new FormControl(null),
    'descricao_requisicao': new FormControl(null),
    'usuario': new FormControl(null)
  })

  constructor(
    private fichaEmprestimoService: FichaEmprestimoService,
    private equipamentoService: EquipamentoService,
    private realTime: RealTime
  ) { }

  ngOnInit() {

    this.fichaEmprestimoService.getEsperaAll().subscribe(
      (ficha_emprestimo: FichaEmprestimo[])=>{

        this.ficha_emprestimo = ficha_emprestimo
        this.isValidFicha = ficha_emprestimo.length > 0 ? true : false
      }
    )
  }

  public selecionarFicha(ficha_emprestimo: FichaEmprestimo){
    this.liberarEquipamento = true
    this.ficha = ficha_emprestimo
    let dataPipe = new DatePipe('en-US')
    let data_envio = dataPipe.transform(this.ficha.data_requisicao, 'dd/MM/yyyy')

    this.form_liberarEquipament.controls.id.setValue(this.ficha.id)
    this.form_liberarEquipament.controls.data_envio.setValue(data_envio)
    this.form_liberarEquipament.controls.equipamento.setValue(this.ficha.nome)
    this.form_liberarEquipament.controls.usuario.setValue(this.ficha.nome_usuario)
    this.form_liberarEquipament.controls.descricao_requisicao.setValue(this.ficha.motivo_emprestimo)
  }

  public finalizarAcao(status: string): void{
    let index = this.ficha_emprestimo.indexOf(this.ficha)
    this.ficha_emprestimo.splice(index,1)
    this.liberarEquipamento = false
    this.status = status
    this.finalizar = true
    this.realTime.diminuirRequisicoes()
    this.form_liberarEquipament.reset()
    setTimeout(() => {
      this.finalizar = false
    }, 3000);
  }

  public aceitar(): void{
    this.fichaEmprestimoService.aceitar(this.ficha).subscribe(
      (response: Response)=>{
        console.log(response)
      },
      (err:any)=>{
        console.log(err)
      },
      ()=>{
        let status = "EQUIPAMENTO LIBERADO COM SUCESSO"
        this.finalizarAcao(status)

      }
    )
  }

  public recusar(): void{

    this.fichaEmprestimoService.recusar(this.ficha).subscribe(
      (response: Response)=>{
        console.log(response)
      },
      (err:any)=>{
        console.log(err)
      },
      ()=>{
        let equipamento = new Equipamento(
          this.ficha.id_emprestimo,
          '',
          'LIVRE'
        )
        this.equipamentoService.updateEquipamentoStatus(equipamento).subscribe(
          (response: Response)=>{
            let status = "EQUIPAMENTO RECUSADO"
            this.finalizarAcao(status)
          }
        )

      }
    )
  }

  public cancelar(): void{
    this.liberarEquipamento = false
    this.form_liberarEquipament.reset()
  }

}
