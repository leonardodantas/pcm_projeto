import { Component, OnInit } from '@angular/core';
import { FichaEmprestimoService } from 'src/app/services/ficha-emprestimo.service';
import { FichaEmprestimo } from 'src/app/model/ficha_emprestimo';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css'],
  providers: [FichaEmprestimoService]
})
export class HomeUsuarioComponent implements OnInit {

  public ficha_emprestimo: FichaEmprestimo[]
  public isFichaEmprestimo: boolean

  constructor(
    private fichaEmprestimoService: FichaEmprestimoService
  ) { }

  ngOnInit() {
    let id = parseInt(localStorage.getItem("idUsuario"))
    this.fichaEmprestimoService.getLiberada(id).subscribe(
      (ficha_emprestimo: FichaEmprestimo[])=>{
        this.ficha_emprestimo = ficha_emprestimo
        this.isFichaEmprestimo = ficha_emprestimo.length > 0 ? true : false
      }
    )
  }

}
