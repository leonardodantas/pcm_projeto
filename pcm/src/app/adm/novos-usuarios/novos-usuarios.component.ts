import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/model/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cargos } from 'src/app/model/cargos';
import { CargosService } from 'src/app/services/cargos.service';
import { Router } from '@angular/router';
import { RealTime } from 'src/app/services/realdate.service';

@Component({
  selector: 'app-novos-usuarios',
  templateUrl: './novos-usuarios.component.html',
  styleUrls: ['./novos-usuarios.component.css'],
  providers: [UsuariosService, CargosService]
})
export class NovosUsuariosComponent implements OnInit {

  public usuarios :Usuario[]
  public usuario: Usuario
  public qtdUsuario: number = 1
  public editUser: boolean = false
  public cargos: Cargos[]
  public inserirUser: boolean
  public deletarUser: boolean
  public atualizarQtd: boolean
  @Output() public atualizarQtdUser: EventEmitter<any> =  new EventEmitter<any>()

  public atualizarUser = new FormGroup({
    'nome': new FormControl(null),
    'email': new FormControl(null),
    'cargo': new FormControl(null, Validators.required)
  })
  public inserirUserForm = new FormGroup({
    'nome': new FormControl(null),
    'email': new FormControl(null),
    'cargo': new FormControl(null, Validators.required)
  })
  public deletarUserForm = new FormGroup({
    'nome': new FormControl(null),
    'email': new FormControl(null),
    'cargo': new FormControl(null, Validators.required)
  })

  constructor(
    private usuarioService: UsuariosService,
    private cargosService: CargosService,
    private route: Router,
    private realTime: RealTime
  ) { }

  ngOnInit() {

    this.usuarioService.getQtdId().subscribe(
      (qtd: number)=>{

        this.qtdUsuario = (qtd > 0) ? qtd : undefined

      }
    )

    this.usuarioService.getUsers().subscribe(
      (usuarios: Usuario[])=>{
        this.usuarios = usuarios
        this.qtdUsuario = usuarios.length
      }
    )
  }

  public getCargos(): void{
    this.cargosService.get().subscribe(
      (cargos: Cargos[])=>{
        this.cargos = cargos
      }
    )
  }

  public cancelarEdit(): void{
    this.visualizarEditarUser()
  }

  public visualizarEditarUser(): void{
    this.editUser = (this.editUser === true) ? false : true
  }

  public editarUsuario(usuario: Usuario): void{
    this.getCargos()
    this.visualizarEditarUser()
    this.atualizarUser.controls.nome.setValue(usuario.nome)
    this.atualizarUser.controls.email.setValue(usuario.email)
    this.usuario = usuario
    //this.route

  }

  public cancelarInserir(): void{
    this.inserirUser = false
    this.editUser = true
  }

  public validarUser(): void{
    this.usuario.fk_cargo_usuario = this.atualizarUser.controls.cargo.value
    let id: number = this.usuario.fk_cargo_usuario
    this.usuario.cargo = this.cargos[id - 1].cargo
    this.editUser = false
    this.inserirUserForm.controls.nome.setValue(this.usuario.nome)
    this.inserirUserForm.controls.email.setValue(this.usuario.email)
    this.inserirUserForm.controls.cargo.setValue(this.usuario.cargo)
    this.inserirUser = true

  }

  public deletarUsuario(): void{
    this.editUser = false
    this.deletarUser = true
    this.deletarUserForm.controls.nome.setValue(this.usuario.nome)
    this.deletarUserForm.controls.email.setValue(this.usuario.email)
  }

  public cancelarDeletar(): void{
    this.editUser = true
    this.deletarUser = false
  }

  public delete(): void{

    this.deletarUser = false
    let index = this.usuarios.indexOf(this.usuario)
    this.usuarios.splice(index,1)
    //this.usuarioService.delete(this.usuario.id).subscribe(
      //(user: any)=>{
        this.realTime.removeQtd()
        this.qtdUsuario = this.qtdUsuario - 1
      //}
    //)
    //let qtd = this.usuarios.length
    //console.log(this.route.navigate(['adm']))

  }
}
