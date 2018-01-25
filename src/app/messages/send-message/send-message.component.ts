import {Component, Input, ViewChild, OnInit} from '@angular/core';

import {NgbModal, NgbActiveModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {Action} from 'rxjs/scheduler/Action';
import {MessageService} from '../message.service';
import {Message} from '../message';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'ngbd-modal-content',
  templateUrl: `./send-message-form.ts.html`
})
export class NgbdModalContent implements OnInit  {
  @Input() message: Message;
  @ViewChild('addMessageForm') addMessageForm : NgForm;

  public publicMessageService;
  private cachedRecips: Array<string> = [];

  constructor(public activeModal: NgbActiveModal, private messageService: MessageService) {
    this.message = new Message();
  }

  onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

  ngOnInit() {
    this.messageService.getMessages().then((messages: Message[]) => {
      let _cachedRecips = messages.map(message => message.to);
      this.cachedRecips = _cachedRecips.filter(this.onlyUnique);
    })
  }

  search = (text$: Observable<string>) =>
  text$
    .debounceTime(200)
    .distinctUntilChanged()
    .map(term => term.length < 2 ? []
      : this.cachedRecips.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  

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