import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const CREDITS_API = 'https://culture-cup.herokuapp.com/credit/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CreditsService {
  constructor(private http: HttpClient) { }
    
  getCast(id: string): Observable<any> {
    return this.http.get(CREDITS_API + `get/cast/${id}`, httpOptions);
  }

  getCrew(id: string): Observable<any> {
    return this.http.get(CREDITS_API + `get/crew/${id}`, httpOptions);
  }
}