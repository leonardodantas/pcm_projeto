import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AdmComponent } from "./adm/adm.component";
import { AutenticacaoGuardService } from "./services/autenticacao-guard.service";



export const ROUTES: Routes = [
  {path:'', component: HomeComponent},
  {path:'adm', component: AdmComponent }
]
