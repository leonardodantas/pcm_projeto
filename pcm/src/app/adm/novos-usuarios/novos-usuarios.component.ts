import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/model/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cargos } from 'src/app/model/cargos';
import { CargosService } from 'src/app/services/cargos.service';
import { Router } from '@angular/router';
import { RealTime } from 'src/app/services/realdate.service';
import { FuncoesService } from 'src/app/services/funcoes.service';
import { Funcao } from 'src/app/model/funcao';

@Component({
  selector: 'app-novos-usuarios',
  templateUrl: './novos-usuarios.component.html',
  styleUrls: ['./novos-usuarios.component.css'],
  providers: [UsuariosService, CargosService, FuncoesService]
})
export class NovosUsuariosComponent implements OnInit {

  public usuarios :Usuario[]
  public usuario: Usuario
  public qtdUsuario: number = 0
  public editUser: boolean = false
  public cargos: Cargos[]
  public funcoes: Funcao[]
  public inserirUser: boolean
  public deletarUser: boolean
  public atualizarQtd: boolean
  public deleteSuccess: boolean
  public validaSuccess: boolean

  public atualizarUser = new FormGroup({
    'nome': new FormControl(null),
    'email': new FormControl(null),
    'cargo': new FormControl(null, Validators.required),
    'funcao': new FormControl(null, Validators.required)
  })
  public inserirUserForm = new FormGroup({
    'nome': new FormControl(null),
    'email': new FormControl(null),
    'cargo': new FormControl(null, Validators.required),
    'funcao': new FormControl(null, Validators.required)
  })
  public deletarUserForm = new FormGroup({
    'nome': new FormControl(null),
    'email': new FormControl(null),
    'cargo': new FormControl(null, Validators.required),

  })



  constructor(
    private usuarioService: UsuariosService,
    private cargosService: CargosService,
    private funcoesService: FuncoesService,
    private realTime: RealTime
  ) { }

  ngOnInit() {

    this.funcoesService.get().subscribe(
      (funcoes: Funcao[])=>{
        this.funcoes = funcoes
        console.log(this.funcoes)
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
    this.resetForms()
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
  }

  public cancelarInserir(): void{
    this.inserirUser = false
    this.editUser = true
    this.resetForms()
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

  public validarFunc(): void{
    this.inserirUser = false
    let index = this.usuarios.indexOf(this.usuario)
    this.usuarios.splice(index,1)
    this.usuarioService.validarUser(this.usuario).subscribe(
      (response: any)=>{
        this.validaSuccess = true
        setTimeout(()=>{
          this.validaSuccess = undefined
        },3000)
        this.realTime.removeQtd()
        this.qtdUsuario = this.qtdUsuario - 1
      },
      (err: any)=>{
        console.log(err)
      }
    )
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
    this.resetForms()
  }

  public delete(): void{

    this.deletarUser = false
    let index = this.usuarios.indexOf(this.usuario)
    this.usuarios.splice(index,1)
    this.usuarioService.delete(this.usuario.id).subscribe(
      (user: any)=>{
        this.deleteSuccess = true
        setTimeout(() => {
          this.deleteSuccess = undefined
        }, 3000);
        this.realTime.removeQtd()
        this.qtdUsuario = this.qtdUsuario - 1
      }
    )

  }

  public resetForms(): void{
    this.inserirUserForm.reset()
    this.atualizarUser.reset()
    this.deletarUserForm.reset()
  }
}
