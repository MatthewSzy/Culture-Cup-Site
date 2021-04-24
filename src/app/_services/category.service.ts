import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const CATEGORY_API = 'http://localhost:8080/categories/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(CATEGORY_API + 'get/all', httpOptions);
  }

}