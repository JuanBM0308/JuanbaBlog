import { Injectable } from '@angular/core';
import { supabase } from '@app/services/supabase.service';
import { ContactMessage } from '@app/models/contact-message.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  async saveMessage(messageData: ContactMessage) {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([messageData]) 
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      console.log('Mensaje enviado con éxito. (service.ts)');
    } catch (error) {
      console.error('Error en saveMessage (service.ts): ', error);
      throw error; 
    }
  }
}