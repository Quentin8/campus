import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LampesComponent} from "./lampes/lampes.component";
import {PrisesComponent} from "./prises/prises.component";
import {CameraComponent} from "./camera/camera.component";
import {EmpreinteComponent} from "./empreinte/empreinte.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {AuthGard} from "./service/auth-gard.services";
import {FourOhFourComponent} from "./four-oh-four/four-oh-four.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {EspacePersoComponent} from "./espace-perso/espace-perso.component";

const routes: Routes = [
  {path :'', component : WelcomeComponent},
  {path : 'auth', component : SignupComponent},
  {path :'dashboard', canActivate : [AuthGard], component : DashboardComponent},
  {path : 'prises', canActivate : [AuthGard], component : PrisesComponent},
  {path : 'lampes', canActivate : [AuthGard], component : LampesComponent},
  {path : 'camera', canActivate : [AuthGard], component : CameraComponent},
  {path : 'empreinte', canActivate : [AuthGard], component : EmpreinteComponent},
  {path : 'welcome', component : WelcomeComponent},
  {path : 'perso', canActivate : [AuthGard], component : EspacePersoComponent},
  {path : 'not-found', component : FourOhFourComponent},
  {path : '**', redirectTo : '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
