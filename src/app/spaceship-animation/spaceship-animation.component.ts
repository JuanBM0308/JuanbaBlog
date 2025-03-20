import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-spaceship-animation',
  standalone: true,
  imports: [],
  templateUrl: './spaceship-animation.component.html',
  styleUrls: ['./spaceship-animation.component.css']
})
export class SpaceshipAnimationComponent implements OnInit {
  text: string = "The adventure begins";
  index: number = 0;
  speed: number = 100;

  private audio: HTMLAudioElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.audio = new Audio('assets/sounds/start-adventure.mp3');
  }

  ngOnInit(): void {
    this.typeWriter();
    this.createStars(400);
    this.startShootingStars();
  }


  /**
  * ? Animación de escritura
  */
  private typeWriter(): void {
    const titleElement = this.el.nativeElement.querySelector("#titleMessage");
    if (!titleElement) return;

    const interval = setInterval(() => {
      if (this.index < this.text.length) {
        titleElement.textContent = this.text.substring(0, this.index + 1);
        this.index++;
      }
    }, this.speed);
  }

  /**
  * ? Animación de estrellas  
  */
  private createStars(count: number): void {
    const starsContainer = this.el.nativeElement.querySelector("#stars");

    for (let i = 0; i < count; i++) {
      const star = this.renderer.createElement("div");
      this.renderer.addClass(star, "star");

      const sizeClass = Math.random() > 0.7 ? "large" : Math.random() > 0.4 ? "small" : "";
      if (sizeClass) this.renderer.addClass(star, sizeClass);

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      this.renderer.setStyle(star, "left", `${x}px`);
      this.renderer.setStyle(star, "top", `${y}px`);

      const duration = (Math.random() * 2 + 1).toFixed(2);
      this.renderer.setStyle(star, "animation-duration", `${duration}s`);

      this.renderer.appendChild(starsContainer, star);
    }
  }

  /**
  * ? Animacion de esrellas fugaces 
  */
  private startShootingStars(): void {
    setInterval(() => this.createShootingStar(), Math.random() * 5000 + 1000);
  }

  private createShootingStar(): void {
    const starsContainer = this.el.nativeElement.querySelector("#stars");
    const shootingStar = this.renderer.createElement("div");

    this.renderer.addClass(shootingStar, "shooting-star");

    const startX = Math.random() * window.innerWidth * 0.8;
    const startY = Math.random() * window.innerHeight * 0.5;
    
    this.renderer.setStyle(shootingStar, "left", `${startX}px`);
    this.renderer.setStyle(shootingStar, "top", `${startY}px`);

    this.renderer.appendChild(starsContainer, shootingStar);

    setTimeout(() => {
      this.renderer.removeChild(starsContainer, shootingStar);
    }, 2000);
  }

  /**
  * ? Scroll hacia #containerAbout y reproducir sonido
  */
  actionsPress(event: Event): void {
    event.preventDefault(); 
    const section = document.getElementById('containerAbout');

    if (section) {
      this.audio.currentTime = 0;
      this.audio.play()
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
