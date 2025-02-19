import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NewsService]
})
export class HomeComponent {

  constructor(private newsService: NewsService) {}

  /** 
  * TODO: Consumo de newsAPI
  */
  news: any[] = [];

  ngOnInit() {
    this.loadNews();
  }

  loadNews () {
    this.newsService.getNews('software+technology+news', 12).subscribe({
      next: (response: any) => {
        this.news = response.articles;
        console.log(this.news);
      },
      error: (error) => {
        console.error('Error loading news:', error);
      }
    });
  }


  /**
  * TODO: Mantener color like/love
  */
  holdColor(index: number): void {
    this.news[index].liked = !this.news[index].liked;
  }

}
