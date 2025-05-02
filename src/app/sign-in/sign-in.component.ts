import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

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

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      console.log('Submitted:', this.userData);
    }, 1500);
  }
}
