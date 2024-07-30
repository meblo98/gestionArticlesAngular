import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(): Observable<any> {
    return this.http.get(API_URL);
  }

  getArticle(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`);
  }

  createArticle(article: any): Observable<any> {
    return this.http.post(API_URL, article);
  }

  updateArticle(id: number, article: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, article);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
