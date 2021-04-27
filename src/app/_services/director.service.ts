import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const DIRECTOR_API = 'http://localhost:8080/directors/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(DIRECTOR_API + 'get/all', httpOptions);
  }

  addDirector(firstName: string, lastName: string, nationality: string): Observable<any> {
    return this.http.post(DIRECTOR_API + 'add', {
      firstName,
      lastName,
      nationality
    }, httpOptions);
  }
}