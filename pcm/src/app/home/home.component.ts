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

  }

  public cadastrarLogar(): void{
    this.logar === true ? this.logar = false : this.logar = true
  }

  public entrar(): void{
    let usuario: Usuario = new Usuario(
      null,
      null,
      '',
      '',
      this.formulario_logar.value.email,
      this.formulario_logar.value.senha
    )
    this.autenticacaoService.autenticar(usuario).subscribe(
      (usuario: Usuario)=>{
        localStorage.setItem("idUsuario", usuario[0].id)
        this.router.navigate(['/adm'])
      },
      (err: any)=>{
        this.erroLogar = true
        this.formulario_logar.controls.senha.reset()
      }
    )
  }

  public confirmPassword(): boolean{
    return  !(this.formulario_cadastro.controls.senha.value === this.formulario_cadastro.controls.conf_senha.value) && (this.formulario_cadastro.controls.senha.value !== undefined)
  }

}
