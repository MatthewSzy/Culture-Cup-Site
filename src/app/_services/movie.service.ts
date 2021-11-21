import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const MOVIE_API = 'https://culture-cup.herokuapp.com/movie/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  getMovie(id: string): Observable<any> {
    return this.http.get(MOVIE_API + `get/${id}`, httpOptions);
  }

  getAllMovies(page: string): Observable<any> {
    return this.http.get(MOVIE_API + `get/all/${page}`, httpOptions);
  }

  getPopularMovies(page: string): Observable<any> {
    return this.http.get(MOVIE_API + `get/popular/${page}`, httpOptions);
  }

  getTopMovies(page: string): Observable<any> {
    return this.http.get(MOVIE_API + `get/top/${page}`, httpOptions);
  }

  getUpcomingMovies(page: string): Observable<any> {
    return this.http.get(MOVIE_API + `get/upcoming/${page}`, httpOptions);
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(MOVIE_API + `search/${query}`, httpOptions);
  }

  getHomeTop(): Observable<any> {
    return this.http.get(MOVIE_API + 'get/home/top', httpOptions);
  }

  getHomePopular(): Observable<any> {
    return this.http.get(MOVIE_API + 'get/home/popular', httpOptions);
  }
}