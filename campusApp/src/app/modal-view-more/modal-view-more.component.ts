import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal-view-more',
  templateUrl: './modal-view-more.component.html',
  styleUrls: ['./modal-view-more.component.scss']
})
export class ModalViewMoreComponent implements OnInit {

  @Input() my_modal_number : number;
  @Input() my_modal_title : string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
