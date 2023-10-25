import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Item } from '../interface/item';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  private endpoint: string = 'http://localhost:3000/items';
  
  getItems(): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}`);
  } 
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/categories`);
  }
  create(item: Item): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/create`, item);
  }
}
