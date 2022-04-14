import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from "../service/users";

@Component({
  selector: 'app-user-finger',
  templateUrl: './user-finger.component.html',
  styleUrls: ['./user-finger.component.scss']
})
export class UserFingerComponent implements OnInit {
  @Input() userName: string;
  @Input() userValeur :boolean;
  @Input() indexOfUser : number;
  @Input() id : number;
  @Input() mail : string;

  constructor(private userService : UsersService) {}

  ngOnInit(): void {
  }

  onEnroll(){
    this.userService.onAllumer(this.indexOfUser);
  }

  onSupp(){
    this.userService.onDelete(this.indexOfUser);
  }

  getColor(){
    if(this.userValeur === true){
      return 'black';
    }else{
      return 'white'
    }
  }



}
