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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdmComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    HttpModule,

  ],
  providers: [{provide: APP_BASE_HREF, useValue: ''}, AutenticacaoGuardServiceAdm, Autenticacao],
  bootstrap: [AppComponent],
})
export class AppModule { }
