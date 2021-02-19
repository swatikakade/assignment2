import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { User } from './_models/user';
import { UserService } from './_services/user.service';
import { ThemeService } from "src/app/_theme/theme.service";
import { Store } from '@ngrx/store';
import { AppState } from './_store/app.state';
import { logout } from './_store/actions/users.actions';

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
  user: User;
  constructor(private router: Router, private userService: UserService, private themeService: ThemeService, private store: Store<AppState>) {}

  ngOnInit(){
    // this.userService.user.subscribe(x => this.user = x);
    // this.currentUser = sessionStorage.getItem("currentUser")?JSON.parse(sessionStorage.getItem("currentUser")):null;
  }

  get isLoggedIn() { return this.userService.isAuthorized(); }

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
  }

  onLogout(event: Event) {
    this.store.dispatch(logout());
  }
}