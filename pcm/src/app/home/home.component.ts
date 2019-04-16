import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public logar: boolean = true
  public formulario_logar = new FormGroup({
    'email': new FormControl(null, [Validators.required,Validators.minLength(10), Validators.email]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })
  public formulario_cadastro = new FormGroup({
    'email': new FormControl(null,[Validators.required, Validators.minLength(10), Validators.email]),
    'nome': new FormControl(null, [Validators.required, Validators.minLength(10)]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'conf_senha': new FormControl(null)
  })


  constructor() { }

  ngOnInit() {


  }

  public cadastrarUsuario(): void{

  }

  public cadastrarLogar(): void{
    this.logar === true ? this.logar = false : this.logar = true
  }

  public entrar(): void{

  }

}
