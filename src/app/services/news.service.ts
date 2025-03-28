import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private jsonUrl = 'assets/json/news.json';

  constructor(private http: HttpClient) {}

  getNews(): Observable<any> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(response => {
        const articles = response.articles || [];
        return this.getRandomArticles(articles, 4);
      })
    );
  }

  private getRandomArticles(articles: any[], count: number): any[] {
    return articles.sort(() => Math.random() - 0.5).slice(0, count);
  }
}
