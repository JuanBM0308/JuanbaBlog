import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '@app/services/contact.service';
import { ContactMessage } from '@app/models/contact-message.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  message: ContactMessage = {
    user_name: '',
    email: '',
    message: ''
  };

  constructor(private contactService: ContactService) {}

  async onSubmit() {
    if (!this.message.user_name || !this.message.email || !this.message.message) {
      console.warn('Todos los campos son obligatorios');
      return;
    }

    try {
      await this.contactService.saveMessage(this.message);
      alert('Mensaje enviado con éxito');
      this.message = { user_name: '', email: '', message: '' }; // Resetear formulario
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  }

}
