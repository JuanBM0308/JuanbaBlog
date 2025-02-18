import { Component, ElementRef, Renderer2, ViewChild  } from '@angular/core';
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

  /**
  * TODO: Navbar
  */
  menuOpen: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2, private newsService: NewsService) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    const menu = this.el.nativeElement.querySelector('#containerLinks');
  
    if (this.menuOpen) {
      // Mostrar el menú
      this.renderer.setStyle(menu, 'display', 'flex');
      this.renderer.addClass(menu, 'show-menu');
      this.renderer.removeClass(menu, 'hide-menu');
      document.body.classList.add('no-scroll');
    } else {
      // Ocultar el menú con una animación de cierre
      this.renderer.addClass(menu, 'hide-menu');
      this.renderer.removeClass(menu, 'show-menu');
  
      setTimeout(() => {
        this.renderer.setStyle(menu, 'display', 'none');
      }); // Ajusta el tiempo segun la animación

      document.body.classList.remove('no-scroll');
    }
  }
  
  /**
  * TODO: Reprodución de sonido navbar
  */
  playSound(event: Event): void {
    let audio = new Audio('assets/sounds/soundClickRetroCoin.mp3');
    audio.play().catch(error => console.error("Error reproduciendo el sonido:", error));
  }

  /** 
  * TODO: Consumo de newsAPI
  */
  news: any[] = [];

  ngOnInit() {
    const user: string = "portelnom0308";
    const domain: string = "gmail.com";
    this.email = `mailto:${user}@${domain}`;
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

  /**
  * TODO: Evitar spam correo
  * ? Metodo ngOnInit en consumoAPI, esta logica para evitar spam
  */
  public email: string = '';

}
