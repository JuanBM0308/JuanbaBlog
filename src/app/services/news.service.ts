import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = environment.newsApiKey;
  private baseUrl = 'https://newsapi.org/v2/everything';
  private cacheKey = 'newsData';
  private cacheTimeKey = 'newsCacheTime';
  private cacheDuration = 10 * 60 * 1000;

  constructor(private http: HttpClient) {}

  getNews(query: string, pageSize: number = 4): Observable<any> {
    const cachedNews = localStorage.getItem(this.cacheKey);
    const cachedTime = localStorage.getItem(this.cacheTimeKey);

    if (cachedNews && cachedTime && Date.now() - Number(cachedTime) < this.cacheDuration) {
      return of(JSON.parse(cachedNews));
    }

    const url = `${this.baseUrl}?q=${query}&pageSize=${pageSize}&apiKey=${this.apiKey}`;
    return this.http.get(url).pipe(
      tap(data => {
        localStorage.setItem(this.cacheKey, JSON.stringify(data));
        localStorage.setItem(this.cacheTimeKey, Date.now().toString());
      })
    );
  }
}
