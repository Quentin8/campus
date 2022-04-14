import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Subscription} from "rxjs";
import {AppareilsServices} from "../service/appareils.service";



@Component({
  selector: 'app-prises',
  templateUrl: './prises.component.html',
  styleUrls: ['./prises.component.scss']
})
export class PrisesComponent implements OnInit {

  prises =  new Array;
  appareilSubscription : Subscription;
  url = 'http://localhost:3000/api/prises';


  constructor(private httpClient: HttpClient,
              private appareilsService : AppareilsServices) {}


  ngOnInit(): void {

    this.appareilsService.onObtenir(this.url);

    this.appareilSubscription = this.appareilsService.appareilSubject.subscribe(
      (appareils : any[])=> {
        this.prises = appareils;
      }
    );
    this.appareilsService.emitAppareilSubject();


  }


}





