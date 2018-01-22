import { Injectable } from '@angular/core';
import { Message } from './message';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

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
      return this.http.post(this.MessagesUrl, newMessage)
                 .toPromise()
                 .then(response => response.json() as Message)
                 .catch(this.handleError);
    }

    // get("/api/Messages/:id") endpoint not used by Angular app

    // delete("/api/Messages/:id")
    deleteMessage(delMessageId: String): Promise<void | String> {
      return this.http.delete(this.MessagesUrl + '/' + delMessageId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/Messages/:id")
    updateMessage(putMessage: Message): Promise<void | Message> {
      var putUrl = this.MessagesUrl + '/' + putMessage._id;
      return this.http.put(putUrl, putMessage)
                 .toPromise()
                 .then(response => response.json() as Message)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
