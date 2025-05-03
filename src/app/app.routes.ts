import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public/public.component').then(
        (m) => m.PublicComponent
      ),
    children: [
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
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/protected/protected.component').then(
        (m) => m.ProtectedComponent
      ),
    children: [
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
      {
        path: 'dashboard/analyze/detail/:id',
        loadComponent: () =>
          import('./dashboard/detail-analyze/detail-analyze.component').then(
            (m) => m.DetailAnalyzeComponent
          ),
      },
    ],
  },
  // {
  //   path: 'signIn',
  //   pathMatch: 'full',
  //   loadComponent: () =>
  //     import('./sign-in/sign-in.component').then((m) => m.SignInComponent),
  // },
  // {
  //   path: 'signUp',
  //   pathMatch: 'full',
  //   loadComponent: () =>
  //     import('./sign-up/sign-up.component').then((m) => m.SignUpComponent),
  // },
  // {
  //   path: 'dashboard/profile',
  //   loadComponent: () =>
  //     import('./dashboard/profile/profile.component').then(
  //       (m) => m.ProfileComponent
  //     ),
  // },
  // {
  //   path: 'dashboard/upload',
  //   loadComponent: () =>
  //     import('./dashboard/upload/upload.component').then(
  //       (m) => m.UploadComponent
  //     ),
  // },
  // {
  //   path: 'dashboard/analyze',
  //   loadComponent: () =>
  //     import('./dashboard/analyze/analyze.component').then(
  //       (m) => m.AnalyzeComponent
  //     ),
  // },
];
