import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

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

}
