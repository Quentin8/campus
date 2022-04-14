import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LampesComponent } from './lampes/lampes.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PrisesComponent } from './prises/prises.component';
import { CameraComponent } from './camera/camera.component';
import { EmpreinteComponent } from './empreinte/empreinte.component';
import {FourOhFourComponent} from "./four-oh-four/four-oh-four.component";
import {AuthGard} from "./service/auth-gard.services";
import {AuthService} from "./service/auth.service";
import { WelcomeComponent } from './welcome/welcome.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AppareilsComponent } from './appareils/appareils.component';
import {AppareilsServices} from "./service/appareils.service";
import { UserFingerComponent } from './user-finger/user-finger.component';
import {UsersService} from "./service/users";
import { AlertesComponent } from './dashboard/alertes/alertes.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MyModalComponent } from './my-modal/my-modal.component';
import { EspacePersoComponent } from './espace-perso/espace-perso.component';
import { ModalViewMoreComponent } from './modal-view-more/modal-view-more.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LampesComponent,
    SignupComponent,
    PrisesComponent,
    CameraComponent,
    EmpreinteComponent,
    FourOhFourComponent,
    WelcomeComponent,
    AppareilsComponent,
    UserFingerComponent,
    AlertesComponent,
    MyModalComponent,
    EspacePersoComponent,
    ModalViewMoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGard,
    AppareilsServices,
    UsersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
