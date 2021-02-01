import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Link } from '../_models/link';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private linkSubject: BehaviorSubject<Link>;
  public link: Observable<Link>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  public get linkValue(): Link {
      return this.linkSubject.value;
  }

  getById(id: string) {
      return this.http.get<Link>(`http://localhost:3000/links/${id}`);
  }

  getAll() {
      return this.http.get<Link[]>(`http://localhost:3000/links`);
  }

  add(link: Link) {
      return this.http.post(`http://localhost:3000/links`, link);
  }

  update(id, params) {
      return this.http.put(`http://localhost:3000/links/${id}`, params);
  }

  delete(id: string) {
      return this.http.delete(`http://localhost:3000/links/${id}`);
  }
}
