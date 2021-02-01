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
  constructor(private httpClient: HttpClient, private linkSerive: LinkService) { }

  ngOnInit(): void {
    this.getDataList();
  }

  getDataList(){
    this.httpClient.get("http://localhost:3000/links?user_id=2").subscribe(data =>{
      this.linkArray = data;
    });
  }

  confirmDeleteLink(id){
    alert(id);
    if(confirm("Are you sure to delete link?")) {
      alert(id);
      this.linkSerive.delete(id).subscribe((result) => {
        console.log(result);
        this.getDataList();
      }, (error) => {
        console.log(error);
      });
    }
  }

}
