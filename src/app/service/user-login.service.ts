import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private http: HttpClient) { }
  loggedInUser: User
  private endpoint: string = "http://localhost:3000/user";

  logIn(mail:string, password: string): Observable<any> {
    return this.http.get<User>(`${this.endpoint}/auth`, {params: {mail, password} });
  }
}
