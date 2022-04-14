import { Component } from '@angular/core';
import {AuthService} from "./service/auth.service";
import {Router} from "@angular/router";
import {subscribeOn, Subscription} from "rxjs";
import {MyModalComponent} from "./my-modal/my-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UsersService} from "./service/users";
import {SignupComponent} from "./auth/signup/signup.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'campusApp';

  authStatus : boolean;
  modalMessageContact = 'william.baudu@isen-yncrea.fr' +
    'quentin.fournier@isen-ouest.yncrea.fr';

  modalMessagePrivacy = 'Ce site a été réalisé au cours du projet M1 Campus connecté par et FOURNIER Quentin ' +
    'et BAUDU William';

  contactTitle = 'Contactez nous !';

  privacyTitle = 'Auteurs :';

  autorisation = false;

  utilisateurs = '';

  empreinte : boolean;

  constructor(private authService : AuthService, private router : Router,
              private modalService : NgbModal) {
  }

  onSignOut() {
    this.authService.signOut();
    this.router.navigate(['auth']);
    this.authStatus = this.authService.isAuth;
    this.autorisation = false;
  }

  open(content : string, title : string) {
    const modalRef = this.modalService.open(MyModalComponent);
    modalRef.componentInstance.my_modal_title = title;
    modalRef.componentInstance.my_modal_content = content;
  }

}
