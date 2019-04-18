import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-novos-usuarios',
  templateUrl: './novos-usuarios.component.html',
  styleUrls: ['./novos-usuarios.component.css'],
  providers: [UsuariosService]
})
export class NovosUsuariosComponent implements OnInit {

  public usuarios:Usuario
  public qtdUsuario: number = 1

  constructor(
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {

    this.usuarioService.getQtdId().subscribe(
      (qtd: number)=>{

        this.qtdUsuario = (qtd > 0) ? qtd : undefined

      }
    )

    this.usuarioService.getUsers().subscribe(
      (usuarios: Usuario)=>{
        this.usuarios = usuarios
      }
    )


  }

}
