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
      }); // Ajusta el tiempo según la animación
    }
  }
  
  /**
  * TODO: Reprodución de sonido navbar
  */
  playSound(): void {
    let audio = new Audio('../../assets/soundClickRetroCoin.mp3');
    audio.preload = 'auto'; 
    audio.play().catch(error => console.log("Error al reproducir el sonido:", error));
  }  

}
