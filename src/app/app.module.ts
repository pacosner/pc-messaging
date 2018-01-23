import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { MessagesComponent } from './messages/messages.component';
import { SendMessageComponent } from './messages/send-message/send-message.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './messages/send-message/send-message.component';
import { MessageService } from './messages/message.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent,
    MessagesComponent,
    NgbdModalContent,
    SendMessageComponent
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