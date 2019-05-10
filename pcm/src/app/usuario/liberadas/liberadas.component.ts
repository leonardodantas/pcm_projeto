import { Component, OnInit } from '@angular/core';
import { FichaEmprestimoService } from 'src/app/services/ficha-emprestimo.service';
import { FichaEmprestimo } from 'src/app/model/ficha_emprestimo';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Response } from '@angular/http';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { Equipamento } from 'src/app/model/equipamento';

@Component({
  selector: 'app-liberadas',
  templateUrl: './liberadas.component.html',
  styleUrls: ['./liberadas.component.css'],
  providers: [FichaEmprestimoService, EquipamentoService]
})
export class LiberadasComponent implements OnInit {

  public ficha_emprestimo: FichaEmprestimo[]
  public ficha: FichaEmprestimo
  public fichaIsValid: boolean

  public mostrarForm: boolean = false
  public liberado: boolean

  public formulario = new FormGroup({
    'id': new FormControl(null),
    'equipamento': new FormControl(null),
    'data_envio': new FormControl(null),
    'data_liberacao': new FormControl(null)
  })

  constructor(
    private fichaEmprestimoService: FichaEmprestimoService,
    private equipamentoService: EquipamentoService
  ) { }

  ngOnInit() {
    let id = parseInt(localStorage.getItem('idUsuario'))
    this.fichaEmprestimoService.getLiberada(id).subscribe(
      (ficha_emprestimo: FichaEmprestimo[])=>{
        this.ficha_emprestimo = ficha_emprestimo
        this.fichaIsValid = ficha_emprestimo.length > 0 ? true : false
      }
    )
  }

  public selecionar(ficha_equipamento: FichaEmprestimo){
    this.ficha = ficha_equipamento
    this.mostrarForm = true

    const datePipe =  new DatePipe('en-US')
    let data_requisicao =  datePipe.transform(this.ficha.data_requisicao, 'dd/MM/yyyy')
    let data_liberacao = datePipe.transform(this.ficha.data_emprestimo, 'dd/MM/yyyy')

    this.formulario.controls.id.setValue(this.ficha.id)
    this.formulario.controls.data_envio.setValue(data_requisicao)
    this.formulario.controls.data_liberacao.setValue(data_liberacao)
    this.formulario.controls.equipamento.setValue(this.ficha.nome)

  }

  public aceitar(): void{

    this.fichaEmprestimoService.devolucao(this.ficha).subscribe(
      (response: Response)=>{
        let index = this.ficha_emprestimo.indexOf(this.ficha)
        this.ficha_emprestimo.splice(index, 1)
      },
      (err: any)=>{
        console.log(err)
      },
      ()=>{
        this.liberado = true
        setTimeout(() => {
          this.liberado = false
          this.mostrarForm = false
        }, 3000);

        let equipamento = new Equipamento(
          this.ficha.id_emprestimo,
          '',
          'LIVRE'
        )
        this.equipamentoService.updateEquipamentoStatus(equipamento).subscribe(
          (response: Response)=>{
            console.log(response)
          }
        )
      }
    )


  }

  public cancelar(): void{
    this.mostrarForm = false
    this.formulario.reset()
  }


}
