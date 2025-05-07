import { Component, signal } from '@angular/core';
import * as authServices from '../../../services/authServices';

@Component({
  selector: 'app-auth-navbar',
  imports: [],
  templateUrl: './auth-navbar.component.html',
  styles: ``,
})
export class AuthNavbarComponent {
  userName = signal<string>('');

  async ngOnInit() {
    await this.getUserData();
  }

  private async getUserData(): Promise<void> {
    try {
      const data = await authServices.getUser();
      this.userName.set(data?.name || '');
    } catch (error) {
      console.error('❌ Failed to fetch user data:', error);
    }
  }
}
