import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  private audio: HTMLAudioElement;

  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router) {
    this.audio = new Audio('assets/sounds/soundClickRetroCoin.mp3');
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
  * TODO: Reprodución de sonido navbar con navegación
  */
  playSound(event: Event, path: string): void {
    event.preventDefault(); 

    this.audio.currentTime = 0; 
    this.audio.play()
      .then(() => {
        setTimeout(() => {
          this.router.navigateByUrl(path);
        }, 150);
      })
      .catch(error => {
        this.router.navigateByUrl(path);
      });
  }
}
