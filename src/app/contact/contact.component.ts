import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '@app/services/contact.service';
import { ContactMessage } from '@app/models/contact-message.model';

import Swal from 'sweetalert2'; // ! Alertas personalizadas

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
      this.showCustomAlert('success');
      this.message = { user_name: '', email: '', message: '' }; // Resetear formulario
    } catch (error) {
      this.showCustomAlert('error');
      console.error('Error al enviar mensaje:', error);
    }
  }

  /**
  * TODO: Alerts
  */
  showCustomAlert(type: 'success' | 'error') {
    Swal.fire({
      title: type === 'success' ? '¡Éxito!' : 'Error',
      text: type === 'success' 
        ? 'Mensaje enviado con éxito. 🤗' 
        : 'Opps, ocurrió un error, intenta de nuevo. 😣',
      background: '#1a1a1a',
      color: '#fff',
      icon: type,
      iconColor: type === 'success' ? '#007bff' : '#ff3333',
      confirmButtonText: 'OK',
      confirmButtonColor: '#007bff',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        confirmButton: 'custom-swal-button'
      }
    });
  }

}
