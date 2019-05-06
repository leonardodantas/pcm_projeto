import { Component, OnInit } from '@angular/core';
import { ManutencaoEquipService } from 'src/app/services/manutencao-equip.service';
import { ManutencaoEquipamento } from 'src/app/model/manutecao_equipamento';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Response } from '@angular/http';
import { RealTime } from 'src/app/services/realdate.service';

@Component({
  selector: 'app-novas',
  templateUrl: './novas.component.html',
  styleUrls: ['./novas.component.css'],
  providers: [ManutencaoEquipService]
})
export class NovasComponent implements OnInit {

  public manu_equip: ManutencaoEquipamento[]
  public manu_equipE: ManutencaoEquipamento

  public manuNovas: boolean
  public editNova: boolean
  public alertSuccess: boolean
  public alertDanger: boolean

  public form_novas = new FormGroup({
    'id': new FormControl(null),
    'data_envio': new FormControl(null),
    'equipamento': new FormControl(null),
    'descricao_envio': new FormControl(null),
    'atualizacao': new FormControl(null, [Validators.required, Validators.minLength(10)])
  })

  constructor(
    private manutencaoEquipService: ManutencaoEquipService,
    private realTIme: RealTime
  ) { }

  ngOnInit() {
    this.manutencaoEquipService.get().subscribe(
      (manu_equip: ManutencaoEquipamento[])=>{
        this.manu_equip = manu_equip
        this.manuNovas = manu_equip.length > 0 ? true : false

      }
    )
  }

  public abrirNovas(manu_equip: ManutencaoEquipamento): void{

    this.manu_equipE = manu_equip

    this.editNova = true
    this.form_novas.controls.id.setValue(manu_equip.id)
    this.form_novas.controls.equipamento.setValue(manu_equip.nome)

    const dataPipe = new DatePipe('en-US')
    let dataEnvio = dataPipe.transform(manu_equip.data_envio, 'dd/M/yyyy')
    this.form_novas.controls.data_envio.setValue(dataEnvio)
    this.form_novas.controls.descricao_envio.setValue(manu_equip.descricao_envio_user)
  }

  public cancelar(): void{
    this.form_novas.reset()
    this.editNova = false
  }

  public atualizar():void{

    let index = this.manu_equip.indexOf(this.manu_equipE)

    this.manu_equipE.descricao_atual_manu =  this.form_novas.controls.atualizacao.value

    this.manutencaoEquipService.atualizar(this.manu_equipE).subscribe(
      (response: Response)=>{
        this.manu_equip.splice(index,1)
        this.alertSuccess = true
        setTimeout(() => {
          this.alertSuccess = false
        }, 4000);
      },
      (err : any)=>{
        this.alertDanger = true
        setTimeout(() => {
          this.alertDanger = false
        }, 4000);
      },
      ()=>{
        this.editNova = false
        this.realTIme.aumentarManuAndamento()
        this.realTIme.diminuirNovas()
      }
    )




  }

}
