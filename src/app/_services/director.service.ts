import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const DIRECTOR_API = 'http://localhost:8080/directors/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  constructor(private http: HttpClient) { }

  addDirector(firstName: string, secondName: string, nationality: string) {
    return this.http.post(DIRECTOR_API + 'add', {
      firstName,
      secondName,
      nationality
    }, httpOptions);
  }
}