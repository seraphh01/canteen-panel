import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: io.Socket;

  constructor() { }

  initSocket() {
    const token = localStorage.getItem('access-token'); // get the token from local storage
    this.socket = io.io(`${environment.socketUrl}?token=${token}`, { transports: ["websocket", "polling"]}); // send it as a query parameter
  }

  send(event: string, data: any) {
    this.socket.emit(event, data);
  }

  listen(event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });
    });
  }
}
