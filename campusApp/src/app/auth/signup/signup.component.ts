import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MyModalComponent} from "../../my-modal/my-modal.component";
import {AppComponent} from "../../app.component";
import {EspacePersoComponent} from "../../espace-perso/espace-perso.component";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  authStatus : boolean;
  loginForm : FormGroup;
  users = [{
    username : '',
    password : '',
    autorisation : false,
    empreinte : false,
    nom : ''
  }];
  modalMessage = '';


  constructor(public authService : AuthService,
              private router : Router,
              private fb : FormBuilder,
              private httpClient : HttpClient,
              private modalService: NgbModal,
              private appComp : AppComponent
    ) {
  }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
    this.loginForm =  this.fb.group({
      username: [],
      password: []
    });
  }

  login(){
    this.onObtenir();

  }

  onSignIn(){
    this.authService.signIn().then(
      ()=> {
        this.authService.isAuth = true;
        this.router.navigate(['dashboard']);
        this.authStatus = this.authService.isAuth;
      }
    );

  }

  onObtenir(){
    this.httpClient
      .get<any>('http://localhost:3000/api/connexion')
      .subscribe(
        (response)=> {
          let i = 0;
          let responseParse = JSON.parse(response);
           this.users = [];
          for (let item of responseParse) {
            this.users[i] = item;
            i++;
          }
          this.validate();
        },
        (error)=>{
          console.log('Erreur de chargement !' + error);
        }
      );

  }

  validate(){
    let i = true;
    for(let user of this.users){
      if (user.username == this.loginForm.value.username){
        i = false;
        if (user.password == this.loginForm.value.password){
          console.log("mot de passe correct");
          this.onSignIn();
          this.appComp.autorisation = user.autorisation;
          this.appComp.utilisateurs = user.nom;
          this.appComp.empreinte = user.empreinte;
        }else{
          console.log("mot de passe incorrect");
          this.modalMessage = "L'utilisateur ou le mot de passe est incorrect"
          this.open();
        }
      }
    }
    if(i){
      console.log("L'utilisateur que vous cherchez n'existe pas");
      this.modalMessage = "L'utilisateur ou le mot de passe est incorrect"
      this.open();
    }
  }

  open() {
    const modalRef = this.modalService.open(MyModalComponent);
    modalRef.componentInstance.my_modal_title = 'La connexion a été refusée';
    modalRef.componentInstance.my_modal_content = this.modalMessage;
  }

}
