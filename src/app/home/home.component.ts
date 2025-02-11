import { Component, ElementRef, Renderer2 } from '@angular/core';
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
    const menu = this.el.nativeElement.querySelector('#containerLinks');

    if (!this.menuOpen) {
      // Cerrar el menú con la animación de subida
      this.renderer.removeClass(menu, 'show-menu');
      this.renderer.addClass(menu, 'hide-menu');

      // Esperar que termine la animación antes de ocultar el menú
      setTimeout(() => {
        this.renderer.setStyle(menu, 'display', 'none');
      }, 300); // Ajusta este tiempo si la animación dura más

    } else {
      // Mostrar el menú con la animación de caída
      this.renderer.setStyle(menu, 'display', 'flex');
      this.renderer.removeClass(menu, 'hide-menu');
      this.renderer.addClass(menu, 'show-menu');
    }

    // Cambiar el estado del menú
    this.menuOpen = !this.menuOpen;
  }
}
