import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})
export class MenuUsuarioComponent implements OnInit {

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
