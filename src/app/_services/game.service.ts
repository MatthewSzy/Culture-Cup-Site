import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const GAME_API = 'http://localhost:8080/games/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(GAME_API + 'get/all', httpOptions);
  }

  getGame(id: string): Observable<any> {
    return this.http.get(GAME_API + `get/game/${id}`, httpOptions);
  }

  getFourBestRatingGame(): Observable<any> {
    return this.http.get(GAME_API + 'get/fourBestRating', httpOptions);
  }

  getFourLastAddingGame(): Observable<any> {
    return this.http.get(GAME_API + 'get/fourLastAdding', httpOptions);
  }

  addGame(developerId: string, title: string, description: string, releaseDate: string, publisher: string, categories: string[]): Observable<any> {
    return this.http.post(GAME_API + 'add/game', {
      developerId,
      title,
      description,
      releaseDate,
      publisher,
      categories
    }, httpOptions);
  }

  addGameImages(id: string, posterImage: File, backgroundImage: File): Observable<any>{
    const formData = new FormData();
    formData.append('images', posterImage, posterImage.name);
    formData.append('images', backgroundImage, backgroundImage.name);

    return this.http.post(GAME_API + `add/images/${id}`, formData);
  }
}