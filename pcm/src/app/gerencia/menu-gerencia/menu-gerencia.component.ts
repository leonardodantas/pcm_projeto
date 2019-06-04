import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-gerencia',
  templateUrl: './menu-gerencia.component.html',
  styleUrls: ['./menu-gerencia.component.css']
})
export class MenuGerenciaComponent implements OnInit {

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
