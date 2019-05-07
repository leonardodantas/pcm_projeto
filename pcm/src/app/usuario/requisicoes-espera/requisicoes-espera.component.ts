import { Component, OnInit } from '@angular/core';
import { FichaEmprestimoService } from 'src/app/services/ficha-emprestimo.service';
import { FichaEmprestimo } from 'src/app/model/ficha_emprestimo';

@Component({
  selector: 'app-requisicoes-espera',
  templateUrl: './requisicoes-espera.component.html',
  styleUrls: ['./requisicoes-espera.component.css'],
  providers: [FichaEmprestimoService]
})
export class RequisicoesEsperaComponent implements OnInit {

  public ficha_emprestimo: FichaEmprestimo[]
  public fichaIsValid: boolean

  constructor(
    private fichaEmprestimoService: FichaEmprestimoService
  ) { }

  ngOnInit() {
    let id = parseInt(localStorage.getItem('idUsuario'))
    this.fichaEmprestimoService.getEspera(id).subscribe(
      (ficha_emprestimo: FichaEmprestimo[])=>{
        this.ficha_emprestimo = ficha_emprestimo
        this.fichaIsValid = ficha_emprestimo.length > 0 ? true : false
      }
    )
  }

}
