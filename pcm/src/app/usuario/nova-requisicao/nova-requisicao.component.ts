import { Component, OnInit } from '@angular/core';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { Equipamento } from 'src/app/model/equipamento';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FichaEmprestimo } from 'src/app/model/ficha_emprestimo';
import { FichaEmprestimoService } from 'src/app/services/ficha-emprestimo.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-nova-requisicao',
  templateUrl: './nova-requisicao.component.html',
  styleUrls: ['./nova-requisicao.component.css'],
  providers: [EquipamentoService, FichaEmprestimoService]
})
export class NovaRequisicaoComponent implements OnInit {

  public equipamentos : Equipamento[]
  public equipamento: Equipamento

  public equipamentoSelecionado: boolean
  public requisicaoEnviada: boolean

  public form_requisicao =  new FormGroup({
    'id': new FormControl(null),
    'equipamento': new FormControl(null),
    'descricao_requisicao': new FormControl(null, [Validators.required, Validators.minLength(5)])
  })

  constructor(
    private equipamentoService: EquipamentoService,
    private fichaEmprestimoService: FichaEmprestimoService
  ) { }

  ngOnInit() {
    this.equipamentoService.getLivre().subscribe(
      (equipamento: Equipamento[])=>{
        this.equipamentos = equipamento
      }
    )
  }

  public selecionar(equipamento: Equipamento): void{
    this.equipamentoSelecionado = true

    this.form_requisicao.controls.id.setValue(equipamento.id)
    this.form_requisicao.controls.equipamento.setValue(equipamento.nome)

    this.equipamento = equipamento
  }

  public cancelar(): void{
    this.form_requisicao.reset()
    this.equipamentoSelecionado = false
  }

  public requisitarEquipamento(): void{

    let id_usuario: number = parseInt(localStorage.getItem('idUsuario'))
    let id_equipamento: number = this.equipamento.id

    let ficha_emprestimo =  new FichaEmprestimo(
      null,
      id_usuario,
      id_equipamento,
      '',
      '',
      '',
      this.form_requisicao.controls.descricao_requisicao.value,
      '',
      ''
    )

    this.fichaEmprestimoService.post(ficha_emprestimo).subscribe(
      (response: Response)=>{
        this.form_requisicao.reset()

        let index = this.equipamentos.indexOf(this.equipamento)
        this.equipamentos.splice(index,1)
        this.requisicaoEnviada = true

        setTimeout(() => {
          this.requisicaoEnviada = false
          this.equipamentoSelecionado = false
        }, 3000);
      },
      (err:any)=>{
        console.log(err)
      },
      ()=>{
        let equipamento = new Equipamento(
          this.equipamento.id,
          '',
          'ALUGADO'
        )
        this.equipamentoService.updateEquipamentoStatus(equipamento).subscribe(
          (response: Response)=>{
            console.log(response)
          }
        )
      }
    )



  }
}
