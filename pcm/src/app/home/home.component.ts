import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autenticacao } from '../services/autenticacao.service'
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [Autenticacao]
})
export class HomeComponent implements OnInit {

  public logar: boolean = true
  public erroLogar: boolean
  public cadastroBd: boolean
  public formulario_logar = new FormGroup({
    'email': new FormControl(null, [Validators.required,Validators.minLength(10), Validators.email]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })
  public formulario_cadastro = new FormGroup({
    'email': new FormControl(null,[Validators.required, Validators.minLength(10), Validators.email]),
    'nome': new FormControl(null, [Validators.required, Validators.minLength(10)]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'conf_senha': new FormControl(null,[Validators.required, Validators.minLength(6)])
  })


  constructor(
    private autenticacaoService : Autenticacao,
    private router: Router
  ) { }

  ngOnInit() {


  }

  public cadastrarUsuario(): void{
    let usuario: Usuario =  new Usuario(
      null,
      3,
      null,
      null,
      '',
      this.formulario_cadastro.value.nome,
      this.formulario_cadastro.value.email,
      this.formulario_cadastro.value.senha
    )

    this.autenticacaoService.inserirUsuario(usuario).subscribe(
      (usuario: Usuario)=>{
        this.cadastroBd = true
      },
      (erro: any)=>{{
        this.cadastroBd = false
      }},
      ()=>{
        this.formulario_cadastro.reset()
        setTimeout(()=>{
          this.cadastrarLogar()
        },5000)
      }
    )

  }

  public cadastrarLogar(): void{
    this.logar === true ? this.logar = false : this.logar = true
  }

  public entrar(): void{
    let usuario: Usuario = new Usuario(
      null,
      null,
      '',
      null,
      '',
      '',
      this.formulario_logar.value.email,
      this.formulario_logar.value.senha
    )
    this.autenticacaoService.autenticar(usuario).subscribe(
      (usuario: Usuario)=>{
        localStorage.setItem("idUsuario", usuario[0].id)
        localStorage.setItem("idCargo", usuario[0].fk_cargo_usuario)
        this.router.navigate(['/adm'])
      },
      (err: any)=>{
        this.erroLogar = true
        this.formulario_logar.controls.senha.reset()
      },
      ()=>{
        this.verificarAreaAcesso(usuario.id)
      }
    )
  }

  public verificarAreaAcesso(id): void{
    if(id === 4){
      this.router.navigate(['/adm'])
    }
  }

  public confirmPassword(): boolean{
    return  !(this.formulario_cadastro.controls.senha.value === this.formulario_cadastro.controls.conf_senha.value) && (this.formulario_cadastro.controls.senha.value !== undefined)
  }

}
