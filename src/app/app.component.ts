import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasicNavbarComponent } from './components/basic-navbar/basic-navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BasicNavbarComponent, FooterComponent],
  template: `
    <app-basic-navbar></app-basic-navbar>
    <router-outlet />
    <app-footer></app-footer>
  `,
  styles: [],
})
export class AppComponent {
  title = 'court-vision';
}
