import { Component, HostListener, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-particle-effect',
  standalone: true,
  templateUrl: './particle-effect.component.html',
  styleUrls: ['./particle-effect.component.css']
})
export class ParticleEffectComponent {
  @ViewChild('particleContainer', { static: false }) particleContainer!: ElementRef<HTMLDivElement>;

  constructor(private renderer: Renderer2) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.particleContainer) {
      this.createParticle(event.clientX, event.clientY);
    }
  }

  createParticle(x: number, y: number): void {
    const particle = this.renderer.createElement('div');
    this.renderer.addClass(particle, 'particle');
    this.renderer.setStyle(particle, 'left', `${x}px`);
    this.renderer.setStyle(particle, 'top', `${y}px`);
    this.renderer.appendChild(this.particleContainer.nativeElement, particle);

    particle.addEventListener('animationend', () => {
      this.renderer.removeChild(this.particleContainer.nativeElement, particle);
    });
  }
}
