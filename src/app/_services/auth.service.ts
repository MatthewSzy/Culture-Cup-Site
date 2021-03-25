import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  registration(username: string, email: string, password: string, role: string[]): Observable<any> {
    return this.http.post(AUTH_API + 'registration', {
      username,
      email,
      password,
      role
    }, httpOptions);
  }

  update(id: string, username: string, email: string): Observable<any> {
    return this.http.put(AUTH_API + `update/${id}`, {
      username,
      email
    }, httpOptions);
  }

  delete(username: string, password: string) {

  }
}
