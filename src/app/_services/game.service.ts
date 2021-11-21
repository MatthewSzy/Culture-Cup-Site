import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const GAME_API = 'https://culture-cup.herokuapp.com/game/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient) { }

  getGame(id: string): Observable<any> {
    return this.http.get(GAME_API + `get/${id}`, httpOptions);
  }

  getAllGames(page: string): Observable<any> {
    return this.http.get(GAME_API + `get/all/${page}`, httpOptions);
  }

  getTopGames(page: string): Observable<any> {
    return this.http.get(GAME_API + `get/top/${page}`, httpOptions);
  }

  getUpcomingGames(page: string): Observable<any> {
    return this.http.get(GAME_API + `get/upcoming/${page}`, httpOptions);
  }

  searchGames(query: string): Observable<any> {
    return this.http.get(GAME_API + `search/${query}`, httpOptions);
  }

  getHomeTop(): Observable<any> {
    return this.http.get(GAME_API + 'get/home/top', httpOptions);
  }

  getHomePopular(): Observable<any> {
    return this.http.get(GAME_API + 'get/home/popular', httpOptions);
  }
}