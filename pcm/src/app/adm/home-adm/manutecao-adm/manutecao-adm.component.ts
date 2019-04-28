import { Component, OnInit } from '@angular/core';
import { ManutencaoEquipamento } from 'src/app/model/manutecao_equipamento';
import { ManutencaoEquipService } from 'src/app/services/manutencao-equip.service';

@Component({
  selector: 'app-manutecao-adm',
  templateUrl: './manutecao-adm.component.html',
  styleUrls: ['./manutecao-adm.component.css'],
  providers: [ManutencaoEquipService]
})
export class ManutecaoAdmComponent implements OnInit {

  public manutecao_equip: ManutencaoEquipamento[]

  constructor(
    private manuntecaoEquipService: ManutencaoEquipService
  ) { }

  ngOnInit() {
    this.manuntecaoEquipService.get().subscribe(
      (manutencao_equip:ManutencaoEquipamento[])=>{
        this.manutecao_equip = manutencao_equip
        console.log(this.manutecao_equip)
      }
    )
  }

}
