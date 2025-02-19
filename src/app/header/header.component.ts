import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  /**
  * TODO: Navbar
  */
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
}
