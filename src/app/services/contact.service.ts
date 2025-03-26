import { Injectable } from '@angular/core';
import { supabase } from '@app/services/supabase.service';
import { ContactMessage } from '@app/models/contact-message.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public message: ContactMessage;

  async saveMessage(message: ContactMessage) {
    // Guardar mensaje en supabase
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert(message)
        .select();
  
      if (error) {
        throw error; // Pasa el error al catch
      }
  
      console.log('Mensaje enviado con éxito. (service.ts)');
    } catch (error) {
      console.error('Error al enviar el mensaje (service.ts): ', error);
    }
  }

  constructor() {
    this.message = {
      user_name: 'example',
      email: 'example@ex.com',
      message: 'Hi Im an example message.'
    }
  }
}
