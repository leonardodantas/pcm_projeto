import { Component, OnInit } from '@angular/core';
import { ManutencaoEquipamento } from 'src/app/model/manutecao_equipamento';
import { ManutencaoEquipService } from 'src/app/services/manutencao-equip.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manutecao-adm',
  templateUrl: './manutecao-adm.component.html',
  styleUrls: ['./manutecao-adm.component.css'],
  providers: [ManutencaoEquipService]
})
export class ManutecaoAdmComponent implements OnInit {

  public manutecao_equip: ManutencaoEquipamento[]
  public finally_manutencao: ManutencaoEquipamento[]
  public visualizarTabela: boolean
  public qtdManutencaoAndamento : boolean
  public visualizarTabelaFinally: boolean = true
  public exibirTabelaAndamento: boolean
  public exibirTabelaFinalizada: boolean = true
  public visualizarFormAndamento: boolean
  public qtdFinalizada: boolean

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
        this.qtdManutencaoAndamento = manutencao_equip.length > 0 ? true : false

      }
    )
    this.manuntecaoEquipService.finally().subscribe(
      (manutencao_equip: ManutencaoEquipamento[])=>{
        this.finally_manutencao = manutencao_equip
        this.qtdFinalizada = manutencao_equip.length > 0 ? true : false

      }
    )
  }

  public visualizarManu(manutencao: ManutencaoEquipamento): void{
    this.visualizarTabela = true
    this.visualizarFormAndamento = true
    this.formManutencao.controls.id.setValue(manutencao.id)
    this.formManutencao.controls.equipamento.setValue(manutencao.nome)

    const datePipe =  new DatePipe('en-US')
    let data_envio = datePipe.transform(manutencao.data_envio, 'd/M/yyyy')
    this.formManutencao.controls.data_envio.setValue(data_envio)
    if(manutencao.descricao_atual_manu !== null)
      this.formManutencao.controls.descricao_atual.setValue(manutencao.descricao_atual_manu)
    else this.formManutencao.controls.descricao_atual.setValue("NENHUMA ATUALIZAÇÃO LANÇADA AINDA")
    this.formManutencao.controls.descricao_envio.setValue(manutencao.descricao_envio_user)

  }

  public fechar(): void{
    this.visualizarTabela = false
    this.visualizarFormAndamento = false
  }

  public andamento(): void{
    this.visualizarTabela = false
    this.visualizarFormAndamento = false
    this.exibirTabelaAndamento = this.exibirTabelaAndamento === false ? true : false
    this.exibirTabelaFinalizada =  this.exibirTabelaFinalizada === true ? false : true
    this.visualizarTabelaFinally = true
  }

  public finalizadas(): void{
    this.visualizarTabelaFinally = false
    this.visualizarFormAndamento = false
    this.exibirTabelaAndamento = true
    this.exibirTabelaFinalizada = false
    this.visualizarTabela = true
  }


}
