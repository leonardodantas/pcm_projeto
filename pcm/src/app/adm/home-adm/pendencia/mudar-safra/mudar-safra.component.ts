import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Safra } from 'src/app/model/safra';
import { SafraService } from 'src/app/services/safra.service';

@Component({
  selector: 'app-mudar-safra',
  templateUrl: './mudar-safra.component.html',
  styleUrls: ['./mudar-safra.component.css'],
  providers: [SafraService]
})
export class MudarSafraComponent implements OnInit {

  public safra: Safra
  public validarModificar: boolean = true

  public mudar_safra = new FormGroup({
    'safra': new FormControl({value: null, disabled: true})
  })

  constructor(
    private safraService: SafraService
  ) {}

  ngOnInit() {
    this.safraService.getSafra().subscribe(
      (safra: Safra)=>{
        this.mudar_safra.controls.safra.setValue(safra.codigo_safra)
      }
    )
  }

  public modificar(): void{
    let safra = new Safra(
      null,
      this.mudar_safra.controls.safra.value,
      null
    )
    this.safraService.atualizarSafra(safra).subscribe(
      (response: any)=>{
        this.mudar_safra.controls['safra'].disable()
      },
      (err: any)=>{
        console.log(err)
      }
    )
  }

  public alterar(): void{
    this.mudar_safra.controls['safra'].enable()
    this.validarModificar = false
  }

  public cancelar(): void{
    this.mudar_safra.controls['safra'].disable()
    this.validarModificar = true
  }

}
