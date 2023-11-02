import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../interface/item';
import { ItemPreview } from '../interface/item-preview';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }
  
  private endpoint: string = 'http://localhost:3000/items';
  
  getItems(): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}`);
  } 

  getFullItem(itemId: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/${itemId}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}/categories`);
  }
  create(item: Item): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/create`, item);
  }
}
