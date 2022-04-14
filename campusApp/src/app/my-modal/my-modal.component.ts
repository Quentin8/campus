import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.scss']
})
export class MyModalComponent implements OnInit {
  @Input() my_modal_title : string;
  @Input() my_modal_content : string;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

}
