import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Message } from './message';

@Component({
  selector: 'app-messages',
  styles: [`
  .item {
    margin-right: 50px;
  }

  .active {
    background-color: lightblue !important;
  }

  .card-body {
    padding: 0;
    cursor: pointer;
  }
  `],
  template: `
  <div (click)="makeActive(message)" *ngFor="let message of allMessages" class="card">
    <div [class.active]="message.active" class="card-body">
      <span class="item">{{message.subject}}</span>
      <span class="item">{{message.from}}</span>
      <span class="item">{{message.date}}</span> 
      <span class="item">{{message.time}}</span>
    </div>
  </div>  
  `,
})
export class MessagesComponent implements OnInit {

  @Output() onMakeActive: EventEmitter<any> = new EventEmitter<any>();

  /*
  makeActive(message) {
    this.allMessages.map(function(am) {
      am.active = false;
    })
    message.active = true;
    this.onMakeActive.emit(message);
  }
  */

  allMessages: Array<Message>;

  constructor() { }

  ngOnInit() {
    /*
    this.messageDataService.getAllMessages().subscribe(
      (messages) => {
        this.allMessages = messages;
      }
    )
    */
  }

}
