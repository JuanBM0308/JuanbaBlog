import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParticleEffectComponent } from './particle-effect/particle-effect.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ParticleEffectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'juanbablog';
}
