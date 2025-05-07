import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  LucideAngularModule,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Upload,
  ClipboardCheck,
  LogOut,
} from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule, RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  readonly icons = {
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    userCircle: UserCircle,
    upload: Upload,
    clipboardCheck: ClipboardCheck,
    logOut: LogOut,
  };

  isSidebarExpanded = true;
  pathname: string;

  constructor(private router: Router) {
    this.pathname = this.router.url;
  }

  toggleSidebar(): void {
    this.isSidebarExpanded = !this.isSidebarExpanded;
    console.log('Sidebar toggled:', this.isSidebarExpanded);
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/signIn';
  }

  isActive(routeMatch: string | string[]): boolean {
    return Array.isArray(routeMatch)
      ? routeMatch.some((r) => this.router.url.includes(r))
      : this.router.url.includes(routeMatch);
  }

  linkClasses(routeMatch: string | string[]): string {
    return `flex flex-row justify-start items-center w-full max-sm:w-fit px-[16px] max-sm:px-[10px] rounded-[6px] py-[8px] cursor-pointer overflow-x-hidden ${
      this.isActive(routeMatch) ? 'bg-[#FD6A2A]' : 'bg-white'
    }`;
  }

  iconClasses(routeMatch: string | string[]): string {
    return `w-10 h-10 max-sm:w-5 max-sm:h-5 overflow-visible ${
      this.isActive(routeMatch) ? 'text-white' : 'text-[#4B465C]'
    }`;
  }

  textClasses(routeMatch: string | string[]): string {
    return `text-[20px] font-normal ml-[8px] max-sm:hidden transition-all duration-300 ease-in-out transform ${
      this.isActive(routeMatch) ? 'text-white' : 'text-[#4B465C]'
    } ${this.isSidebarExpanded ? 'opacity-100' : 'opacity-0'}`;
  }
}
