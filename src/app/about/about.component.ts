import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceshipAnimationComponent } from '../spaceship-animation/spaceship-animation.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SpaceshipAnimationComponent, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}

