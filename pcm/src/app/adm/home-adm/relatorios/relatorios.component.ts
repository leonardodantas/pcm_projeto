import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf'
import 'jspdf-autotable'
import { PendenciaService } from 'src/app/services/pendecia.service';
import { Pendencia } from 'src/app/model/pendencia';
import { ManutencaoEquipService } from 'src/app/services/manutencao-equip.service';
import { ManutencaoEquipamento } from 'src/app/model/manutecao_equipamento';
import { FichaEmprestimoService } from 'src/app/services/ficha-emprestimo.service';
import { FichaEmprestimo } from 'src/app/model/ficha_emprestimo';
import { PendenciaUsuario } from 'src/app/model/pendencia_usuario';
import { DatePipe } from '@angular/common';
import { Column } from 'jspdf-autotable';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],
  providers: [PendenciaService, ManutencaoEquipService, FichaEmprestimoService]
})
export class RelatoriosComponent implements OnInit {

  public pendencias: Pendencia[]
  public manutencao: ManutencaoEquipamento[]
  public fichaEmprestimo: FichaEmprestimo[]

  public pendencia: Pendencia
  public pendenciaUsuarios: PendenciaUsuario[]

  constructor(
    private PendenciaService: PendenciaService,
    private manutencaoEquipamentoService: ManutencaoEquipService,
    private fichaEmprestimoService: FichaEmprestimoService
  ) { }

  ngOnInit() {
    this.PendenciaService.getConcluidasAll().subscribe(
      (pendencia: Pendencia[])=>{
        this.pendencias = pendencia
      }
    )
    this.manutencaoEquipamentoService.finally().subscribe(
      (manutencao: ManutencaoEquipamento[])=>{
        this.manutencao = manutencao
      }
    )
    this.fichaEmprestimoService.getAllFinalizadas().subscribe(
      (ficha: FichaEmprestimo[])=>{
        this.fichaEmprestimo = ficha
      }
    )

  }

  public relatorioPendencia(pendencia: Pendencia): void{
    this.pendencia = pendencia
    this.PendenciaService.getInfosPendencias(pendencia.id).subscribe(
      (pendencia_usuario: PendenciaUsuario[])=>{

        this.pendenciaUsuarios = pendencia_usuario

      },
      (err: any)=>{
        console.log(err)
      },
      ()=>{

        let documento = new jsPDF()

        documento.setFontStyle("bold")
        documento.setFontSize(22)
        documento.text(`RELATORIO PENDENCIA ${pendencia.cod}`, 40,20);

        documento.setLineWidth(1);
        documento.line(10, 25, 200, 25);

        documento.setFontStyle("bold")
        documento.setFontSize(16)
        documento.text('COD: ', 10, 35)
        documento.setFontStyle("normal")
        documento.setFontSize(16)
        documento.text(pendencia.cod, 28, 35)

        documento.setFontStyle("bold")
        documento.setFontSize(16)
        documento.text('DATA CRIAÇÃO: ', 10, 45)
        documento.setFontStyle("normal")
        documento.setFontSize(16)
        const datePipe = new DatePipe('en-US')
        let data_criacao = datePipe.transform(pendencia.data_criacao, 'dd/MM/yyyy')
        documento.text(data_criacao, 60, 45)

        documento.setFontStyle("bold")
        documento.setFontSize(16)
        documento.text('DATA FINALIZACAO: ', 100, 45)
        documento.setFontStyle("normal")
        documento.setFontSize(16)
        let data_finalizacao = datePipe.transform(pendencia.data_finalizacao, 'dd/MM/yyyy')
        documento.text(data_finalizacao, 160, 45)

        documento.setLineWidth(1);
        documento.line(10, 50, 200, 50);

        documento.setFontStyle("bold")
        documento.setFontSize(16)
        documento.text('ASSUNTO: ', 10, 60)
        documento.setFontStyle("normal")
        documento.setFontSize(16)
        documento.text(pendencia.assunto, 45, 60)

        documento.setFontStyle("bold")
        documento.setFontSize(16)
        documento.text('DESCRIÇÃO: ', 10, 70)
        documento.setFontStyle("normal")
        documento.setFontSize(16)
        documento.text(pendencia.descricao, 50, 70)

        documento.setLineWidth(1);
        documento.line(10, 80, 200, 80);

        documento.setFontStyle("bold")
        documento.setFontSize(22)
        documento.text(`DETALHES PENDENCIA`, 55,90);

        let x: number = 100;
        let cont: number = 0;
        let contTotalPagina: number = 5

        for(let i=0; i < this.pendenciaUsuarios.length ; i++ ){

          documento.setFontStyle("bold")
          documento.setFontSize(12)
          documento.text(`NOME: `, 10,x + 5);
          documento.text(`DESCRIÇÃO: `, 10,x + 10);
          documento.text(`DATA REALIZADO: `, 10,x + 15);
          documento.text(`PORCENTAGEM INDIVIDUAL: `, 10,x + 20);


          documento.setFontStyle("normal")
          documento.setFontSize(12)

          let data_realizado = datePipe.transform(this.pendenciaUsuarios[i].data_realizada, 'dd/MM/yyyy')
          let porcTotal: number = parseFloat(this.pendenciaUsuarios[i].porc_atual) * 2
          let porcTotalString = (porcTotal).toString()
          documento.text(this.pendenciaUsuarios[i].nome, 25,x + 5);
          documento.text(this.pendenciaUsuarios[i].descricao, 40,x + 10);
          documento.text(data_realizado, 50,x + 15);
          documento.text(this.pendenciaUsuarios[i].porc_atual, 73,x + 20);


          x += 30
          cont ++

          if(cont > contTotalPagina){
            documento.addPage()

            documento.setFontStyle("bold")
            documento.setFontSize(22)
            documento.text(`DETALHES PENDENCIA: ${pendencia.cod}`, 40,20);

            documento.setFontStyle("normal")
            documento.setFontSize(12)

            cont = 0
            x = 30
            contTotalPagina = 10
          }

        }


        documento.output("dataurlnewwindow");

      }
    )

  }

  public relatorioManutencao(manutecao_equipamento: ManutencaoEquipamento): void{

        let documento = new jsPDF()

        documento.setFontStyle("bold")
        documento.setFontSize(22)
        documento.text(`MANUTENÇÃO DE EQUIPAMENTOS - ${manutecao_equipamento.id}`, 30,20);

        documento.setLineWidth(1);
        documento.line(10, 25, 200, 25);

        documento.setFontStyle("bold")
        documento.setFontSize(16)
        documento.text('ID: ', 10, 35)
        documento.setFontStyle("normal")
        documento.setFontSize(16)
        documento.text(manutecao_equipamento.id.toString(), 20, 35)

        documento.setFontStyle("bold")
        documento.setFontSize(16)
        documento.text('DATA ENVIO: ', 10, 45)
        documento.setFontStyle("normal")
        documento.setFontSize(16)
        const datePipe = new DatePipe('en-US')
        let data_criacao = datePipe.transform(manutecao_equipamento.data_envio, 'dd/MM/yyyy')
        documento.text(data_criacao, 50, 45)

        documento.setFontStyle("bold")
        documento.setFontSize(16)
        documento.text('DATA FINALIZACAO: ', 100, 45)
        documento.setFontStyle("normal")
        documento.setFontSize(16)
        let data_finalizacao = datePipe.transform(manutecao_equipamento.data_realizado, 'dd/MM/yyyy')
        documento.text(data_finalizacao, 160, 45)

        documento.setLineWidth(1);
        documento.line(10, 50, 200, 50);

        documento.setFontStyle("bold")
        documento.setFontSize(16)
        documento.text('ASSUNTO: ', 10, 60)
        documento.setFontStyle("normal")
        documento.setFontSize(16)
        documento.text(manutecao_equipamento.descricao_envio_user, 10, 68)

        documento.setLineWidth(1);
        documento.line(10, 80, 200, 80);

        documento.setFontStyle("bold")
        documento.setFontSize(16)
        documento.text('ULTIMA ATUALIZAÇÃO: ', 10, 90)
        documento.setFontStyle("normal")
        documento.setFontSize(16)
        documento.text(manutecao_equipamento.descricao_atual_manu, 10, 98)

        documento.setLineWidth(1);
        documento.line(10, 110, 200, 110);

        documento.setFontStyle("bold")
        documento.setFontSize(16)
        documento.text('DESCRIÇÃO FINAL: ', 10, 120)
        documento.setFontStyle("normal")
        documento.setFontSize(16)
        documento.text(manutecao_equipamento.descricao_final_manu, 10, 128)

        documento.output("dataurlnewwindow");
  }

  public relatioFichaEmprestimo(ficha_emprestimo: FichaEmprestimo): void{
    console.log(ficha_emprestimo)

    let documento = new jsPDF()

    documento.setFontStyle("bold")
    documento.setFontSize(22)
    documento.text(`REQUISIÇÃO DE EMPRESTIMO - ${ficha_emprestimo.id}`, 40,20);

    documento.setLineWidth(1);
    documento.line(10, 25, 200, 25);

    documento.setFontStyle("bold")
    documento.setFontSize(16)
    documento.text('ID: ', 10, 35)
    documento.setFontStyle("normal")
    documento.setFontSize(16)
    documento.text(ficha_emprestimo.id.toString(), 20, 35)

    documento.setFontStyle("bold")
    documento.setFontSize(16)
    documento.text('DATA REQUISIÇÃO: ', 10, 45)
    documento.setFontStyle("normal")
    documento.setFontSize(16)
    const datePipe = new DatePipe('en-US')
    let data_criacao = datePipe.transform(ficha_emprestimo.data_requisicao, 'dd/MM/yyyy')
    documento.text(data_criacao, 68, 45)

    documento.setFontStyle("bold")
    documento.setFontSize(16)
    documento.text('DATA LIBERAÇÃO: ', 10, 53)
    documento.setFontStyle("normal")
    documento.setFontSize(16)
    let data_liberacao = datePipe.transform(ficha_emprestimo.data_emprestimo, 'dd/MM/yyyy')
    documento.text(data_liberacao, 68, 53)

    documento.setFontStyle("bold")
    documento.setFontSize(16)
    documento.text('DATA DEVOLUÇÃO: ', 110, 45)
    documento.setFontStyle("normal")
    documento.setFontSize(16)
    let data_finalizacao = datePipe.transform(ficha_emprestimo.data_devolucao, 'dd/MM/yyyy')
    documento.text(data_finalizacao, 170, 45)

    documento.setLineWidth(1);
    documento.line(10, 60, 200, 60);

    documento.setFontStyle("bold")
    documento.setFontSize(16)
    documento.text('EQUIPAMENTO: ', 10, 70)
    documento.setFontStyle("normal")
    documento.setFontSize(16)
    documento.text(ficha_emprestimo.nome, 60, 70)

    documento.setFontStyle("bold")
    documento.setFontSize(16)
    documento.text('MOTIVO DO EMPRESTIMO: ', 10, 80)
    documento.setFontStyle("normal")
    documento.setFontSize(16)
    documento.text(ficha_emprestimo.motivo_emprestimo, 10, 88)

    documento.output("dataurlnewwindow");
  }

}
