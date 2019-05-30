import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/model/usuario';
import { RealTime } from 'src/app/services/realdate.service';
import { FichaEmprestimoService } from 'src/app/services/ficha-emprestimo.service';
import { FichaEmprestimo } from 'src/app/model/ficha_emprestimo';
import { PendenciaService } from 'src/app/services/pendecia.service';

@Component({
  selector: 'app-menu-adm',
  templateUrl: './menu-adm.component.html',
  styleUrls: ['./menu-adm.component.css'],
  providers: [UsuariosService, FichaEmprestimoService, PendenciaService]
})
export class MenuAdmComponent implements OnInit{

  public qtdUsuarios: number
  public atualizarQtd: boolean

  public qtdRequisicaoPendente: number

  public qtdPendAguarFinal: number

  constructor(
    private route: Router,
    private usuarioService: UsuariosService,
    private fichaEmprestimoService: FichaEmprestimoService,
    private pendenciaService: PendenciaService,
    public realTime: RealTime,
  ) { }


  ngOnInit() {

    this.usuarioService.getUsers().subscribe(
      (usuario: Usuario[])=>{
        this.qtdUsuarios = usuario.length
      },
      (err: any)=>{
        console.log(err)
      },
      ()=>{
        this.realTime.popularQtdUser(this.qtdUsuarios)
      }
    )

    this.fichaEmprestimoService.getEsperaAll().subscribe(
      (ficha_emprestimo: FichaEmprestimo[])=>{
       this.qtdRequisicaoPendente = ficha_emprestimo.length
      },
      (err: any)=>{
        console.log(err)
      },
      ()=>{
        this.realTime.adicionarRequisicaoNovas(this.qtdRequisicaoPendente)
      }
    )

    this.pendenciaService.getQtdAguardandoFinalizacao().subscribe(
      (qtd: number)=>{
        this.qtdPendAguarFinal = qtd
      },
      (err: any)=>{
        this.qtdPendAguarFinal = 0
      },
      ()=>{
        this.realTime.adicionarPendenciasAguard(this.qtdPendAguarFinal)
      }
    )

  }

  public sair(): void{

    localStorage.removeItem("idUsuario")
    localStorage.removeItem("idCargo")
    localStorage.clear()
    this.route.navigate(['/'])

  }

}
