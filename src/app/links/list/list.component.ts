import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LinkService } from 'src/app/_services/link.service';
import { Link } from '../../_models/link';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromLinkActions from "../../_store/actions/links.actions";
import { selectedLinks } from "../../_store/selectors/links.selector";
import { LinkState } from "../../_store/reducers/links.reducers";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  errorMessage="";
  @Input() links: Link[] =[];
  links$: Observable<Link[]>
  @Input() showActions:boolean;

  constructor(private httpClient: HttpClient, private linkService: LinkService, private store: Store<LinkState>) {}

  ngOnInit(): void {
    this.store.dispatch(fromLinkActions.loadLinks());
    this.loadLinks();
  }

  loadLinks(){
    this.store.select(selectedLinks).subscribe(data=>{
      this.links = data;
    })
    this.links$ = this.store.pipe(select(selectedLinks));
  }

  confirmDeleteLink(id){
    if(confirm("Are you sure you want to delete link?")) {
      this.store.dispatch(fromLinkActions.deleteLink({ id }));
      this.loadLinks();
    }
  }
}
