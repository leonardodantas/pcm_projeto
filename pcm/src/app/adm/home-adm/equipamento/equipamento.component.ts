import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { Equipamento } from 'src/app/model/equipamento';
import { ManutencaoEquipamento } from 'src/app/model/manutecao_equipamento';
import { ManutencaoEquipService } from 'src/app/services/manutencao-equip.service';
import { Response } from '@angular/http';
import { Condicao } from './condicoes.model';
import { FichaEmprestimoService } from 'src/app/services/ficha-emprestimo.service';
import { FichaEmprestimo } from 'src/app/model/ficha_emprestimo';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.css'],
  providers: [EquipamentoService, ManutencaoEquipService, FichaEmprestimoService]
})
export class EquipamentoComponent implements OnInit {

  public formEquipamento =  new FormGroup({
    'equipamento': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })
  public formEquipEditar =  new FormGroup({
    'equipamento': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  public formManutencao =  new FormGroup({
    'equipamento': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'descricao': new FormControl(null,[Validators.required, Validators.minLength(10)])
  })

  public inserir: boolean
  public condicao: Condicao[]
  public editarEquip: boolean
  public insertSuccess: boolean
  public equipamentos: Equipamento[]
  public equipamento: Equipamento
  public updateSuccess: boolean
  public manutencao: boolean
  public manuEquipSuccess: boolean

  public listar: boolean = false

  public finalizada: boolean = true
  public fichaEmprestimoFinalizada: FichaEmprestimo[]

  public fichaEmprestimo: FichaEmprestimo[]
  public alugado: boolean = true

  constructor(
    private equipamentoService: EquipamentoService,
    private manuEquipService: ManutencaoEquipService,
    private fichaEmprestimoService: FichaEmprestimoService
  ) { }

  ngOnInit() {
    this.equipamentoService.get().subscribe(
      (equipamentos: Equipamento[])=>{
        this.equipamentos = equipamentos
        this.condicaoEquipamento()
      }
    )

    this.fichaEmprestimoService.getAllAlugadas().subscribe(
      (ficha_emprestimo: FichaEmprestimo[])=>{
        this.fichaEmprestimo = ficha_emprestimo
      }
    )

    this.fichaEmprestimoService.getAllFinalizadas().subscribe(
      (ficha_emprestimo: FichaEmprestimo[])=>{
        this.fichaEmprestimoFinalizada = ficha_emprestimo

      }
    )

  }

  public condicaoEquipamento():void {

    this.condicao = []

    this.equipamentos.forEach(element => {
      let index = this.equipamentos.indexOf(element)

      if(element.status === "LIVRE"){
        let condicao = new Condicao(
          true,
          false,
          false
        )
        this.condicao.push(condicao)
      }
      else if(element.status === "MANUTENÇÃO"){
        let condicao = new Condicao(
          false,
          true,
          false
        )
        this.condicao.push(condicao)
      }
      else{
        let condicao = new Condicao(
          false,
          false,
          true
        )
        this.condicao.push(condicao)
      }
    });

  }

  public condicaoEquipamentoVal(equipamento: Equipamento): true{
    let index = this.equipamentos.indexOf(equipamento)
    if(this.condicao[index].livre === true)
      return true
  }

  public condicaoEquipamentoErr(equipamento: Equipamento, indice: number): true{
    let index = this.equipamentos.indexOf(equipamento)
    if(indice != undefined){
      this.condicao[indice].livre = false
      this.condicao[indice].manutencao = true
    }

    if(this.condicao[index].manutencao === true)
      return true
  }

  public condicaoEquipamentoOcu(equipamento: Equipamento): true{
    let index = this.equipamentos.indexOf(equipamento)
    if(this.condicao[index].ocupado === true)
      return true
  }

  public validInserir(): void{
    this.inserir = true
  }

  public inserirEquipamento(): void{
    let equipamento =  new Equipamento(
      null,
      this.formEquipamento.controls.equipamento.value.toUpperCase(),
      null
    )

    this.equipamentoService.inserirEquipamento(equipamento).subscribe(
      (response: any)=>{
        this.equipamentos.push(equipamento)
        this.insertSuccess = true
        this.inserir = false
        setTimeout(() => {
          this.insertSuccess = false
        }, 4000);
      }
    )
  }

  public editar(equipamento: Equipamento): void{
    this.editarEquip = true
    this.formEquipEditar.controls.equipamento.setValue(equipamento.nome)
    this.equipamento = equipamento
  }

  public updateEquip(): void{
    this.equipamento.nome = this.formEquipEditar.controls.equipamento.value.toUpperCase()
    this.equipamentoService.updateEquipamento(this.equipamento).subscribe(
      (response: any)=>{
        this.updateSuccess = true
        this.editarEquip = false
        setTimeout(() => {
          this.updateSuccess = false
        }, 4000);
      }
    )
  }

  public fecharForm(): void{
    this.inserir = false
    this.editarEquip = false
  }

  public enviarManutencao(equipamentos: Equipamento): void{
    this.manutencao = this.manutencao === true ? false:true
    this.formManutencao.controls.equipamento.setValue(equipamentos.nome)
    this.equipamento = equipamentos
  }

  public cancelarEnvio(): void{
    this.manutencao = false
    this.formManutencao.reset()
  }

  public enviarEquipamento(): void{
    let manutencao_equipamento =  new ManutencaoEquipamento(
      null,
      this.equipamento.id,
      Number(localStorage.getItem("idUsuario")),
      '',
      this.formManutencao.controls.descricao.value,
      '',
      '',
      '',
      '',
      ''
    )

    this.manuEquipService.post(manutencao_equipamento).subscribe(
      (response: Response)=>{
        this.cancelarEnvio()
        this.manuEquipSuccess = true
        setTimeout(() => {
          this.manuEquipSuccess = false
        }, 4000);
      },
      (err:any)=>{
        console.log(err)
      },
      ()=>{
        let index = this.equipamentos.indexOf(this.equipamento)
        this.condicaoEquipamentoErr(this.equipamento, index)
        this.equipamentos[index].status = "MANUTENÇÃO"
        this.equipamento.status = "MANUTENÇÃO"
        this.equipamentoService.updateEquipamentoStatus(this.equipamento).subscribe(
          (response: Response)=>{
            console.log(response)
          },
          (err:any)=>{
            console.log(err)
          },
          ()=>{
            console.log("Deu certo")
          }
        )
      }
    )
  }

  public listarTodos(): void{
    this.listar = false
    this.alugado = true
    this.finalizada = true
  }

  public listarAlugados(): void{
    this.listar = true
    this.alugado = false
    this.finalizada = true
  }

  public listarFinalizadas(): void{
    this.listar = true
    this.alugado = true
    this.finalizada = false
  }
}
