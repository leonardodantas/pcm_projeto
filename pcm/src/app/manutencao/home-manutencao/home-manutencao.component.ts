import { Component, OnInit } from '@angular/core';
import { ManutencaoEquipamento } from 'src/app/model/manutecao_equipamento';
import { ManutencaoEquipService } from 'src/app/services/manutencao-equip.service';
import { RealTime } from 'src/app/services/realdate.service';

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

  public qtdAndamento: number
  public qtnNovas: number

  public manuStatus: boolean //envio
  public avaliStatus: boolean //avaliacao
  public abertoStatus: boolean //liberacao

  constructor(
    private manuEquipamentoService: ManutencaoEquipService,
    private realTime: RealTime
  ) { }

  ngOnInit() {
    this.manuEquipamentoService.get().subscribe(
      (manu_equipamento: ManutencaoEquipamento[])=>{

        this.qtnNovas = manu_equipamento.length

        this.manu_equip = manu_equipamento.sort((a,b)=>{
          if(a.id < b.id) return 1
          if(a.id > b.id) return -1
          return 0
        })
        this.manu_equip = this.manu_equip.slice(0,5);
        this.avaliacao = manu_equipamento.slice(0,5)

        this.manuStatus = manu_equipamento.length > 0 ? true : false
        this.avaliStatus = manu_equipamento.length > 0 ? true : false

        this.realTime.popularManutencao(this.qtnNovas, this.qtdAndamento)

      }
    )

    this.manuEquipamentoService.started().subscribe(
      (manu_equipamento: ManutencaoEquipamento[])=>{

        this.qtdAndamento = manu_equipamento.length

        this.abertoStatus = manu_equipamento.length > 0  ? true : false
        this.aberto = manu_equipamento.slice(0,5)

        this.realTime.popularManutencao(this.qtnNovas, this.qtdAndamento)

      }



    )

  }



}
