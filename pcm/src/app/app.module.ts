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

import { DadosService } from './dados.service';
import { RealTime } from './services/realdate.service';
import { UsuariosComponent } from './adm/home-adm/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdmComponent,
    MenuAdmComponent,
    NovosUsuariosComponent,
    HomeAdmComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
    ReactiveFormsModule,
    HttpModule,

  ],
  providers: [ RealTime,{provide: DadosService, useValue: DadosService},AutenticacaoGuardServiceAdm, Autenticacao],
  bootstrap: [AppComponent],
})
export class AppModule { }
