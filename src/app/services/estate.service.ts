import { Injectable } from '@angular/core';
import { Estate } from '../models/estate';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstateService {

  constructor(public http: HttpClient) { }

  getEstateUser(): Observable<Estate[]> {
    return this.http.get<Estate[]>(`/api/estates/user`);
  }

  getAll(): Observable<Estate[]> {
    return this.http.get<Estate[]>(`/api/estates`);
  }

  create(estate: Estate) {
    return this.http.post(`/api/estates/create`, estate);
  }

  getById(id: string): Observable<Estate> {
    return this.http.get<Estate>(`/api/estates/` + id);
  }

  delete(id: string) {
    return this.http.delete(`/api/estates/` + id);
  }
}
