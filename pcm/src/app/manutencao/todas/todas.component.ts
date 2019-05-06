import { Component, OnInit } from '@angular/core';
import { ManutencaoEquipService } from 'src/app/services/manutencao-equip.service';
import { ManutencaoEquipamento } from 'src/app/model/manutecao_equipamento';

@Component({
  selector: 'app-todas',
  templateUrl: './todas.component.html',
  styleUrls: ['./todas.component.css'],
  providers: [ManutencaoEquipService]
})
export class TodasComponent implements OnInit {

  public manu_equip: ManutencaoEquipamento[]

  constructor(
    private manutencaoService: ManutencaoEquipService
  ) { }

  ngOnInit() {
    this.manutencaoService.getAll().subscribe(
      (manu_equip: ManutencaoEquipamento[])=>{
        this.manu_equip = manu_equip

        this.manu_equip.forEach(element =>{
          if(element.descricao_atual_manu === null)
            element.status = "NOVA"
          else if(element.data_realizado === null && element.descricao_atual_manu !== null)
            element.status = "ANDAMENTO"
          else element.status = "FINALIZADO"
        })
      }
    )
  }

}
