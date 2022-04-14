import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Subscription} from "rxjs";
import {UsersService} from "../service/users";




@Component({
  selector: 'app-empreinte',
  templateUrl: './empreinte.component.html',
  styleUrls: ['./empreinte.component.scss']
})
export class EmpreinteComponent implements OnInit {

  empreintes =  new Array;
  userSubscription : Subscription;
  url = 'http://localhost:3000/api/users';


  constructor(private httpClient: HttpClient,
              private usersService : UsersService) {}



  ngOnInit(): void {

    this.usersService.onObtenir(this.url);

    this.userSubscription = this.usersService.userSubject.subscribe(
      (users : any[])=> {
        this.empreintes = users;
      }
    );
    this.usersService.emituserSubject();


  }


}
