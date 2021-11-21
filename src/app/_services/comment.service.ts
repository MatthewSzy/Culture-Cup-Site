import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const COMMENT_API = 'https://culture-cup.herokuapp.com/comment/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) { }


  addComment(movieId: string, gameId: string, userId: string, info: string): Observable<any> {
      return this.http.post(COMMENT_API + 'add', {
          movieId,
          gameId,
          userId,
          info
      }, httpOptions);
  }

  editComment(commentId: string, info: string): Observable<any> {
      return this.http.put(COMMENT_API + 'edit', {
          commentId,
          info
      }, httpOptions);
  }

  deleteComment(id: string): Observable<any> {
    return this.http.delete(COMMENT_API + `delete/${id}`);
  }

  getComments(movieId: string, gameId: string): Observable<any> {
      return this.http.post(COMMENT_API + 'get', {
          movieId,
          gameId
      }, httpOptions);
  }

  addLike(commentId: string, userId: string): Observable<any> {
      return this.http.put(COMMENT_API + 'like', {
          commentId,
          userId
      }, httpOptions);
  }

  addUnlike(commentId: string, userId: string): Observable<any> {
    return this.http.put(COMMENT_API + 'unlike', {
        commentId,
        userId
    }, httpOptions);
}
}