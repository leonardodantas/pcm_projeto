import { Component, OnInit } from '@angular/core';
import { ManutencaoEquipamento } from 'src/app/model/manutecao_equipamento';
import { ManutencaoEquipService } from 'src/app/services/manutencao-equip.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-manutecao-adm',
  templateUrl: './manutecao-adm.component.html',
  styleUrls: ['./manutecao-adm.component.css'],
  providers: [ManutencaoEquipService]
})
export class ManutecaoAdmComponent implements OnInit {

  public manutecao_equip: ManutencaoEquipamento[]
  public visualizarTabela: boolean

  public formManutencao =  new FormGroup({
    'id': new FormControl(null),
    'equipamento': new FormControl(null),
    'descricao_envio': new FormControl(null),
    'descricao_atual': new FormControl(null),
    'data_envio': new FormControl(null)
  })

  constructor(
    private manuntecaoEquipService: ManutencaoEquipService
  ) { }

  ngOnInit() {
    this.manuntecaoEquipService.get().subscribe(
      (manutencao_equip:ManutencaoEquipamento[])=>{
        this.manutecao_equip = manutencao_equip
      }
    )
  }

  public visualizarManu(manutencao: ManutencaoEquipamento): void{
    this.visualizarTabela = true
    this.formManutencao.controls.id.setValue(manutencao.id)
    this.formManutencao.controls.equipamento.setValue(manutencao.nome)
    this.formManutencao.controls.data_envio.setValue(manutencao.data_envio)
    this.formManutencao.controls.descricao_envio.setValue(manutencao.descricao_envio_user)
    this.formManutencao.controls.descricao_atual.setValue(manutencao.descricao_atual_manu)
  }

  public fechar(): void{
    this.visualizarTabela = false
  }
}
