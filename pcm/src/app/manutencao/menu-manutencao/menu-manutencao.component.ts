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

  constructor(
    private route: Router,
    public realTime: RealTime
  ) { }

  ngOnInit() {

  }

  public sair(): void{
    localStorage.removeItem("idUsuario")
    localStorage.removeItem("idCargo")
    localStorage.clear()
    this.route.navigate(['/'])
  }

}
