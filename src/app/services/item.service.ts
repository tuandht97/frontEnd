import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Item } from '../models/item';
import { HttpClient } from '@angular/common/http';

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

  getById(id: string): Observable<Item> {
    return this.http.get<Item>(`/api/items/` + id);
  }

  create(item: Item) {
    console.log(item)
    return this.http.post(`/api/items/create`, item);
  }
}
