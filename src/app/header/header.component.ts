import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  /**
  * TODO: Cambia navbar normal a hamburguesa
  */
  menuOpen: boolean = false;
  private audio: HTMLAudioElement;

  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router) {
    this.audio = new Audio('assets/sounds/sound-click-retro-coin.mp3');
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    const menu = this.el.nativeElement.querySelector('#containerLinks');
  
    if (this.menuOpen) {
      this.renderer.setStyle(menu, 'display', 'flex');
      this.renderer.addClass(menu, 'show-menu');
      this.renderer.removeClass(menu, 'hide-menu');
      document.body.classList.add('no-scroll');
    } else {
      this.renderer.addClass(menu, 'hide-menu');
      this.renderer.removeClass(menu, 'show-menu');

      setTimeout(() => {
        this.renderer.setStyle(menu, 'display', 'none');
      }); // Ajusta el tiempo segun la animación

      document.body.classList.remove('no-scroll');
    }
  }
  
  /**
  * TODO: Prepara funciones para evento click
  */
  actions(event: Event, path: string): void {
    event.preventDefault(); 
    this.playClickSound()
      .then(() => this.navigate(path))
      .catch(() => this.navigate(path));
  }
  
  /**
  * TODO: Reproduce sonido coin navegacion
  */
  private playClickSound(): Promise<void> {
    this.audio.currentTime = 0;
    return this.audio.play();
  }
  
  /**
  * TODO: Navega dentro de los diferentes componenetes
  */
  private navigate(path: string): void {
    setTimeout(() => {
      this.router.navigateByUrl(path);
      this.closeMenu();
    }, 150);
  }
  
  /**
  * TODO: Cierra el menu hamburguesa
  */
  private closeMenu(): void {
    this.menuOpen = false;
    const menu = this.el.nativeElement.querySelector('#containerLinks');
  
    this.renderer.addClass(menu, 'hide-menu');
    this.renderer.removeClass(menu, 'show-menu');
  
    setTimeout(() => {
      this.renderer.setStyle(menu, 'display', 'none');
    });
  
    document.body.classList.remove('no-scroll');
  }  
  
}
