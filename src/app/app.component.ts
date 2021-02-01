import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public className:string = 'light';
  public show:boolean = false;
  title = 'assignment2';
  currentUser:any;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(){
    this.userService.isAuthorized();
  }

  toggle() {
    this.show = !this.show;
    if (this.show) {
      this.className = 'dark'
    } else {
      this.className = 'light';
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
