import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from './article.model';

const API_URL = 'https://jsonplaceholder.typicode.com/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${API_URL}?postId=${postId}`);
  }
}
