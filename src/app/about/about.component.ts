import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceshipAnimationComponent } from '../spaceship-animation/spaceship-animation.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    SpaceshipAnimationComponent, 
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
