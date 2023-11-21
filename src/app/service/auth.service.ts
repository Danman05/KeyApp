import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class authService {

  constructor(private http: HttpClient) { }
  loggedInUser: User
  private endpoint: string = "http://localhost:3000/user";

  logIn(mail:string, password: string): Observable<any> {
    return this.http.get<User>(`${this.endpoint}/auth`, {params: {mail, password} });
  }

  register(registerInfo: NgForm) {
    return this.http.post<User>(`${this.endpoint}/new`, { params: registerInfo.value});
  }
}
