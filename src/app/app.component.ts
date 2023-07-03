import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'canteen_panel';
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router, private socketService: SocketService) { 

  }

  ngOnInit(){
    this.isAuthenticated = this.authService.getAccessToken()!=null;

    if(this.isAuthenticated){
      this.router.navigate(['menus']);
      this.socketService.initSocket();
    }
  }

  onAuthChanged(eventData: {auth:boolean}){
    this.isAuthenticated = eventData.auth;

    if(this.isAuthenticated){
      this.router.navigate(["menus"]);
      this.socketService.initSocket();
    }
  }
}
