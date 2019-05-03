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

export const ROUTES: Routes = [
  {path:'', component: HomeComponent},
  {path:'adm', component: AdmComponent, canActivate: [AutenticacaoGuardServiceAdm], children:[
    {path: '', component: HomeAdmComponent},
    {path: 'novosUsuarios', component: NovosUsuariosComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'funcoes', component: FuncoesComponent},
    {path: 'equipamento', component: EquipamentoComponent},
    {path: 'manu-adm', component: ManutecaoAdmComponent}
 ] },
  {path: 'manutencao', component: ManutencaoComponent, canActivate: [AutenticacaoGuardServiceManutencao], children:[
    {path: '', component: HomeManutencaoComponent},
    {path: 'novas', component: NovasComponent}
  ]}
]
