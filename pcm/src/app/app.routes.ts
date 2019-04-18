import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AdmComponent } from "./adm/adm.component";
import { AutenticacaoGuardServiceAdm } from "./services/autenticacao-guard-adm.service";

export const ROUTES: Routes = [
  {path:'', component: HomeComponent},
  {path:'adm', component: AdmComponent, canActivate: [AutenticacaoGuardServiceAdm] }
]
