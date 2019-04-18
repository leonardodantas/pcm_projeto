import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-menu-adm',
  templateUrl: './menu-adm.component.html',
  styleUrls: ['./menu-adm.component.css'],
  providers: [UsuariosService]
})
export class MenuAdmComponent implements OnInit {

  public qtdUsuarios: number

  constructor(
    private route: Router,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    this.quantidadeUsuarios()
  }

  public quantidadeUsuarios(): void{
    this.usuarioService.getQtdId().subscribe(
      (qtd: number)=>{
        this.qtdUsuarios = qtd
      }
    )
  }

  public sair(): void{
    localStorage.removeItem("idUsuario")
    localStorage.removeItem("idCargo")
    this.route.navigate(['/'])
  }

}
