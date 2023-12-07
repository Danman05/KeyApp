import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Item } from '../interface/item';
import { ItemFull } from '../interface/item-full';
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
  getUsersItem(userId: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/userItem`, { params: { userId } });
  }
  getUserKeys(userId: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/userKey`, { params: { userId } })
  }
  reservation(startDate: Date, expirationDate: Date, itemId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/reservation`, { startDate, expirationDate, itemId, userId });
  }
  editItem(item: ItemFull, categoryId: number): Observable<any> {
    return this.http.put<any>(`${this.endpoint}/edit`, { item: item, categoryId: categoryId },);
  }
  deleteItem(itemId: number): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/delete/${itemId}`);
  }
}
