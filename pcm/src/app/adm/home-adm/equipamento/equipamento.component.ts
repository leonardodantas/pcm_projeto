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
  public equipamentos: Equipamento[]

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
      this.formEquipamento.controls.equipamento.value
    )
    this.equipamentoService.inserirEquipamento(equipamento).subscribe(
      (response: any)=>{
        this.equipamentos.push(equipamento)
      }
    )
  }

}
