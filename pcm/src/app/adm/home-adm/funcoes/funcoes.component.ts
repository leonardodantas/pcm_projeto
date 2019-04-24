import { Component, OnInit } from '@angular/core';
import { FuncoesService } from 'src/app/services/funcoes.service';
import { Funcao } from 'src/app/model/funcao';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from '@angular/http';

@Component({
  selector: 'app-funcoes',
  templateUrl: './funcoes.component.html',
  styleUrls: ['./funcoes.component.css'],
  providers: [FuncoesService]
})
export class FuncoesComponent implements OnInit {

  public funcoes: Funcao[]
  public insertSuccess: boolean
  public deleteSuccess: boolean
  public updateSuccess: boolean
  public inserir: boolean
  public editarFunc: boolean
  public funcao: Funcao

  public formFuncao = new FormGroup({
    'funcao': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  public formFuncaoEditar = new FormGroup({
    'funcao': new FormControl(null,Validators.minLength(6))
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
    let funcao: Funcao = new Funcao(
      null,
      this.formFuncao.controls.funcao.value
    )
    this.funcaoService.post(funcao).subscribe(
      (response: any)=>{
        this.formFuncao.reset()
        this.exibirFuncoes()
        this.insertSuccess = true
        this.inserir = false
        setTimeout(() => {
          this.insertSuccess = false
        }, 4000);
      }
    )
  }

  public deletar(id: number): void{
    this.funcaoService.delete(id).subscribe(
      (response: any)=>{
        this.exibirFuncoes()
        this.deleteSuccess = true
        setTimeout(() => {
          this.deleteSuccess = false
        }, 4000);
      }
    )
  }

  public validInserir(): void{
    this.inserir = true
  }

  public editar(funcao: Funcao): void{
    this.editarFunc = true
    this.funcao = funcao
    this.formFuncaoEditar.controls.funcao.setValue(funcao.funcao)
  }

  public editarFuncao(): void{
    this.funcao.funcao = this.formFuncaoEditar.controls.funcao.value;
    this.funcaoService.put(this.funcao).subscribe(
      (response: any)=>{
        this.updateSuccess = true
        this.editarFunc = false
        setTimeout(() => {
          this.updateSuccess = false
        }, 4000);
      }
    )
  }

}
