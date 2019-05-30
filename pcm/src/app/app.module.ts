import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { AdmComponent } from './adm/adm.component';

import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import {APP_BASE_HREF} from '@angular/common';
import { AutenticacaoGuardServiceAdm } from './services/autenticacao-guard-adm.service';
import { Autenticacao } from './services/autenticacao.service';
import { MenuAdmComponent } from './adm/menu-adm/menu-adm.component';
import { NovosUsuariosComponent } from './adm/novos-usuarios/novos-usuarios.component';
import { HomeAdmComponent } from './adm/home-adm/home-adm.component';

import { RealTime } from './services/realdate.service';
import { UsuariosComponent } from './adm/home-adm/usuarios/usuarios.component';
import { FooterComponent } from './footer/footer.component';
import { FuncoesComponent } from './adm/home-adm/funcoes/funcoes.component';
import { EquipamentoComponent } from './adm/home-adm/equipamento/equipamento.component';
import { ManutencaoComponent } from './manutencao/manutencao.component';
import { AutenticacaoGuardServiceManutencao } from './services/autenticacao-guard-manu.service';
import { MenuManutencaoComponent } from './manutencao/menu-manutencao/menu-manutencao.component';
import { HomeManutencaoComponent } from './manutencao/home-manutencao/home-manutencao.component';
import { ManutecaoAdmComponent } from './adm/home-adm/manutecao-adm/manutecao-adm.component';
import { PendenciaComponent } from './adm/home-adm/pendencia/pendencia.component';
import { NovasComponent } from './manutencao/novas/novas.component';
import { AndamentoComponent } from './manutencao/andamento/andamento.component';
import { FinalizadasComponent } from './manutencao/finalizadas/finalizadas.component';
import { TodasComponent } from './manutencao/todas/todas.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AutenticacaoGuardServiceUsuario } from './services/autenticacao-guard-usuario.service';
import { MenuUsuarioComponent } from './usuario/menu-usuario/menu-usuario.component';
import { HomeUsuarioComponent } from './usuario/home-usuario/home-usuario.component';
import { NovaRequisicaoComponent } from './usuario/nova-requisicao/nova-requisicao.component';
import { RequisicoesEsperaComponent } from './usuario/requisicoes-espera/requisicoes-espera.component';
import { NovasRequisicoesComponent } from './adm/novas-requisicoes/novas-requisicoes.component';
import { LiberadasComponent } from './usuario/liberadas/liberadas.component';
import { RejeitadasComponent } from './usuario/rejeitadas/rejeitadas.component';
import { ListarTodasComponent } from './usuario/listar-todas/listar-todas.component';
import { NovaPendenciaComponent } from './adm/home-adm/pendencia/nova-pendencia/nova-pendencia.component';
import { ListarComponent } from './adm/home-adm/pendencia/listar/listar.component';
import { MudarSafraComponent } from './adm/home-adm/pendencia/mudar-safra/mudar-safra.component';
import { PendenciaAtualComponent } from './usuario/pendencia-atual/pendencia-atual.component';
import { PendenciaAtrasadaComponent } from './usuario/pendencia-atrasada/pendencia-atrasada.component';
import { PendenciaConcluidaComponent } from './usuario/pendencia-concluida/pendencia-concluida.component';
import { NovasPendenciasFinalizadasComponent } from './adm/home-adm/novas-pendencias-finalizadas/novas-pendencias-finalizadas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdmComponent,
    MenuAdmComponent,
    NovosUsuariosComponent,
    HomeAdmComponent,
    UsuariosComponent,
    FooterComponent,
    FuncoesComponent,
    EquipamentoComponent,
    ManutencaoComponent,
    MenuManutencaoComponent,
    HomeManutencaoComponent,
    ManutecaoAdmComponent,
    PendenciaComponent,
    NovasComponent,
    AndamentoComponent,
    FinalizadasComponent,
    TodasComponent,
    UsuarioComponent,
    MenuUsuarioComponent,
    HomeUsuarioComponent,
    NovaRequisicaoComponent,
    RequisicoesEsperaComponent,
    NovasRequisicoesComponent,
    LiberadasComponent,
    RejeitadasComponent,
    ListarTodasComponent,
    NovaPendenciaComponent,
    ListarComponent,
    MudarSafraComponent,
    PendenciaAtualComponent,
    PendenciaAtrasadaComponent,
    PendenciaConcluidaComponent,
    NovasPendenciasFinalizadasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
    ReactiveFormsModule,
    HttpModule,

  ],
  providers: [ RealTime,AutenticacaoGuardServiceAdm, Autenticacao, AutenticacaoGuardServiceManutencao, AutenticacaoGuardServiceUsuario],
  bootstrap: [AppComponent],
})
export class AppModule { }
