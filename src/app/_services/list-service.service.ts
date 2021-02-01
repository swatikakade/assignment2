import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  constructor(private httpClient: HttpClient) { }

  linkArray : any = [];

  getLinkData()
  {
    return this.httpClient.get<any[]>("/links");
  }
}
