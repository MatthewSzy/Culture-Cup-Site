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

  getAll(): Observable<any> {
    return this.http.get(MOVIE_API + 'get/all', httpOptions);
  }

  getAllTitles(): Observable<any> {
    return this.http.get(MOVIE_API + 'get/all/titles', httpOptions);
  }

  getMovie(id: string): Observable<any> {
    return this.http.get(MOVIE_API + `get/movie/${id}`, httpOptions);
  }

  getFourBestRatingMovie(): Observable<any> {
    return this.http.get(MOVIE_API + 'get/fourBestRating', httpOptions);
  }

  getFourLastAddingMovie(): Observable<any> {
    return this.http.get(MOVIE_API + 'get/fourLastAdding', httpOptions);
  }

  getMovieWatchInfo(userId: string, movieId: string): Observable<any> {
    return this.http.post(MOVIE_API + 'get/wasWatched', {
      userId,
      movieId
    }, httpOptions);
  }

  getAllMovieToWatch(id: string): Observable<any> {
    return this.http.get(MOVIE_API + `get/all/toWatch/${id}`, httpOptions);
  }

  getAllMovieWatched(id: string): Observable<any> {
    return this.http.get(MOVIE_API + `get/all/watched/${id}`, httpOptions);
  }
  
  addMovie(directorId: string, title: string, description: string, releaseDate: string, length: number, categories: string[]): Observable<any> {
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

  addMovieToWatch(userId: string, movieId: string): Observable<any> {
    return this.http.put(MOVIE_API + 'add/movie/towatch', {
      userId,
      movieId
    }, httpOptions);
  }

  addMovieWatched(userId: string, movieId: string, movieRating: number) {
    return this.http.put(MOVIE_API + 'add/movie/watched', {
      userId,
      movieId,
      movieRating
    }, httpOptions);
  }
}