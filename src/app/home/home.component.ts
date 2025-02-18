import { Component, ElementRef, Renderer2, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  menuOpen: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    const menu = this.el.nativeElement.querySelector('#containerLinks');
  
    if (this.menuOpen) {
      // Mostrar el menú
      this.renderer.setStyle(menu, 'display', 'flex');
      this.renderer.addClass(menu, 'show-menu');
      this.renderer.removeClass(menu, 'hide-menu');
    } else {
      // Ocultar el menú con una animación de cierre
      this.renderer.addClass(menu, 'hide-menu');
      this.renderer.removeClass(menu, 'show-menu');
  
      setTimeout(() => {
        this.renderer.setStyle(menu, 'display', 'none');
      }); // Ajusta el tiempo segun la animación
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
  * TODO: Mantener color like/love
  */
  holdColor(): void {
    const heartIcon = document.getElementById('heart-icon');

    if (heartIcon?.classList.contains("liked")) {
        heartIcon.classList.remove("liked");
    } else {
        heartIcon?.classList.add("liked");
    }
  }

  /**
  * TODO: Evitar spam correo
  */
  public email: string = '';

  ngOnInit(): void {
    const user: string = "portelnom0308";
    const domain: string = "gmail.com";
    this.email = `mailto:${user}@${domain}`;
  }
}
