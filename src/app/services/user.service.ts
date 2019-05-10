import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User) {
    console.log(user)
    return this.http.post(`/api/users/register`, user);
  }

  registerSeller(user: User) {
    console.log(user)
    return this.http.post(`/api/users/register-seller`, user);
  }

  getAsset(): Observable<any[]> {
    return this.http.get<any[]>(`/api/users/current-assets`);
  }

  buyCoin(amount: number) {
    console.log(amount)
    return this.http.post(`/api/users/buy-coin`, { amount });
  }
}
