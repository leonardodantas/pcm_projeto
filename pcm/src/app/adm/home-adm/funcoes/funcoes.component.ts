import { Component, OnInit } from '@angular/core';
import { FuncoesService } from 'src/app/services/funcoes.service';
import { Funcao } from 'src/app/model/funcao';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-funcoes',
  templateUrl: './funcoes.component.html',
  styleUrls: ['./funcoes.component.css'],
  providers: [FuncoesService]
})
export class FuncoesComponent implements OnInit {

  public funcoes: Funcao[]

  public formFuncao = new FormGroup({
    'funcao': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private funcaoService: FuncoesService
  ) { }

  ngOnInit() {
    this.exibirFuncoes()
  }

  public exibirFuncoes(): void{
    this.funcaoService.get().subscribe(
      (funcao: Funcao[])=>{
        this.funcoes = funcao
      }
    )
  }

  public inserirFuncao(): void{
    let funcao = this.formFuncao.controls.funcao.value
    this.funcaoService.post(funcao).subscribe(
      (response: any)=>{
        this.exibirFuncoes()
      }
    )
  }

}
