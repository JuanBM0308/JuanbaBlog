import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '@app/services/contact.service';
import { ContactMessage } from '@app/models/contact-message.model';

import Swal from 'sweetalert2'; // ! Alertas personalizadas

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactForm = new FormGroup ({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(30)]),
    message: new FormControl('', [Validators.required, Validators.maxLength(500)])
  });

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }

  constructor(private contactService: ContactService) {}

  async onSubmit() {
    if (this.contactForm.invalid) {
       this.contactForm.markAllAsTouched(); 
      return; 
    }

    try {
      const messageData: ContactMessage = {
        user_name: this.contactForm.value.name ?? '',
        email: this.contactForm.value.email ?? '',
        message: this.contactForm.value.message ?? ''
      };

      await this.contactService.saveMessage(messageData);
      this.showCustomAlert('success');
      // Resetea el formulario usando el método reset()
      this.contactForm.reset(); 
    } catch (error) {
      this.showCustomAlert('error');
      console.error('Error al enviar mensaje (component.ts):', error);
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