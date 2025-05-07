import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';
import * as authServices from '../../services/authServices';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: `./sign-up.component.html`,
  styles: ``,
})
export class SignUpComponent {
  readonly icons = {
    eye: Eye,
    eyeOff: EyeOff,
  };
  userData = {
    name: '',
    email: '',
    password: '',
  };
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.isLoading = true;
    if (this.userData.password !== this.confirmPassword) {
      alert('Password tidak sesuai!');
      this.isLoading = false;
      return;
    } else {
      try {
        const response = await authServices.signup(this.userData);
        console.log('Login Success:', response);
        localStorage.setItem('token', response.data.token);
        console.log('Token: ', response.data.token);
        window.location.href = '/dashboard/profile';
      } catch (error) {
        console.error('Sign Up failed:', error);
        alert('Sign Up gagal. Cek email atau password!');
      } finally {
        this.isLoading = false;
      }
    }
  }
}
