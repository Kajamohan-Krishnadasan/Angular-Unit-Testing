import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  messages: string[] = [];

  // this will push the message to the messages array
  log(message: string) {
    // adding the debugger to check how many times this method is called
    // debugger;

    this.messages.push(message);
  }

  // this will clear all the messages
  clear() {
    this.messages = [];
  }
}
