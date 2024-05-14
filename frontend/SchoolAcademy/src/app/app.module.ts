import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';

import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { MessageService } from "primeng/api";
import { HomeComponent } from './home/home.component';
import { AlunosComponent } from './alunos/alunos.component';
import { EscolasComponent } from './escolas/escolas.component';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlunosComponent,
    EscolasComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MenubarModule,
    BrowserModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    ToastModule,
    CalendarModule,
    ButtonModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    DialogModule,
    TableModule, 
    InputMaskModule,
    AppRoutingModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
