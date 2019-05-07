import { Component, OnInit } from '@angular/core';
import { FichaEmprestimoService } from 'src/app/services/ficha-emprestimo.service';
import { FichaEmprestimo } from 'src/app/model/ficha_emprestimo';

@Component({
  selector: 'app-novas-requisicoes',
  templateUrl: './novas-requisicoes.component.html',
  styleUrls: ['./novas-requisicoes.component.css'],
  providers: [FichaEmprestimoService]
})
export class NovasRequisicoesComponent implements OnInit {

  public ficha_emprestimo: FichaEmprestimo[]

  constructor(
    private fichaEmprestimoService: FichaEmprestimoService
  ) { }

  ngOnInit() {

    this.fichaEmprestimoService.getEsperaAll().subscribe(
      (ficha_emprestimo: FichaEmprestimo[])=>{
        this.ficha_emprestimo = ficha_emprestimo
      }
    )
  }

  public selecionarFicha(ficha_emprestimo: FichaEmprestimo){
    console.log(ficha_emprestimo)
  }

}
