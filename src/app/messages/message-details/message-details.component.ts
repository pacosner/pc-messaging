import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html'
})
export class MessageDetailsComponent implements OnInit {

  @Input() selectedMessage: Message;
  constructor() { }

  ngOnInit() {
  }

}
