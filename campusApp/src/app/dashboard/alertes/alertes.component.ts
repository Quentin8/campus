import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-alertes',
  templateUrl: './alertes.component.html',
  styleUrls: ['./alertes.component.scss']
})
export class AlertesComponent implements OnInit {

  public alertes = [
    {
      nom: 'default',
      valeur: '',
      capteurid: -1,
      description : '',
      urgent : '',
      creation : ''
    }
  ];
  urlAlerte = 'http://localhost:3000/api/alerte';


  public leds = [
    {
      nom: '',
      valeur: '',
      id: -1,
      channel : '',
      raspberryId : -1
    }
  ];
  urlLed = 'http://localhost:3000/api/led';

  new : number;


  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {


    this.refreshAlertes();

    this.refreshLeds();

    setTimeout(()=>{
      this.ngOnInit();
    },5000)

  }



  refreshAlertes(){
    this.alertes = [
      {
        nom: 'default',
        valeur: '',
        capteurid: -1,
        description : '',
        urgent : '',
        creation : ''
      }
    ];
    this.onObtenir(this.urlAlerte, this.alertes);
  }

  refreshLeds(){
    this.leds = [
      {
        nom: '',
        valeur: '',
        id: -1,
        channel : '',
        raspberryId : -1
      }
    ];
    this.onObtenir(this.urlLed, this.leds);
  }

  onObtenir(url : string, card : Array<any>){
    this.httpClient
      .get<any>(url)
      .subscribe(
        (response)=> {
          console.log(JSON.parse(response));
          let i = 0;
          let responseParse = JSON.parse(response)
          for (let item of responseParse) {
            card[i] = item;
            if (card[i].type === 'humidité'){
              card[i].valeur += '%'
            }else if (card[i].type === 'température'){
              card[i].valeur += '°C'
            } else if (card[i].type === 'cardiaque'){
              card[i].valeur += ' BPM'
            }
            else if (card[i].type === 'luminosité'){
              card[i].valeur += ' Lux'
            }
            i++;
          }
          this.new = i;
        },
        (error)=>{
          console.log('Erreur de chargement !' + error);
        }
      );
  }

  onDelete(capteurId : number){
    for(let led of this.leds){
      if (led.id == capteurId){
        led.valeur = 'off';
        this.httpClient.post<any>('http://localhost:3000/api/led', led).subscribe({
          next: data => {
            console.log("GOOD donnée envoyée vers led");
            console.log(led);
          },
          error: error => {
            console.error('There was an error!', error);
          }
        });
      }
    }
    for(let alerte of this.alertes){
      if (alerte.capteurid == capteurId){
        this.httpClient.post<any>('http://localhost:3000/api/alertes', alerte).subscribe({
          next: data => {
            console.log("GOOD donnée envoyée");
            this.alertes = [
              {
                nom: 'default',
                valeur: '',
                capteurid: -1,
                description : '',
                urgent : '',
                creation : ''
              }
            ];
            this.onObtenir(this.urlAlerte, this.alertes);
          },
          error: error => {
            console.error('There was an error!', error);
          }
        });
      }
    }
  }

  isEmpty(){
    if (this.alertes[0].capteurid == -1){
      return false;
    }else{
      return true;
    }
  }



}
