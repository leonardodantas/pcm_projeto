import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/model/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuariosService]
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[]
  public classTabela: string = "col-md-12"
  public classEdit: string = "d-none"

  public formVisualizarUser = new FormGroup({
    'nome': new FormControl({value: null, disabled: true}, Validators.required),
    'email': new FormControl({value: null, disabled: true}, Validators.required),
    'cargo': new FormControl({value: null, disabled: true}, Validators.required),
    'funcao': new FormControl({value: null, disabled: true}, Validators.required)
  })

  constructor(
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    this.usuarioService.getAllUsers().subscribe(
      (usuario: Usuario[])=>{
        this.usuarios = usuario
      }
    )
  }

  public exibirDados(usuario: Usuario): void{
    this.classTabela = "d-none"
    this.classEdit = "col-md-12"
    this.formVisualizarUser.controls.nome.setValue(usuario.nome)
    this.formVisualizarUser.controls.email.setValue(usuario.email)
    this.formVisualizarUser.controls.cargo.setValue(usuario.cargo)
    this.formVisualizarUser.controls.funcao.setValue(usuario.funcao)
  }

  public exibirTabela(): void{
    this.classTabela = "col-md-12"
    this.classEdit = "d-none"
  }

}
