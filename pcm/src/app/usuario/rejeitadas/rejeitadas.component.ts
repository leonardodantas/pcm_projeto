import { Component, OnInit } from '@angular/core';
import { FichaEmprestimoService } from 'src/app/services/ficha-emprestimo.service';
import { FichaEmprestimo } from 'src/app/model/ficha_emprestimo';

@Component({
  selector: 'app-rejeitadas',
  templateUrl: './rejeitadas.component.html',
  styleUrls: ['./rejeitadas.component.css'],
  providers: [FichaEmprestimoService]
})
export class RejeitadasComponent implements OnInit {

  public ficha_emprestimo: FichaEmprestimo[]
  public fichaIsValid: boolean

  constructor(
    private fichaEmprestimoService: FichaEmprestimoService
  ) { }

  ngOnInit() {
    let id = parseInt(localStorage.getItem('idUsuario'))
    this.fichaEmprestimoService.getRejeitada(id).subscribe(
      (ficha_emprestimo: FichaEmprestimo[])=>{
        this.ficha_emprestimo = ficha_emprestimo
        this.fichaIsValid = ficha_emprestimo.length > 0 ? true : false
      }
    )
  }


}
