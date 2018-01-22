import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: `./send-message-form.ts.html`
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.ts.html'
})
export class SendMessageComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    let options: NgbModalOptions = {
      size: 'lg'
    };
    const modalRef = this.modalService.open(NgbdModalContent, options);
    modalRef.componentInstance.name = 'World';
  }
}