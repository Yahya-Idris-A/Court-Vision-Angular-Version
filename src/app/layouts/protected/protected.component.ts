import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { AuthNavbarComponent } from '../../components/auth-navbar/auth-navbar.component';

@Component({
  selector: 'app-protected',
  imports: [RouterOutlet, SidebarComponent, AuthNavbarComponent],
  template: `
    <div
      class="flex flex-row justify-between w-full gap-[32px] max-sm:gap-[16px]"
    >
      <app-sidebar></app-sidebar>
      <div class="flex flex-col items-center justify-start min-h-screen w-full">
        <app-auth-navbar class="w-full"></app-auth-navbar>
        <div class="pr-[10px] w-full"><router-outlet /></div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProtectedComponent {}
