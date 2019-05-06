import { Component, OnInit } from '@angular/core';
import { ManutencaoEquipamento } from 'src/app/model/manutecao_equipamento';
import { ManutencaoEquipService } from 'src/app/services/manutencao-equip.service';

@Component({
  selector: 'app-home-manutencao',
  templateUrl: './home-manutencao.component.html',
  styleUrls: ['./home-manutencao.component.css'],
  providers: [ManutencaoEquipService]
})
export class HomeManutencaoComponent implements OnInit {

  public manu_equip: ManutencaoEquipamento[]
  public avaliacao: ManutencaoEquipamento[]
  public aberto: ManutencaoEquipamento[]

  public manuStatus: boolean //envio
  public avaliStatus: boolean //avaliacao
  public abertoStatus: boolean //liberacao

  constructor(
    private manuEquipamentoService: ManutencaoEquipService,
  ) { }

  ngOnInit() {
    this.manuEquipamentoService.get().subscribe(
      (manu_equipamento: ManutencaoEquipamento[])=>{

        this.manu_equip = manu_equipamento.sort((a,b)=>{
          if(a.id < b.id) return 1
          if(a.id > b.id) return -1
          return 0
        })
        this.manu_equip = this.manu_equip.slice(0,5);
        this.avaliacao = manu_equipamento.slice(0,5)

        this.manuStatus = manu_equipamento.length > 0 ? true : false
        this.avaliStatus = manu_equipamento.length > 0 ? true : false

      }
    )

    this.manuEquipamentoService.started().subscribe(
      (manu_equipamento: ManutencaoEquipamento[])=>{

        this.abertoStatus = manu_equipamento.length > 0  ? true : false
        this.aberto = manu_equipamento.slice(0,5)

      }



    )

  }



}
