import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Pipe({
  name: 'messageSearch'
})
export class MessageSearchPipe implements PipeTransform {

  transform(messages: any, searchText: any): any {
    if (!searchText) return messages;
    return messages.filter(function(message){
      return message.subject.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
    
  }

}
