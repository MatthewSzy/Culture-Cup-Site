import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const ADMIN_API = 'http://localhost:8080/admin/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(ADMIN_API + 'listofusers', httpOptions);
  }

  setAdminRole(id: string): Observable<any> {
    return this.http.get(ADMIN_API + `addadmin/${id}`, httpOptions)
  }

  deleteAdminRole(id: string): Observable<any> {
    return this.http.get(ADMIN_API + `deleteadmin/${id}`, httpOptions)
  }
}