import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  
  socket: any;
  readonly uri: string = "ws://localhost:3000";

  constructor() {
  }

  listen(eventName : string){
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any){
    this.socket.emit(eventName, data);
  }
}
