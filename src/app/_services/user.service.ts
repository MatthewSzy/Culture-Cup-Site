import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const USER_API = 'https://culture-cup.herokuapp.com/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(USER_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  registration(username: string, email: string, password: string, roles: string[]): Observable<any> {
    return this.http.post(USER_API + 'registration', {
      username,
      email,
      password,
      roles
    }, httpOptions);
  }

  auth(username: string, password: string): Observable<any> {
    return this.http.post(USER_API + `auth`, {
      username,
      password
    }, httpOptions);
  }

  update(userId: string, username: string, firstname: string, lastname: string, email: string, password: string): Observable<any> {
    return this.http.put(USER_API + 'update', {
      userId,
      username,
      firstname,
      lastname,
      email,
      password
    }, httpOptions);
  }

  uploadImage(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file, file.name);

    return this.http.put(USER_API + `upload/${id}`, formData);
  }

  getImage(id: string): Observable<any> {
    return this.http.get(USER_API + `get/image/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(USER_API + `delete/${id}`)
  }

  getUsers(): Observable<any> {
    return this.http.get(USER_API + 'get/usersList', httpOptions);
  }

  setAdminRole(id: string): Observable<any> {
    return this.http.get(USER_API + `add/admin/${id}`, httpOptions)
  }

  deleteAdminRole(id: string): Observable<any> {
    return this.http.get(USER_API + `delete/admin/${id}`, httpOptions)
  }

  addMovieToWatch(userId: string, movieId: string): Observable<any> {
    return this.http.put(USER_API + 'add/toWatch', {
      userId,
      movieId
    }, httpOptions);
  }

  addMovieWatched(userId: string, movieId: string, movieRating: number): Observable<any> {
    return this.http.put(USER_API + 'add/watched', {
      userId,
      movieId,
      movieRating
    }, httpOptions);
  }

  addMovieToFavorite(userId: string, movieId: string, movieRating: number): Observable<any> {
    return this.http.put(USER_API + 'add/favoriteMovie', {
      userId,
      movieId,
      movieRating
    }, httpOptions);
  }

  getMovieWatchInfo(userId: string, movieId: string): Observable<any> {
    return this.http.post(USER_API + 'get/movieInfo', {
      userId,
      movieId
    }, httpOptions);
  }

  getMoviesToWatch(id: string): Observable<any> {
    return this.http.get(USER_API + `get/toWatch/${id}`, httpOptions);
  }

  getMoviesWatched(id: string): Observable<any> {
    return this.http.get(USER_API + `get/watched/${id}`, httpOptions);
  }

  getMoviesFavorite(id: string): Observable<any> {
    return this.http.get(USER_API + `get/favoriteMovie/${id}`, httpOptions);
  }

  addGameToPlay(userId: string, gameId: string): Observable<any> {
    return this.http.put(USER_API + 'add/toPlay', {
      userId,
      gameId
    }, httpOptions);
  }

  addGamePlayed(userId: string, gameId: string, gameRating: number): Observable<any> {
    return this.http.put(USER_API + 'add/played', {
      userId,
      gameId,
      gameRating
    }, httpOptions);
  }

  addGameToFavorite(userId: string, gameId: string, gameRating: number): Observable<any> {
    return this.http.put(USER_API + 'add/favoriteGame', {
      userId,
      gameId,
      gameRating
    }, httpOptions);
  }

  getGamePlayInfo(userId: string, gameId: string): Observable<any> {
    return this.http.post(USER_API + 'get/gameInfo', {
      userId,
      gameId
    }, httpOptions);
  }

  getGamesToPlay(id: string): Observable<any> {
    return this.http.get(USER_API + `get/toPlay/${id}`, httpOptions);
  }

  getGamesPlayed(id: string): Observable<any> {
    return this.http.get(USER_API + `get/played/${id}`, httpOptions);
  }

  getGamesFavorite(id: string): Observable<any> {
    return this.http.get(USER_API + `get/favoriteGame/${id}`, httpOptions);
  }
}