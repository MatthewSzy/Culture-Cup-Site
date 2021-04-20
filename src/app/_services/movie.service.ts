import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const MOVIE_API = 'http://localhost:8080/movies/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(MOVIE_API + 'get/all', httpOptions);
  }
  
  addMovie(directorId: string, title: string, description: string, releaseDate: string, length: number, categories: string[]) {
    return this.http.post(MOVIE_API + 'add/movie', {
      directorId,
      title,
      description,
      releaseDate,
      length,
      categories
    }, httpOptions);
  }

  addMovieImages(id: string, posterImage: File, backgroundImage: File): Observable<any>{
    const formData = new FormData();
    formData.append('images', posterImage, posterImage.name);
    formData.append('images', backgroundImage, backgroundImage.name);

    return this.http.post(MOVIE_API + `add/images/${id}`, formData);
  }
}