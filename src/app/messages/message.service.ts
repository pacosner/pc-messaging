import { Injectable } from '@angular/core';
import { Message } from './message';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { GlobalVariable } from '../globals';

@Injectable()
export class MessageService {
    private MessagesUrl = '/api/messages';

    constructor (private http: Http) {}

    // get("/api/Messages")
    getMessages(): Promise<void | Message[]> {
      return this.http.get(this.MessagesUrl)
                 .toPromise()
                 .then(response => response.json() as Message[])
                 .catch(this.handleError);
    }

    // post("/api/Messages")
    createMessage(newMessage: Message): Promise<void | Message> {

      newMessage.from = GlobalVariable.TEST_USER;

      return this.http.post(this.MessagesUrl, newMessage)
                 .toPromise()
                 .then(response => response.json() as Message)
                 .catch(this.handleError);
    }

    // delete("/api/Messages/:id")
    deleteMessage(delMessageId: String): Promise<void | String> {
      return this.http.delete(this.MessagesUrl + '/' + delMessageId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
