import { Component, OnInit } from '@angular/core';
import { ManutencaoEquipService } from 'src/app/services/manutencao-equip.service';
import { ManutencaoEquipamento } from 'src/app/model/manutecao_equipamento';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Response } from '@angular/http';
import { RealTime } from 'src/app/services/realdate.service';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { Equipamento } from 'src/app/model/equipamento';

@Component({
  selector: 'app-andamento',
  templateUrl: './andamento.component.html',
  styleUrls: ['./andamento.component.css'],
  providers: [ManutencaoEquipService, EquipamentoService]
})
export class AndamentoComponent implements OnInit {

  public manu_equip: ManutencaoEquipamento[]
  public manu_equipM: ManutencaoEquipamento

  public manuEquiStatus: boolean
  public editAndamento: boolean

  public finalizada: boolean
  public andamento: boolean
  public erro: boolean

  public form_andamento = new FormGroup({
    'id': new FormControl(null),
    'data_envio': new FormControl(null),
    'equipamento': new FormControl(null),
    'descricao_envio': new FormControl(null),
    'ultima_atualizacao': new FormControl(null),
    'nova_atualizacao' : new FormControl(null, [Validators.required, Validators.minLength(15)])
  })

  constructor(
    private manutencaoService: ManutencaoEquipService,
    private realTime: RealTime,
    private equipamentoService: EquipamentoService
  ) { }

  ngOnInit() {
    this.manutencaoService.started().subscribe(
      (manu_equip: ManutencaoEquipamento[])=>{
        this.manu_equip = manu_equip
        this.manuEquiStatus = manu_equip.length > 0 ? false : true
      }
    )
  }

  public abrirAndamento(manu_equip : ManutencaoEquipamento): void{
    this.editAndamento = true
    this.manu_equipM = manu_equip

    this.form_andamento.controls.id.setValue(this.manu_equipM.id)

    const datePipe = new DatePipe('en-US')
    let dataEnvio = datePipe.transform(this.manu_equipM.data_envio, 'dd/MM/yyy')
    this.form_andamento.controls.data_envio.setValue(dataEnvio)

    this.form_andamento.controls.equipamento.setValue(this.manu_equipM.nome)
    this.form_andamento.controls.descricao_envio.setValue(this.manu_equipM.descricao_envio_user)
    this.form_andamento.controls.ultima_atualizacao.setValue(this.manu_equipM.descricao_atual_manu)
  }

  public cancelar(): void{
    this.form_andamento.reset()
    this.editAndamento = false
  }

  public atualizar(): void{
    this.manu_equipM.descricao_atual_manu = this.form_andamento.controls.nova_atualizacao.value

    this.manutencaoService.atualizar(this.manu_equipM).subscribe(
      (response: Response)=>{
        this.andamento = true
        this.editAndamento = false
        setTimeout(() => {
            this.andamento = false
        }, 4000);
      },
      (err : any)=>{
        this.erro = true
        setTimeout(() => {
          this.erro = false
        }, 4000);
      },
      ()=>{

      }
    )
  }

  public finalizar(): void{
    let index = this.manu_equip.indexOf(this.manu_equipM)
    this.manu_equipM.descricao_final_manu = this.form_andamento.controls.nova_atualizacao.value
    this.manu_equip.splice(index,1)

    this.manutencaoService.finalizar(this.manu_equipM).subscribe(
      (response: Response)=>{
        this.editAndamento = false
        this.finalizada = true
        setTimeout(() => {
          this.finalizada = false
        }, 4000);
      },
      (err: any)=>{
        this.erro = true
        setTimeout(() => {
          this.erro = false
        }, 4000);
      },
      ()=>{
        let equipamento = new Equipamento(
          this.manu_equipM.id_equipamento,
          '',
          'LIVRE'
        )
        this.equipamentoService.updateEquipamentoStatus(equipamento).subscribe(
          (response: Response)=>{
            this.form_andamento.reset()
          }
        )
        this.realTime.diminuirAndamento()
      }
    )




  }

}
