import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'signIn',
    pathMatch: 'full',
    loadComponent: () =>
      import('./sign-in/sign-in.component').then((m) => m.SignInComponent),
  },
  {
    path: 'signUp',
    pathMatch: 'full',
    loadComponent: () =>
      import('./sign-up/sign-up.component').then((m) => m.SignUpComponent),
  },
  {
    path: 'dashboard/profile',
    loadComponent: () =>
      import('./dashboard/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: 'dashboard/upload',
    loadComponent: () =>
      import('./dashboard/upload/upload.component').then(
        (m) => m.UploadComponent
      ),
  },
  {
    path: 'dashboard/analyze',
    loadComponent: () =>
      import('./dashboard/analyze/analyze.component').then(
        (m) => m.AnalyzeComponent
      ),
  },
];
