import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { TruncatePipe } from '../../truncate.pipe';
import { MessageSearchPipe } from '../../message-search.pipe';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnChanges {


  message:string;

  messages: Message[];
  selectedMessage: Message;
  visibleMessages: Message[];

  @Input() currentMailBox: string;

  filterParam: string = '';

  constructor(private messageService: MessageService) { }

  selectMessage(message: Message) {
    this.selectedMessage = message;
  }

  resetFilter() {
    this.visibleMessages = Object.assign(this.messages);
  }

  ngOnChanges(changes: SimpleChanges) {

    this.selectedMessage = null;
    
    if( changes['currentMailBox'] && changes['currentMailBox'].previousValue != changes['currentMailBox'].currentValue ) {
      if (changes['currentMailBox'].currentValue === 'in') {
        this.resetFilter();
      }
      if (changes['currentMailBox'].currentValue === 'out') {
        this.visibleMessages = this.messages.filter(message => message.from === 'tester@pcmail.com')
      }
    }
  }

  private getIndexOfMessage = (messageId: String) => {
    return this.messages.findIndex((message) => {
      return message._id === messageId;
    });
  }

  deleteMessage(messageId: string): void {
    if (confirm("delete this message?")) {
      this.messageService.deleteMessage(messageId).then((deletedContactId: String) => {
        var idx = this.getIndexOfMessage(messageId);
        if (idx !== -1) {
          this.messages.splice(idx, 1);
        }
      })
    }
  }

  ngOnInit() {

    this.messageService
     .getMessages()
     .then((messages: Message[]) => {
       this.messages = messages.sort((a, b) => a.createDate > b.createDate ? -1 : a.createDate < b.createDate ? 1 : 0);
       this.visibleMessages = Object.assign(this.messages);
     });
 }

}
