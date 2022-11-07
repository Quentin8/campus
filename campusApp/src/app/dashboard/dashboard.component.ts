import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppareilsServices} from "../service/appareils.service";
import {Subscription} from "rxjs";
import {UsersService} from "../service/users";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MyModalComponent} from "../my-modal/my-modal.component";
import {ModalViewMoreComponent} from "../modal-view-more/modal-view-more.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



  public patientOne = [
    {
      nom: '',
      valeur: '',
      id: -1
    }
  ];
  urlOne = 'http://10.30.50.201:3000/api/patientOne'

  public patientTwo = [
    {
      nom: '',
      valeur: '',
      id: -1
    }
  ];
  urlTwo = 'http://10.30.50.201:3000/api/patientTwo'

  public operation = [
    {
      nom: '',
      valeur: '',
      id: -1
    }
  ];
  urlOperation = 'http://10.30.50.201:3000/api/operation'


  public reserve = [
    {
      nom: '',
      valeur: '',
      id: -1
    }
  ];
  urlReserve = 'http://10.30.50.201:3000/api/reserve';

  public alertes = [
    {
      nom: 'default',
      valeur: '',
      capteurid: -1,
      description : '',
      urgent : ''
    }
  ];
  urlAlerte = 'http://10.30.50.201:3000/api/alerte';


  public leds = [
    {
      nom: '',
      valeur: '',
      id: -1,
      description : '',
      urgent : ''
    }
  ];
  urlLed = 'http://10.30.50.201:3000/api/led';

  modalNumber : number;

  modalTitle : string;


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {}

  onClick1(){
    this.modalTitle = 'Chambre 1';
    this.modalNumber = 1;
    this.open();

  }
  onClick2(){
    this.modalTitle = 'Salle d\'opération';
    this.modalNumber = 2;
    this.open();
  }
  onClick3(){
    this.modalTitle = 'Chambre 2';
    this.modalNumber = 3;
    this.open();
  }
  onClick4(){
    this.modalTitle = 'Réserve';
    this.modalNumber = 4;
    this.open();
  }

  open() {
    const modalRef = this.modalService.open(ModalViewMoreComponent);
    modalRef.componentInstance.my_modal_title = this.modalTitle;
    modalRef.componentInstance.my_modal_number = this.modalNumber;
  }
}
