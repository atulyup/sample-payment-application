import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  url: String = "http://localhost:8080";
  private data = new BehaviorSubject(false);
  currentData = this.data.asObservable();

  constructor(private http: HttpClient) { }

  sendLoginRequest(username: String, pwd: String) {
    const body = {
      'username': username,
      'password': pwd
    }
    const httpHeader = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.post(this.url + "/login", body);
  }

  addUser(username: String, pwd: String) {
    const body = {
      'username': username,
      'password': pwd
    }
    const httpHeader = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.post(this.url + "/addUser", body, { responseType: 'text' });
  }

  setData(data: boolean) {
    this.data.next(data);
  }
}
