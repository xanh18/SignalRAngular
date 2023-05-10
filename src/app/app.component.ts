import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private hubConnection!: HubConnection;
  message = '';
  messages: string[] = [];
 
  constructor(
  ) {}
 
  sendMessage(): void {
    const data = `Sent: ${this.message}`;
    if (this.hubConnection) {
      this.hubConnection.invoke('Send', data);
    }
    this.messages.push(data);
  }

  ngOnInit(): void
  {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5108/chatHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

    this.hubConnection.start().catch((err) => console.error(err.toString()));

    this.hubConnection.on('Send', (data: any) => {
      const received = `Received: ${data}`;
      this.messages.push(received);
    });
  }

}
