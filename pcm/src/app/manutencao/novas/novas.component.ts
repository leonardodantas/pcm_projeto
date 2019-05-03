import { Component, OnInit } from '@angular/core';
import { ManutencaoEquipService } from 'src/app/services/manutencao-equip.service';
import { ManutencaoEquipamento } from 'src/app/model/manutecao_equipamento';

@Component({
  selector: 'app-novas',
  templateUrl: './novas.component.html',
  styleUrls: ['./novas.component.css'],
  providers: [ManutencaoEquipService]
})
export class NovasComponent implements OnInit {

  public manu_equip: ManutencaoEquipamento[]

  constructor(
    private manutencaoEquipService: ManutencaoEquipService
  ) { }

  ngOnInit() {
    this.manutencaoEquipService.get().subscribe(
      (manu_equip: ManutencaoEquipamento[])=>{
        this.manu_equip = manu_equip

      }
    )
  }

}
