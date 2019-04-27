import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-manutencao',
  templateUrl: './menu-manutencao.component.html',
  styleUrls: ['./menu-manutencao.component.css']
})
export class MenuManutencaoComponent implements OnInit {

  constructor(
    private route: Router
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
