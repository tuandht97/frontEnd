import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(public http: HttpClient) { }

  getStockByCode(code: string): Observable<Stock> {
    return this.http.get<Stock>(`/api/stocks/` + code);
  }

  getAll(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`/api/stocks`);
  }

  create(estateId: string) {
    return this.http.post(`/api/stocks/create`, { estateId });
  }
}
