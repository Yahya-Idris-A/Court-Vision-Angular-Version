import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Menu, X, LogIn } from 'lucide-angular';

@Component({
  selector: 'app-basic-navbar',
  imports: [LucideAngularModule, RouterLink, CommonModule],
  templateUrl: `./basic-navbar.component.html`,
  styleUrl: `./basic-navbar.component.scss`,
})
export class BasicNavbarComponent {
  readonly icons = {
    menu: Menu,
    close: X,
    login: LogIn,
  };
  user: any = null; // atau isi dengan objek user jika login, contoh:
  // user: { name: string } | null = { name: 'Yahya' };
}
