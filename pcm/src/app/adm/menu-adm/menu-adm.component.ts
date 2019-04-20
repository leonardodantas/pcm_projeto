import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/model/usuario';
import { RealTime } from 'src/app/services/realdate.service';

@Component({
  selector: 'app-menu-adm',
  templateUrl: './menu-adm.component.html',
  styleUrls: ['./menu-adm.component.css'],
  providers: [UsuariosService]
})
export class MenuAdmComponent implements OnInit{

  public qtdUsuarios: number
  public atualizarQtd: boolean

  constructor(
    private route: Router,
    private usuarioService: UsuariosService,
    public realTime: RealTime,

  ) { }


  ngOnInit() {

    this.usuarioService.getUsers().subscribe(
      (usuario: Usuario[])=>{
        this.qtdUsuarios = usuario.length
      },
      (err: any)=>{
        console.log(err)
      },
      ()=>{
        this.realTime.popularQtdUser(this.qtdUsuarios)
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
