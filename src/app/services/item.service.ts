import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Item } from '../models/item';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(public http: HttpClient) { }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(`/api/items`);
  }

  getByUser(): Observable<Item[]> {
    return this.http.get<Item[]>(`/api/items/own`);
  }
}
