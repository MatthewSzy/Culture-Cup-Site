import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const USER_API = 'http://localhost:8080/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(USER_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  auth(username: string, password: string): Observable<any> {
    return this.http.post(USER_API + `auth`, {
      username,
      password
    }, httpOptions);
  }

  registration(username: string, email: string, password: string, role: string[]): Observable<any> {
    return this.http.post(USER_API + 'registration', {
      username,
      email,
      password,
      role
    }, httpOptions);
  }

  update(id: string, username: string, email: string, password: string): Observable<any> {
    return this.http.put(USER_API + `update/${id}`, {
      username,
      email,
      password
    }, httpOptions);
  }

  upload(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file, file.name);

    return this.http.put(USER_API + `upload/${id}`, formData);
  }

  getImage(id: string): Observable<any> {
    return this.http.get(USER_API + `getImage/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(USER_API + `delete/${id}`)
  }
}
