import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SafraService } from 'src/app/services/safra.service';
import { Safra } from 'src/app/model/safra';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/model/usuario';
import { TesteUsuario } from './teste_usuario.model';
import { PendenciaService } from 'src/app/services/pendecia.service';
import { PendenciaUsuario } from 'src/app/model/pendencia_usuario';
import { Pendencia } from 'src/app/model/pendencia';
import { Response } from '@angular/http';

@Component({
  selector: 'app-nova-pendencia',
  templateUrl: './nova-pendencia.component.html',
  styleUrls: ['./nova-pendencia.component.css'],
  providers: [SafraService, UsuariosService, PendenciaService]
})
export class NovaPendenciaComponent implements OnInit {

  public safra: Safra
  public cod_pendencia: string
  public criar: boolean
  public usuariosPend: Usuario[]
  public usuariosEnviar: Usuario[]
  public testeUsuario: TesteUsuario[]
  public testeEnviarPend: boolean
  public pendenciaUsuario: PendenciaUsuario[]
  public pendenciaCriada: boolean

  public pendencia =  new FormGroup({
    'codigo': new FormControl(null),
    'data_limite': new FormControl({value: null, disabled: false},[Validators.required]),
    'assunto': new FormControl({value: null, disabled: false}, [Validators.required, Validators.minLength(7)]),
    'descricao': new FormControl({value: null, disabled: false}, [Validators.required])
  })

  constructor(
    private safraService: SafraService,
    private usuarioService: UsuariosService,
    private pendenciaService: PendenciaService
  ) {
    this.usuariosEnviar = []
    this.testeEnviarPend = false
   }

  ngOnInit() {
    this.safraService.getSafra().subscribe(
      (safra: Safra)=>{
        this.safra = safra
        this.cod_pendencia = this.codigoPendencia()
        this.pendencia.controls.codigo.setValue(this.cod_pendencia)
      }
    )
  }

  public codigoPendencia(): string{
    if(this.safra.qtd_codigo < 10)
      return this.safra.codigo_safra + '-' + "00" + this.safra.qtd_codigo
    if( this.safra.qtd_codigo > 9 && this.safra.qtd_codigo < 100)
      return this.safra.codigo_safra + '-' + "0" + this.safra.qtd_codigo
    if(this.safra.qtd_codigo > 99)
      return this.safra.codigo_safra + '-' + this.safra.qtd_codigo
  }

  public criarPendencia(): void{
    this.criar = true
    this.pendencia.controls['data_limite'].disable()
    this.pendencia.controls['assunto'].disable()
    this.pendencia.controls['descricao'].disable()

    this.usuarioService.getUserForPend().subscribe(
      (usuario: Usuario[])=>{
        this.usuariosPend = usuario
        this.testeUsuario = []
        for(let i=0;i<usuario.length;i++){
          let testeUsuario = new TesteUsuario(
            i,
            true
          )
          this.testeUsuario.push(testeUsuario)

        }

      }
    )
  }

  public cancelar(): void{
    this.pendencia.reset()
    this.pendencia.controls.codigo.setValue(this.cod_pendencia)
  }

  public adicionar(usuario: Usuario): void{
    this.usuariosEnviar.push(usuario)
    let index = this.usuariosPend.indexOf(usuario)
    this.testeUsuario[index].teste = false
    this.testeEnviarPend = true
  }

  public remover(usuario: Usuario): void{
    let index = this.usuariosPend.indexOf(usuario)
    this.testeUsuario[index].teste = true
    this.usuariosEnviar.splice(index,1)
    this.testeEnviarPend = this.usuariosEnviar.length > 0 ? true : false
    console.log(this.usuariosEnviar)

  }

  public testeButton(usuario: Usuario): boolean{
    let index = this.usuariosPend.indexOf(usuario)
    return this.testeUsuario[index].teste
  }

  public enviarPendencia(): void{
    let pendencia = new Pendencia(
      null,
      parseInt(localStorage.getItem("idUsuario")),
      null,
      null,
      this.pendencia.controls.assunto.value,
      this.pendencia.controls.descricao.value,
      this.cod_pendencia,
      null,
      this.pendencia.controls.data_limite.value,
      null
    )
    this.pendenciaService.inserirPendencia(pendencia).subscribe(
      (response: number)=>{
        let id_pendencia = response
        this.pendenciaUsuario = []
        for(let i=0; i< this.usuariosEnviar.length; i++){
          let pendenciaUsuario = new PendenciaUsuario(
            null,
            this.usuariosEnviar[i].id,
            id_pendencia,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          )
          this.pendenciaUsuario.push(pendenciaUsuario)

        }

        for(let i=0;i< this.pendenciaUsuario.length;i++){
          this.pendenciaService.inserirNovoUsuarioPendencia(this.pendenciaUsuario[i]).subscribe(
            (response: Response)=>{
              console.log(response)
            }
          )
        }

      },
      (err: any)=> console.log(err),
      ()=>{
        this.safraService.aumentarCodigo().subscribe(
          (response: Response)=>{
            this.safra.qtd_codigo = this.safra.qtd_codigo + 1
            this.cod_pendencia = this.codigoPendencia()
            this.pendencia.controls.codigo.setValue(this.cod_pendencia)
          },
          (err: any)=> err,
          ()=>{
            this.pendenciaCriada = true
            this.cancelarPendencia()
            setTimeout(() => {
              this.pendenciaCriada = false
            }, 4000);
          }
        )
      }
    )

  }

  public cancelarPendencia(): void{
    this.usuariosEnviar = []
    this.criar = false
    this.pendencia.controls['data_limite'].enable()
    this.pendencia.controls['assunto'].enable()
    this.pendencia.controls['descricao'].enable()
    this.cancelar()
  }

}
