import {Subject} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class UsersService {

  userSubject = new Subject<any[]>();
  constructor(private httpClient: HttpClient) {
  }


  private users = [
    {
      nom: '',
      empreinte : false,
      id : -1,
    }
  ];

  autorisation : boolean;


  emituserSubject(){
    this.userSubject.next(this.users.slice());
  }


  onObtenir(url : string){
    this.httpClient
      .get<any>(url)
      .subscribe(
        (response)=> {
          console.log(JSON.parse(response));
          let i = 0;
          let responseParse = JSON.parse(response);
          this.users = [];
          for (let item of responseParse) {
            //console.log(JSON.parse(response)[i]);
            //console.log(responseKey);
            this.users[i] = item;
            i++;
          }
          this.emituserSubject();
          console.log('Chargement réussie !');

        },
        (error)=>{
          console.log('Erreur de chargement !' + error);
        }
      );
    this.emituserSubject();
  }

  onAllumer(id :number){

    this.users[id].empreinte = true;
    const body = JSON.stringify(this.users[id]);
    console.log(body);
    this.httpClient.post<any>('http://localhost:3000/api/users', this.users[id]).subscribe({
      next: data => {
        console.log("GOOD donnée envoyée");
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
    this.emituserSubject();
  }

  onDelete(id :number){

    const body = JSON.stringify(this.users[id]);
    console.log(body);
    this.httpClient.post<any>('http://localhost:3000/api/deleteUser', this.users[id]).subscribe({
      next: data => {
        console.log("GOOD donnée envoyée");
        this.users = [
          {
            nom: '',
            empreinte : false,
            id : -1,
          }
        ];

        this.onObtenir('http://localhost:3000/api/users');

      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
    this.emituserSubject();
  }
}
