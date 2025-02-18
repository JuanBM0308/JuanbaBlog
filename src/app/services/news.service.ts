import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  getNews(body: any) {
    const url = 'https://newsapi.org/v2/everything?q=software+technology+news&pageSize=10&apiKey=e7806fcc0cf242829958d231236a6661';
  }
}
