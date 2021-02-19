import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Link } from '../_models/link';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private baseURL: string;

  constructor(public http: HttpClient) {
    this.baseURL = "http://localhost:3000";
  }

  getlinks(): Observable<Link[]> {
    return this.http.get<Link[]>(`${this.baseURL}/links`);
  }

  getLink(id: string): Observable<Link> {
    return this.http.get<Link>(`${this.baseURL}/links/${id}`)
    .pipe(map(data => { return data; }));
  }

  createLink(model: Link): Observable<Link> {
    return this.http.post<Link>(`${this.baseURL}/links`, model);
  }

  updateLink(id: string | number, update: Partial<Link>): Observable<Link> {
    return this.http.put<Link>(`${this.baseURL}/links/${id}`, update);
  }

  deleteLink(id: any) {
    return this.http.delete(`${this.baseURL}/links/${id}`);
  }
}
