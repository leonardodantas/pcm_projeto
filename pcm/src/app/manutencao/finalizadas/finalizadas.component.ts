import { Component, OnInit } from '@angular/core';
import { ManutencaoEquipamento } from 'src/app/model/manutecao_equipamento';
import { ManutencaoEquipService } from 'src/app/services/manutencao-equip.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-finalizadas',
  templateUrl: './finalizadas.component.html',
  styleUrls: ['./finalizadas.component.css'],
  providers: [ManutencaoEquipService]
})
export class FinalizadasComponent implements OnInit {

  public equipamento_finally: ManutencaoEquipamento[]
  public equipamento: ManutencaoEquipamento

  public finalizado: boolean
  public visualizar: boolean

  public form_final =  new FormGroup({
    'id': new FormControl(null),
    'data_envio': new FormControl(null),
    'data_realizado': new FormControl(null),
    'equipamento': new FormControl(null),
    'descricao_envio': new FormControl(null),
    'ultima_atualizacao': new FormControl(null),
    'finalizacao': new FormControl(null)
  })

  constructor(
    private manutencaoService: ManutencaoEquipService
  ) { }

  ngOnInit() {
    this.manutencaoService.finally().subscribe(
      (equipamentos: ManutencaoEquipamento[])=>{
        this.equipamento_finally = equipamentos
        this.finalizado = equipamentos.length > 0 ? true : false
      }
    )
  }

  public abrirManutencao(equippamento: ManutencaoEquipamento): void{
    this.visualizar = true
    this.equipamento = equippamento

    this.form_final.controls.id.setValue(this.equipamento.id)

    const data =  new DatePipe('en-US')
    let data_envio = data.transform(this.equipamento.data_envio, 'dd/MM/yyyy')
    let data_realizado = data.transform(this.equipamento.data_realizado , 'dd/MM/yyyy')
    this.form_final.controls.data_envio.setValue(data_envio)
    this.form_final.controls.data_realizado.setValue(data_realizado)

    this.form_final.controls.equipamento.setValue(this.equipamento.nome)
    this.form_final.controls.descricao_envio.setValue(this.equipamento.descricao_envio_user)
    this.form_final.controls.ultima_atualizacao.setValue(this.equipamento.descricao_atual_manu)
    this.form_final.controls.finalizacao.setValue(this.equipamento.descricao_final_manu)
  }

  public fechar(): void{
    this.form_final.reset()
    this.visualizar = false
  }

}
