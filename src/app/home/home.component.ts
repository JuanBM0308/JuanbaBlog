import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '@app/services/supabase.service';
import MD5 from 'crypto-js/md5';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent {
  
}
