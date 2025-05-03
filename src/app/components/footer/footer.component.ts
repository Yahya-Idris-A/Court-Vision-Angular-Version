import { Component } from '@angular/core';
import {
  LucideAngularModule,
  Instagram,
  Twitter,
  MapPin,
  Mail,
  Phone,
} from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule],
  templateUrl: `./footer.component.html`,
  styles: ``,
})
export class FooterComponent {
  readonly icons = {
    instagram: Instagram,
    twitter: Twitter,
    map: MapPin,
    mail: Mail,
    phone: Phone,
  };
  currentYear: number = new Date().getFullYear();
}
