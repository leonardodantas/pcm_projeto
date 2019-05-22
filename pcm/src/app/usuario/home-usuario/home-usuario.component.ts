import { Component, OnInit } from '@angular/core';
import { FichaEmprestimoService } from 'src/app/services/ficha-emprestimo.service';
import { FichaEmprestimo } from 'src/app/model/ficha_emprestimo';
import { PendenciaService } from 'src/app/services/pendecia.service';
import { map } from 'rxjs/operators'
import { PendenciaUsuario } from 'src/app/model/pendencia_usuario';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css'],
  providers: [FichaEmprestimoService, PendenciaService]
})
export class HomeUsuarioComponent implements OnInit {

  public ficha_emprestimo: FichaEmprestimo[]
  public isFichaEmprestimo: boolean

  public pendenciaUsuario: PendenciaUsuario[]
  public isPendenciaUsuario: boolean

  constructor(
    private fichaEmprestimoService: FichaEmprestimoService,
    private pendenciaUsuarioService: PendenciaService
  ) { }

  ngOnInit() {
    let id = parseInt(localStorage.getItem("idUsuario"))
    this.fichaEmprestimoService.getLiberada(id).subscribe(
      (ficha_emprestimo: FichaEmprestimo[])=>{
        this.ficha_emprestimo = ficha_emprestimo
        this.isFichaEmprestimo = ficha_emprestimo.length > 0 ? true : false
      }
    )

    this.pendenciaUsuarioService.getPendenciasUsuario(id).subscribe(
      (pendencia_usuario: PendenciaUsuario[])=>{
        this.pendenciaUsuario = pendencia_usuario
        if(pendencia_usuario.length > 5)
          this.pendenciaUsuario.splice(0,5)
      }
    )
  }

}
