import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from './article.model';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articles: Article[] = [];

  constructor(private http: HttpClient) { }

  fetchArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(API_URL).pipe(
      map((data: Article[]) => {
        this.articles = data;
        return this.articles;
      })
    );
  }

  getArticles(): Observable<Article[]> {
    if (this.articles.length > 0) {
      return of(this.articles);
    } else {
      return this.fetchArticles();
    }
  }

  getArticle(id: number): Observable<Article> {
    const article = this.articles.find(article => article.id === id);
    if (article) {
      return of(article);
    } else {
      return this.http.get<Article>(`${API_URL}/${id}`).pipe(
        map(data => {
          if (data) {
            this.articles.push(data);
          }
          return data;
        })
      );
    }
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(API_URL, article).pipe(
      map(newArticle => {
        if (newArticle) {
          this.articles.push(newArticle);
        }
        return newArticle;
      })
    );
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${API_URL}/${id}`, article).pipe(
      map(updatedArticle => {
        const index = this.articles.findIndex(article => article.id === id);
        if (index !== -1) {
          this.articles[index] = updatedArticle;
        }
        return updatedArticle;
      })
    );
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`).pipe(
      map(() => {
        this.articles = this.articles.filter(article => article.id !== id);
      })
    );
  }
}
