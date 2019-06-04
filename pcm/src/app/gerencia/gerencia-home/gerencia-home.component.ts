import { Component, OnInit } from '@angular/core';
import { GerenciaService } from 'src/app/services/gerencia.service';
import { Equipamento } from 'src/app/model/equipamento';
import { Pendencia } from 'src/app/model/pendencia';

@Component({
  selector: 'app-gerencia-home',
  templateUrl: './gerencia-home.component.html',
  styleUrls: ['./gerencia-home.component.css'],
  providers: [GerenciaService]
})
export class GerenciaHomeComponent implements OnInit {

  public equipamentoLivre: number
  public equipamentoAlugado: number
  public equipamentoManutencao: number
  public equipamentoTotal: number

  public pendenciaAndamento: number
  public pendenciaCancelada: number
  public pendenciaAtrasada: number
  public pendenciaFinalizada: number
  public pendenciaTotal: number

  constructor(
    private gerenciaService: GerenciaService
  ) {
    this.equipamentoAlugado = 0
    this.equipamentoLivre = 0
    this.equipamentoManutencao = 0
    this.equipamentoTotal = 0
    this.pendenciaAndamento = 0
    this.pendenciaAtrasada = 0
    this.pendenciaCancelada = 0
    this.pendenciaFinalizada = 0
    this.pendenciaTotal = 0
  }

  ngOnInit() {
    this.gerenciaService.getEquipamentosGerencia().subscribe(
      (equipamento: Equipamento[])=>{
        this.equipamentoTotal = equipamento.length
        equipamento.forEach((element)=>{
          if(element.status === 'LIVRE')
            this.equipamentoLivre = this.equipamentoLivre + 1
          else if (element.status === 'ALUGADO')
            this.equipamentoAlugado = this.equipamentoAlugado + 1
          else this.equipamentoManutencao = this.equipamentoManutencao + 1
        })
      }
    )

    this.gerenciaService.getPendenciasGerencia().subscribe(
      (pendencia: Pendencia[])=>{
        this.pendenciaTotal = pendencia.length
        pendencia.forEach((element)=>{
          if(element.id_status_pendencia === 1){
            this.pendenciaAndamento = this.pendenciaAndamento + 1

            let data_atual = new Date().toDateString()
            if(element.data_limite < data_atual){
              this.pendenciaAtrasada = this.pendenciaAtrasada + 1
            }

            //if(element.data_limite < )
          }
          else if(element.id_status_pendencia === 2)
            this.pendenciaFinalizada = this.pendenciaFinalizada + 1
          else this.pendenciaCancelada = this.pendenciaCancelada + 1
        })
      }
    )
  }

}
