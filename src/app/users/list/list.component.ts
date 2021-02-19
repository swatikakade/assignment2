import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromUserActions from '../../_store/actions/users.actions';
import { selectedUsers } from "../../_store/selectors/users.selectors";
import { UserState } from "../../_store/reducers/users.reducers";
import { User } from 'src/app/_models/user';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  errorMessage="";
  @Input() users: User[] =[];
  users$: Observable<User[]>
  @Input() showActions:boolean;


  constructor(private userService: UserService, private router:Router, private store: Store) {
    // this.users = store.pipe(select('users'));
    // console.log(this.users);
  }

  ngOnInit(): void {
    this.store.dispatch(fromUserActions.loadUsers());
    this.loadUsers();
  }

  loadUsers(){
    this.store.select(selectedUsers).subscribe(data=>{
      this.users = data;
    })
    this.users$ = this.store.pipe(select(selectedUsers));
  }

  confirmDeleteUser(id){
    if(confirm("Are you sure you want to delete user?")) {
      this.store.dispatch(fromUserActions.deleteUser({ id }));
      this.loadUsers();
    }
  }

}
