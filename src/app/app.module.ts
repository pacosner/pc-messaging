import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { SendMessageComponent } from './messages/send-message/send-message.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './messages/send-message/send-message.component';
import { MessageService } from './messages/message.service';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { BoxSelectorComponent } from './box-selector/box-selector.component';
import { TruncatePipe } from './truncate.pipe';
import { MessageDetailsComponent } from './messages/message-details/message-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    NgbdModalContent,
    SendMessageComponent,
    MessageListComponent,
    BoxSelectorComponent,
    TruncatePipe,
    MessageDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  entryComponents: [NgbdModalContent],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }