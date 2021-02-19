import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LinkService } from 'src/app/_services/link.service';

@Component({
  selector: 'app-mylinks',
  templateUrl: './mylinks.component.html',
  styleUrls: ['./mylinks.component.css']
})
export class MylinksComponent implements OnInit {
  linkArray : any = [];
  currentUser: any;
  currentUserId: any; 
  constructor(private httpClient: HttpClient, private linkService: LinkService) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem("currentUser")?JSON.parse(localStorage.getItem("currentUser")):null;
    this.currentUserId = this.currentUser.id;
    this.getDataList();
  }

  getDataList(){
    this.httpClient.get("http://localhost:3000/links?user_id="+this.currentUserId).subscribe(data =>{
      this.linkArray = data;
    });
  }

  confirmDeleteLink(id){
    if(confirm("Are you sure to delete link?")) {
      this.linkService.deleteLink(id).subscribe((result) => {
        console.log(result);
        this.getDataList();
      }, (error) => {
        console.log(error);
      });
    }
  }

}
