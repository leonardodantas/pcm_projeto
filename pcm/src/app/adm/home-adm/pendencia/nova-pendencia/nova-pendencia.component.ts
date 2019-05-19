import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SafraService } from 'src/app/services/safra.service';
import { Safra } from 'src/app/model/safra';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-nova-pendencia',
  templateUrl: './nova-pendencia.component.html',
  styleUrls: ['./nova-pendencia.component.css'],
  providers: [SafraService, UsuariosService]
})
export class NovaPendenciaComponent implements OnInit {

  public safra: Safra
  public cod_pendencia: string

  public pendencia =  new FormGroup({
    'codigo': new FormControl(null),
    'data_limite': new FormControl(null,[Validators.required]),
    'assunto': new FormControl(null, [Validators.required, Validators.minLength(7)]),
    'descricao': new FormControl(null, [Validators.required])
  })

  constructor(
    private safraService: SafraService,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    this.safraService.getSafra().subscribe(
      (safra: Safra)=>{
        this.safra = safra
        this.cod_pendencia = this.codigoPendencia()
        this.pendencia.controls.codigo.setValue(this.cod_pendencia)
      }
    )
  }

  public codigoPendencia(): string{
    if(this.safra.qtd_codigo < 10)
      return this.safra.codigo_safra + '-' + "00" + this.safra.qtd_codigo
    if( this.safra.qtd_codigo > 9 && this.safra.qtd_codigo < 100)
      return this.safra.codigo_safra + '-' + "0" + this.safra.qtd_codigo
    if(this.safra.qtd_codigo > 99)
      return this.safra.codigo_safra + '-' + this.safra.qtd_codigo
  }

  public criarPendencia(): void{
    console.log(this.pendencia)
    this.usuarioService.getUserForPend().subscribe(
      (usuario: Usuario[])=>{
        console.log(usuario)
      }
    )
  }

  public cancelar(): void{
    this.pendencia.reset()
  }

}
