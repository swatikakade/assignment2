import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users: any;
  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      this.router.navigate(['/users/login']);
  }

}
