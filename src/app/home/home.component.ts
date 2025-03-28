import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../services/news.service';
import { supabase } from '@app/services/supabase.service';
import MD5 from 'crypto-js/md5';

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

  /**
  * TODO: Inicializar carga de noticias 
  */
  ngOnInit() {
    this.loadNews();
  }

  loadNews(forceUpdate: boolean = false) {
    const storedNews = localStorage.getItem('cachedNews');
    const storedTimestamp = localStorage.getItem('newsTimestamp');
    const tenMinutes = 10 * 60 * 1000; // 10 minutos en milisegundos
  
    if (!forceUpdate && storedNews && storedTimestamp) {
      const elapsedTime = Date.now() - Number(storedTimestamp);
      if (elapsedTime < tenMinutes) {
        this.news = JSON.parse(storedNews);
        return;
      }
    }
  
    this.newsService.getNews().subscribe({
      next: async (articles: any[]) => {
        this.news = articles; // 4 noticias aleatorias
  
        // Guardar nuevas noticias en localStorage
        localStorage.setItem('cachedNews', JSON.stringify(this.news));
        localStorage.setItem('newsTimestamp', Date.now().toString());
  
        for (let article of this.news) {
          const articleId = this.generateArticleId(article);
          const { data } = await supabase
            .from('likes')
            .select('count')
            .eq('article_id', String(articleId))
            .single();
          
          article.likes = data?.count || 0;
          article.liked = this.hasLiked(articleId);
          article.id = articleId;
        }
      },
      error: (error) => {
        console.error('Error loading news:', error);
      }
    });
  }
  
  /**
  * TODO: Renovar noticias 
  */
  refreshNews() {
    this.loadNews(true);
  }

  /**
  * TODO: Generar un ID único para cada artículo
  */
  generateArticleId(article: any): string {
    if (article.source?.id) {
      return article.source.id;
    }
    return MD5(article.title).toString(); // Usar MD5 y pasar a string
  }

  /**
  * TODO: Manejar los likes y color en Supabase
  */
  async toggleLike(index: number) {
    const article = this.news[index];
    const articleId = article.id; // Usar el id generado

    if (this.hasLiked(articleId)) {
      console.log('El usuario ya ha dado like.');
      return;
    }

    // Color
    article.liked = true;

    // Contador likes
    article.likes += 1;

    // Guardar en Supabase 
    const { error } = await supabase
      .from('likes')
      .upsert({ article_id: articleId, count: article.likes }, { onConflict: 'article_id' })
      .select();

    if (error) {
      console.error('Error al actualizar el like:', error);
    } else {
      this.saveLike(articleId); // Guardar en localStorage
    }
  }

  /** 
  * TODO: Sesión temporal para no dar mas de un like 
  */
  hasLiked(articleId: string): boolean {
    const likedArticles = JSON.parse(localStorage.getItem('liked_articles') || '[]');
    return likedArticles.includes(articleId);
  }
  
  saveLike(articleId: string) {
    const likedArticles = JSON.parse(localStorage.getItem('liked_articles') || '[]');
    if (!likedArticles.includes(articleId)) {
      likedArticles.push(articleId);
      localStorage.setItem('liked_articles', JSON.stringify(likedArticles));
    }
  }
}
