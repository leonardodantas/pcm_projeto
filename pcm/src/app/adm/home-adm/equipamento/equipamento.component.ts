import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.css']
})
export class EquipamentoComponent implements OnInit {

  public formEquipamento =  new FormGroup({
    'equipamento': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })
  public formEquipEditar =  new FormGroup({
    'equipamento': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  public inserir: boolean

  constructor() { }

  ngOnInit() {
  }

  public validInserir(): void{
    this.inserir = true
  }

}
