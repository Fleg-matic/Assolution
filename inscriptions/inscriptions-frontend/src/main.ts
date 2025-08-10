/**
 * Point d'entrée principal de l'application Assolution
 * Angular 20.1 avec configuration Bootstrap
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

// Ionic
import { IonicModule } from '@ionic/angular';

// NGX Libraries
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

// Chart.js
import { NgChartsModule } from 'ng2-charts';

// Reactive Forms
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Component principal
import { AppComponent } from './app/app.component';

// Configuration des routes (à créer)
const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./app/pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./app/features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'inscriptions',
    loadChildren: () =>
      import('./app/features/inscriptions/inscriptions.routes').then(
        (m) => m.inscriptionsRoutes
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./app/pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./app/features/admin/admin.routes').then((m) => m.adminRoutes),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./app/pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];

// Intercepteurs HTTP (à créer)
const httpInterceptors = [
  // authInterceptor,
  // errorInterceptor,
  // loadingInterceptor
];

bootstrapApplication(AppComponent, {
  providers: [
    // Modules de base
    importProvidersFrom(BrowserModule, ReactiveFormsModule, FormsModule),

    // Angular Material Modules
    importProvidersFrom(
      MatToolbarModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatCheckboxModule,
      MatRadioModule,
      MatSlideToggleModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatDialogModule,
      MatSnackBarModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatTabsModule,
      MatExpansionModule,
      MatStepperModule,
      MatChipsModule,
      MatAutocompleteModule,
      MatTooltipModule,
      MatMenuModule
    ),

    // Ionic Module
    importProvidersFrom(
      IonicModule.forRoot({
        rippleEffect: true,
        mode: 'md',
        animated: true,
      })
    ),

    // NGX Modules
    importProvidersFrom(
      NgxSpinnerModule.forRoot({
        type: 'ball-scale-multiple',
      }),
      NgxPaginationModule,
      ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        enableHtml: true,
        progressBar: true,
        closeButton: true,
        newestOnTop: true,
      }),
      NgChartsModule
    ),

    // Providers Angular
    provideRouter(routes, {
      enableTracing: false, // Mettre à true pour debug
      onSameUrlNavigation: 'reload',
    }),

    provideHttpClient(withInterceptors(httpInterceptors)),

    provideAnimations(),

    // Services personnalisés (à créer)
    // AuthService,
    // ApiService,
    // ErrorService,
    // LoadingService,
    // NotificationService,
    // LocalStorageService,
    // ConfigService
  ],
}).catch((err) => {
  console.error("❌ Erreur lors du bootstrap de l'application:", err);

  // Affichage d'un message d'erreur à l'utilisateur
  const errorElement = document.createElement('div');
  errorElement.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      z-index: 9999;
    ">
      <div style="text-align: center; max-width: 500px; padding: 2rem;">
        <h1 style="color: #dc3545; margin-bottom: 1rem;">Erreur de chargement</h1>
        <p style="color: #6c757d; margin-bottom: 1.5rem;">
          Une erreur s'est produite lors du chargement de l'application.
        </p>
        <p style="color: #6c757d; font-size: 0.9rem;">
          Veuillez rafraîchir la page ou contacter le support technique.
        </p>
        <button 
          onclick="window.location.reload()" 
          style="
            background: #007bff;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.375rem;
            cursor: pointer;
            font-size: 1rem;
            margin-top: 1rem;
          "
        >
          Rafraîchir la page
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(errorElement);
});
