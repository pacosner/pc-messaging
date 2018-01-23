import {Component, Input, ViewChild} from '@angular/core';

import {NgbModal, NgbActiveModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {Action} from 'rxjs/scheduler/Action';
import {MessageService} from '../message.service';
import {Message} from '../message';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: `./send-message-form.ts.html`
})
export class NgbdModalContent {
  @Input() message: Message;
  @ViewChild('addMessageForm') addMessageForm : NgForm;

  constructor(public activeModal: NgbActiveModal, private messageService: MessageService) {
    this.message = new Message();
  }

  onSubmit(){
    this.messageService.createMessage(this.message).then((message: Message) => {
      this.activeModal.close();
    });
  }

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