import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManutencaoEquipService } from 'src/app/services/manutencao-equip.service';
import { ManutencaoEquipamento } from 'src/app/model/manutecao_equipamento';
import { RealTime } from 'src/app/services/realdate.service';

@Component({
  selector: 'app-menu-manutencao',
  templateUrl: './menu-manutencao.component.html',
  styleUrls: ['./menu-manutencao.component.css'],
  providers: [ManutencaoEquipService]
})
export class MenuManutencaoComponent implements OnInit {

  public qtdAndamento: number
  public qtdNovas: number

  public novas: boolean
  public andamento: boolean

  constructor(
    private manuEquipamentoService: ManutencaoEquipService,
    private route: Router,
    public realTime: RealTime
  ) { }

  ngOnInit() {
     this.manuEquipamentoService.get().subscribe(
      (manu_equipamento: ManutencaoEquipamento[])=>{

        this.qtdNovas = manu_equipamento.length

        this.novas = this.qtdNovas > 0 ? true : false

        this.realTime.popularManutencao(this.qtdNovas, this.qtdAndamento)

      }
    )

    this.manuEquipamentoService.started().subscribe(
      (manu_equipamento: ManutencaoEquipamento[])=>{

        this.qtdAndamento = manu_equipamento.length

        this.andamento = this.qtdAndamento > 0 ? true : false

        this.realTime.popularManutencao(this.qtdNovas, this.qtdAndamento)

      }



    )

  }

  public sair(): void{
    localStorage.removeItem("idUsuario")
    localStorage.removeItem("idCargo")
    localStorage.clear()
    this.route.navigate(['/'])
  }

}
