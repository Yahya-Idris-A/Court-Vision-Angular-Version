import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-navbar',
  imports: [],
  templateUrl: './auth-navbar.component.html',
  styles: ``,
})
export class AuthNavbarComponent {
  user: { name: string } | null = { name: 'Yahya' };
}
