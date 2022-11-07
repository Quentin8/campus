import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Subscription} from "rxjs";
import {AppareilsServices} from "../service/appareils.service";



@Component({
  selector: 'app-lampes',
  templateUrl: './lampes.component.html',
  styleUrls: ['./lampes.component.scss']
})
export class LampesComponent implements OnInit {

  lampes =  new Array;
  appareilSubscription : Subscription;
  url = 'http://10.30.50.201:3000/api/lampes';


  constructor(private httpClient: HttpClient,
              private appareilsService : AppareilsServices) {}


  ngOnInit(): void {

    this.appareilsService.onObtenir(this.url);

    this.appareilSubscription = this.appareilsService.appareilSubject.subscribe(
      (appareils : any[])=> {
        this.lampes = appareils;
      }
    );
    this.appareilsService.emitAppareilSubject();

  }




    /*this.httpClient
      .get<any>('http://10.30.50.201:3000/api/temperatures')
      .subscribe(
        (response)=> {
          console.log(JSON.parse(response));
          let i = 0;
          let responseParse = JSON.parse(response);
          for (let item of responseParse) {
            //console.log(JSON.parse(response)[i]);
            //console.log(responseKey);
            this.appareils[i] = item;
            i++;
            //console.log(this.appareils[i]);
          }
          //this.appareils = JSON.parse(response)[0].valeur;
          //console.log(this.appareils);
          console.log('Chargement réussie !');
        },
        (error)=>{
          console.log('Erreur de chargement !' + error);
        }
      );*/


  /*onAllumer(id :number){

    this.appareils[id].valeur = 'on';
    const body = JSON.stringify(this.appareils[id]);
    console.log(body);
    this.httpClient.post<any>('http://10.30.50.201:3000/api/appareils', this.appareils[id]).subscribe({
      next: data => {
        console.log("GOOD donnée envoyée");
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  onEteindre(id :number){

    this.appareils[id].valeur = 'off';
    const body = JSON.stringify(this.appareils[id]);
    console.log(body);
    //this.httpClient.post('http://10.30.50.201:3000/api/appareils', body);
    this.httpClient.post<any>('http://10.30.50.201:3000/api/appareils', this.appareils[id]).subscribe({
      next: data => {
        console.log("GOOD donnée envoyée");
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
   }



  getColor(id : number){
    if(this.appareils[id].valeur === 'on'){
      return 'black';
    }else{
      return 'white'
    }
  }*/
}




