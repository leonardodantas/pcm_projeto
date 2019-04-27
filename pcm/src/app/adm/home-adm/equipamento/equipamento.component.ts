import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { Equipamento } from 'src/app/model/equipamento';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.css'],
  providers: [EquipamentoService]
})
export class EquipamentoComponent implements OnInit {

  public formEquipamento =  new FormGroup({
    'equipamento': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })
  public formEquipEditar =  new FormGroup({
    'equipamento': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  public inserir: boolean
  public editarEquip: boolean
  public insertSuccess: boolean
  public equipamentos: Equipamento[]
  public equipamento: Equipamento
  public updateSuccess: boolean

  constructor(
    private equipamentoService: EquipamentoService
  ) { }

  ngOnInit() {
    this.equipamentoService.get().subscribe(
      (equipamentos: Equipamento[])=>{
        this.equipamentos = equipamentos
      }
    )
  }

  public validInserir(): void{
    this.inserir = true
  }

  public inserirEquipamento(): void{
    let equipamento =  new Equipamento(
      null,
      this.formEquipamento.controls.equipamento.value.toUpperCase()
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

}
