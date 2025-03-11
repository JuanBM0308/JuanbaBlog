import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = environment.newsApiKey;
  private baseUrl = 'https://newsapi.org/v2/everything';

  constructor(private http: HttpClient) { }

  getNews(query: string, pageSize: number = 4) {
    const url = `${this.baseUrl}?q=${query}&pageSize=${pageSize}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
