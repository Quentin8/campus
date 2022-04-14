import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-espace-perso',
  templateUrl: './espace-perso.component.html',
  styleUrls: ['./espace-perso.component.scss']
})
export class EspacePersoComponent implements OnInit {

  utilisateurs : string;
  empreinte : boolean;


  constructor(private appComp : AppComponent,
              private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.utilisateurs = this.appComp.utilisateurs;
    this.empreinte = this.appComp.empreinte;
  }

  onEmpreinte(){
      this.httpClient.post<any>('http://localhost:3000/api/read', '').subscribe({
        next: data => {
          console.log("GOOD donnée envoyée");
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    console.log('données envoyeées');
  }
}
