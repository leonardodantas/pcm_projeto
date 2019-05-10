import { Component, OnInit } from '@angular/core';
import { FichaEmprestimo } from 'src/app/model/ficha_emprestimo';
import { FichaEmprestimoService } from 'src/app/services/ficha-emprestimo.service';

@Component({
  selector: 'app-listar-todas',
  templateUrl: './listar-todas.component.html',
  styleUrls: ['./listar-todas.component.css'],
  providers: [FichaEmprestimoService]
})
export class ListarTodasComponent implements OnInit {

  public ficha_emprestimo: FichaEmprestimo[]
  public fichaIsValid: boolean

  constructor(
    private fichaEmprestimoService: FichaEmprestimoService
  ) { }

  ngOnInit() {
    let id = parseInt(localStorage.getItem('idUsuario'))
    this.fichaEmprestimoService.getAllUsuario(id).subscribe(
      (ficha_emprestimo: FichaEmprestimo[])=>{
        this.ficha_emprestimo = ficha_emprestimo
        this.fichaIsValid = ficha_emprestimo.length > 0 ? true : false
      }
    )
  }

}
