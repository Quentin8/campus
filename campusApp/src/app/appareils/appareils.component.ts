import {Component, Input, OnInit} from '@angular/core';
import {AppareilsServices} from "../service/appareils.service";

@Component({
  selector: 'app-appareils',
  templateUrl: './appareils.component.html',
  styleUrls: ['./appareils.component.scss']
})
export class AppareilsComponent implements OnInit {

  @Input() appareilName: string;
  @Input() appareilValeur :string;
  @Input() indexOfAppareil : number;
  @Input() id : number;


  constructor(private appareilService : AppareilsServices) { }

  ngOnInit(): void {}

  onSwitchOn(){
    this.appareilService.onAllumer(this.indexOfAppareil);
  }

  onSwitchOff(){
    this.appareilService.onEteindre(this.indexOfAppareil);
  }

  getColor(){
    if(this.appareilValeur === 'on'){
      return 'black';
    }else{
      return 'white'
    }
  }

}
