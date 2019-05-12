import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(public http: HttpClient) { }

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`/api/transactions`);
  }

  create(idItem: string, amount: number) {
    return this.http.post(`/api/transactions/create`, { idItem, amount });
  }
}

