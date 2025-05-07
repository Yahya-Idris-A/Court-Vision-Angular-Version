import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';
import * as authServices from '../../services/authServices';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: `./sign-in.component.html`,
  styles: ``,
})
export class SignInComponent {
  readonly icons = {
    eye: Eye,
    eyeOff: EyeOff,
  };
  userData = {
    email: '',
    password: '',
  };

  showPassword = false;
  isLoading = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.isLoading = true;

    try {
      const response = await authServices.signin(this.userData);
      console.log('Login Success:', response);
      console.log(this.userData);
      localStorage.setItem('token', response.data.token);
      console.log('Token:', response.data.token);
      window.location.href = '/dashboard/profile';
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login gagal. Cek email atau password!');
    } finally {
      this.isLoading = false;
    }
  }
}
