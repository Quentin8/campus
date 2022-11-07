import {Subject} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class AppareilsServices{

  appareilSubject = new Subject<any[]>();
  constructor(private httpClient: HttpClient) {
  }


  private appareils = [
    {
      nom: '',
      valeur : '',
      id : -1
    }
  ];

  private prisenumber : number;
  private lampenumber : number;

  emitAppareilSubject(){
    this.appareilSubject.next(this.appareils.slice());
  }


  onObtenir(url : string){
    this.httpClient
      .get<any>(url)
      .subscribe(
        (response)=> {
          console.log(JSON.parse(response));
          let i = 0;
          let responseParse = JSON.parse(response);
          this.appareils = [];
          for (let item of responseParse) {
            //console.log(JSON.parse(response)[i]);
            //console.log(responseKey);
            this.appareils[i] = item;
            i++;
          }
          if (responseParse[1].type === 'prise'){
            console.log('il y a ' + i + ' valeur de prises');
            this.prisenumber = i;
          }
          else if (responseParse[1].type === 'lampe') {
            console.log('il y a ' + i + ' valeur de lampes');
            this.lampenumber = i;
          }
          else{
            console.log("pas de type");
          }
          this.emitAppareilSubject();
          console.log('Chargement réussie !');

        },
        (error)=>{
          console.log('Erreur de chargement !' + error);
        }
      );
    this.emitAppareilSubject();
  }

  onAllumer(id :number){

    this.appareils[id].valeur = 'on';
    const body = JSON.stringify(this.appareils[id]);
    console.log(body);
    this.httpClient.post<any>('http://10.30.50.201:3000/api/lampes', this.appareils[id]).subscribe({
      next: data => {
        console.log("GOOD donnée envoyée");
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
    this.emitAppareilSubject();
  }

  onEteindre(id :number){

    this.appareils[id].valeur = 'off';
    const body = JSON.stringify(this.appareils[id]);
    console.log(body);
    //this.httpClient.post('http://10.30.50.201:3000/api/lampes', body);
    this.httpClient.post<any>('http://10.30.50.201:3000/api/lampes', this.appareils[id]).subscribe({
      next: data => {
        console.log("GOOD donnée envoyée");
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
    this.emitAppareilSubject();
  }
}
