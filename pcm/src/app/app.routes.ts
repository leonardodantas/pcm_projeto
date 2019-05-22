import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AdmComponent } from "./adm/adm.component";
import { AutenticacaoGuardServiceAdm } from "./services/autenticacao-guard-adm.service";
import { HomeAdmComponent } from "./adm/home-adm/home-adm.component";
import { NovosUsuariosComponent } from "./adm/novos-usuarios/novos-usuarios.component";
import { UsuariosComponent } from "./adm/home-adm/usuarios/usuarios.component";
import { FuncoesComponent } from "./adm/home-adm/funcoes/funcoes.component";
import { EquipamentoComponent } from "./adm/home-adm/equipamento/equipamento.component";
import { ManutencaoComponent } from "./manutencao/manutencao.component";
import { AutenticacaoGuardServiceManutencao } from "./services/autenticacao-guard-manu.service";
import { HomeManutencaoComponent } from "./manutencao/home-manutencao/home-manutencao.component";
import { ManutecaoAdmComponent } from "./adm/home-adm/manutecao-adm/manutecao-adm.component";
import { NovasComponent } from "./manutencao/novas/novas.component";
import { AndamentoComponent } from "./manutencao/andamento/andamento.component";
import { FinalizadasComponent } from "./manutencao/finalizadas/finalizadas.component";
import { TodasComponent } from "./manutencao/todas/todas.component";
import { AutenticacaoGuardServiceUsuario } from "./services/autenticacao-guard-usuario.service";
import { UsuarioComponent } from "./usuario/usuario.component";
import { HomeUsuarioComponent } from "./usuario/home-usuario/home-usuario.component";
import { NovaRequisicaoComponent } from "./usuario/nova-requisicao/nova-requisicao.component";
import { RequisicoesEsperaComponent } from "./usuario/requisicoes-espera/requisicoes-espera.component";
import { NovasRequisicoesComponent } from "./adm/novas-requisicoes/novas-requisicoes.component";
import { LiberadasComponent } from "./usuario/liberadas/liberadas.component";
import { RejeitadasComponent } from "./usuario/rejeitadas/rejeitadas.component";
import { ListarTodasComponent } from "./usuario/listar-todas/listar-todas.component";
import { PendenciaComponent } from "./adm/home-adm/pendencia/pendencia.component";
import { patch } from "webdriver-js-extender";
import { NovaPendenciaComponent } from "./adm/home-adm/pendencia/nova-pendencia/nova-pendencia.component";
import { ListarComponent } from "./adm/home-adm/pendencia/listar/listar.component";
import { MudarSafraComponent } from "./adm/home-adm/pendencia/mudar-safra/mudar-safra.component";
import { PendenciaAtualComponent } from "./usuario/pendencia-atual/pendencia-atual.component";
import { PendenciaAtrasadaComponent } from "./usuario/pendencia-atrasada/pendencia-atrasada.component";
import { PendenciaConcluidaComponent } from "./usuario/pendencia-concluida/pendencia-concluida.component";

export const ROUTES: Routes = [
  {path:'', component: HomeComponent},
  {path:'adm', component: AdmComponent, canActivate: [AutenticacaoGuardServiceAdm], children:[
    {path: '', component: HomeAdmComponent},
    {path: 'novosUsuarios', component: NovosUsuariosComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'funcoes', component: FuncoesComponent},
    {path: 'equipamento', component: EquipamentoComponent},
    {path: 'manu-adm', component: ManutecaoAdmComponent},
    {path: 'requisicoes', component: NovasRequisicoesComponent},
    {path: 'pendencias', component: PendenciaComponent, children:[
      {path: '', component: NovaPendenciaComponent},
      {path: 'nova', component: NovaPendenciaComponent},
      {path: 'concluidas', component: ListarComponent},
      {path: 'mudar-safra',component: MudarSafraComponent}
    ]}
 ] },
  {path: 'manutencao', component: ManutencaoComponent, canActivate: [AutenticacaoGuardServiceManutencao], children:[
    {path: '', component: HomeManutencaoComponent},
    {path: 'novas', component: NovasComponent},
    {path: 'andamento', component: AndamentoComponent},
    {path: 'finalizadas', component: FinalizadasComponent},
    {path: 'todas', component: TodasComponent}
  ]},
  {path: 'usuario', component: UsuarioComponent, canActivate: [AutenticacaoGuardServiceUsuario], children:[
    {path: '', component: HomeUsuarioComponent},
    {path: 'nova-requisicao', component: NovaRequisicaoComponent},
    {path: 'requsicao-espera', component: RequisicoesEsperaComponent},
    {path: 'liberadas', component: LiberadasComponent},
    {path: 'rejeitadas', component: RejeitadasComponent},
    {path: 'listar', component: ListarTodasComponent},
    {path: 'pendencia-atual', component: PendenciaAtualComponent},
    {path: 'pendencia-atrasada', component: PendenciaAtrasadaComponent},
    {path: 'pendencia-concluida', component: PendenciaConcluidaComponent}
  ]}
]
