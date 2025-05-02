import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

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
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      console.log('Submitted:', this.userData);
    }, 1500);
  }
}
