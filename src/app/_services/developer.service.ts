import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const DEVELOPER_API = 'http://localhost:8080/developers/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(DEVELOPER_API + 'get/all', httpOptions);
  }

  addDeveloper(developerName: string, headquartersCity: string, headquartersCountry: string, foundationYear: string): Observable<any> {
    return this.http.post(DEVELOPER_API + 'add', {
      developerName,
      headquartersCity,
      headquartersCountry,
      foundationYear
    }, httpOptions);
  }
}