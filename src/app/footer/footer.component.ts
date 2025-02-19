import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  /**
  * TODO: Evitar spam correo
  */
  public email: string = '';

  ngOnInit() {
    const user: string = "portelnom0308";
    const domain: string = "gmail.com";
    this.email = `mailto:${user}@${domain}`;
  }
  
}
