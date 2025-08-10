/**
 * Composant principal de l'application Assolution
 * Gère la structure globale et la navigation principale
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterOutlet,
  RouterModule,
  Router,
  NavigationEnd,
} from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// NGX Spinner
import { NgxSpinnerModule } from 'ngx-spinner';

// Environment
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    NgxSpinnerModule,
  ],
  template: `
    <div class="app-container">
      <!-- Barre de progression globale -->
      <mat-progress-bar
        *ngIf="isLoading"
        mode="indeterminate"
        class="global-progress-bar"
      >
      </mat-progress-bar>

      <!-- Toolbar principale -->
      <mat-toolbar color="primary" class="app-toolbar">
        <button
          mat-icon-button
          *ngIf="!isLargeScreen"
          (click)="toggleSidenav()"
          aria-label="Menu"
        >
          <mat-icon>menu</mat-icon>
        </button>

        <span class="app-title">{{ appName }}</span>

        <div class="toolbar-spacer"></div>

        <!-- Navigation desktop -->
        <nav class="desktop-nav" *ngIf="isLargeScreen">
          <a
            mat-button
            routerLink="/home"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            Accueil
          </a>
          <a mat-button routerLink="/inscriptions" routerLinkActive="active">
            Inscriptions
          </a>
          <a
            mat-button
            *ngIf="isAuthenticated"
            routerLink="/profile"
            routerLinkActive="active"
          >
            Profil
          </a>
          <a
            mat-button
            *ngIf="isAdmin"
            routerLink="/admin"
            routerLinkActive="active"
          >
            Administration
          </a>
        </nav>

        <!-- Menu utilisateur -->
        <button
          mat-icon-button
          [matMenuTriggerFor]="userMenu"
          *ngIf="isAuthenticated"
          aria-label="Menu utilisateur"
        >
          <mat-icon>account_circle</mat-icon>
        </button>

        <!-- Boutons d'authentification -->
        <ng-container *ngIf="!isAuthenticated">
          <a mat-button routerLink="/auth/login" class="login-btn">
            Connexion
          </a>
          <a mat-raised-button routerLink="/auth/register" class="register-btn">
            Inscription
          </a>
        </ng-container>
      </mat-toolbar>

      <!-- Menu utilisateur dropdown -->
      <mat-menu #userMenu="matMenu">
        <button mat-menu-item routerLink="/profile">
          <mat-icon>person</mat-icon>
          <span>Mon profil</span>
        </button>
        <button mat-menu-item routerLink="/inscriptions/my">
          <mat-icon>list</mat-icon>
          <span>Mes inscriptions</span>
        </button>
        <mat-divider></mat-divider>
        <button mat-menu-item (click)="logout()">
          <mat-icon>logout</mat-icon>
          <span>Déconnexion</span>
        </button>
      </mat-menu>

      <!-- Sidenav pour mobile -->
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="over" class="app-sidenav" [opened]="false">
          <mat-nav-list>
            <h3 matSubheader>Navigation</h3>

            <a
              mat-list-item
              routerLink="/home"
              (click)="closeSidenav()"
              [class.active]="isActiveRoute('/home')"
            >
              <mat-icon matListItemIcon>home</mat-icon>
              <span matListItemTitle>Accueil</span>
            </a>

            <a
              mat-list-item
              routerLink="/inscriptions"
              (click)="closeSidenav()"
              [class.active]="isActiveRoute('/inscriptions')"
            >
              <mat-icon matListItemIcon>assignment</mat-icon>
              <span matListItemTitle>Inscriptions</span>
            </a>

            <ng-container *ngIf="isAuthenticated">
              <mat-divider></mat-divider>

              <h3 matSubheader>Mon compte</h3>

              <a
                mat-list-item
                routerLink="/profile"
                (click)="closeSidenav()"
                [class.active]="isActiveRoute('/profile')"
              >
                <mat-icon matListItemIcon>person</mat-icon>
                <span matListItemTitle>Mon profil</span>
              </a>

              <a
                mat-list-item
                routerLink="/inscriptions/my"
                (click)="closeSidenav()"
                [class.active]="isActiveRoute('/inscriptions/my')"
              >
                <mat-icon matListItemIcon>list</mat-icon>
                <span matListItemTitle>Mes inscriptions</span>
              </a>

              <ng-container *ngIf="isAdmin">
                <mat-divider></mat-divider>
                <h3 matSubheader>Administration</h3>

                <a
                  mat-list-item
                  routerLink="/admin"
                  (click)="closeSidenav()"
                  [class.active]="isActiveRoute('/admin')"
                >
                  <mat-icon matListItemIcon>admin_panel_settings</mat-icon>
                  <span matListItemTitle>Administration</span>
                </a>
              </ng-container>

              <mat-divider></mat-divider>

              <button mat-list-item (click)="logout(); closeSidenav()">
                <mat-icon matListItemIcon>logout</mat-icon>
                <span matListItemTitle>Déconnexion</span>
              </button>
            </ng-container>

            <ng-container *ngIf="!isAuthenticated">
              <mat-divider></mat-divider>

              <a
                mat-list-item
                routerLink="/auth/login"
                (click)="closeSidenav()"
              >
                <mat-icon matListItemIcon>login</mat-icon>
                <span matListItemTitle>Connexion</span>
              </a>

              <a
                mat-list-item
                routerLink="/auth/register"
                (click)="closeSidenav()"
              >
                <mat-icon matListItemIcon>person_add</mat-icon>
                <span matListItemTitle>Inscription</span>
              </a>
            </ng-container>
          </mat-nav-list>
        </mat-sidenav>

        <!-- Contenu principal -->
        <mat-sidenav-content class="main-content">
          <div class="content-wrapper">
            <!-- Outlet pour les routes -->
            <router-outlet></router-outlet>
          </div>

          <!-- Footer -->
          <footer class="app-footer" *ngIf="showFooter">
            <div class="footer-content">
              <div class="footer-section">
                <h4>{{ appName }}</h4>
                <p>Plateforme d'inscriptions sécurisée</p>
              </div>

              <div class="footer-section">
                <h4>Contact</h4>
                <p>
                  <mat-icon>email</mat-icon>
                  {{ contactEmail }}
                </p>
                <p>
                  <mat-icon>phone</mat-icon>
                  {{ contactPhone }}
                </p>
              </div>

              <div class="footer-section">
                <h4>Liens utiles</h4>
                <a routerLink="/legal/privacy">Politique de confidentialité</a>
                <a routerLink="/legal/terms">Conditions d'utilisation</a>
                <a routerLink="/help">Aide</a>
              </div>
            </div>

            <div class="footer-bottom">
              <p>
                &copy; {{ currentYear }} {{ appName }}. Tous droits réservés.
              </p>
              <p *ngIf="environment.development" class="dev-info">
                Version {{ appVersion }} - Environnement de développement
              </p>
            </div>
          </footer>
        </mat-sidenav-content>
      </mat-sidenav-container>

      <!-- Spinner global -->
      <ngx-spinner
        bdColor="rgba(0, 0, 0, 0.8)"
        size="medium"
        color="#007bff"
        type="ball-scale-multiple"
      >
        <p style="color: white; margin-top: 20px;">Chargement...</p>
      </ngx-spinner>
    </div>
  `,
  styles: [
    `
      .app-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .global-progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1001;
      }

      .app-toolbar {
        position: sticky;
        top: 0;
        z-index: 1000;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .app-title {
        font-size: 1.25rem;
        font-weight: 500;
        margin-left: 8px;
      }

      .toolbar-spacer {
        flex: 1 1 auto;
      }

      .desktop-nav {
        display: flex;
        gap: 8px;

        a {
          &.active {
            background-color: rgba(255, 255, 255, 0.1);
          }
        }
      }

      .login-btn {
        margin-right: 8px;
      }

      .register-btn {
        background-color: rgba(255, 255, 255, 0.1);

        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }

      .sidenav-container {
        flex: 1;
        display: flex;
      }

      .app-sidenav {
        width: 280px;

        .mat-mdc-list-item.active {
          background-color: rgba(0, 123, 255, 0.1);
          color: #007bff;

          .mat-icon {
            color: #007bff;
          }
        }
      }

      .main-content {
        display: flex;
        flex-direction: column;
        min-height: 100%;
      }

      .content-wrapper {
        flex: 1;
        padding: 0;
        overflow-y: auto;
      }

      .app-footer {
        margin-top: auto;
        background-color: #f8f9fa;
        border-top: 1px solid #e9ecef;

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-section {
          h4 {
            margin: 0 0 1rem 0;
            color: #495057;
            font-size: 1.1rem;
          }

          p {
            margin: 0.5rem 0;
            color: #6c757d;
            display: flex;
            align-items: center;
            gap: 0.5rem;

            .mat-icon {
              font-size: 1rem;
              width: 1rem;
              height: 1rem;
            }
          }

          a {
            display: block;
            color: #007bff;
            text-decoration: none;
            margin: 0.25rem 0;

            &:hover {
              text-decoration: underline;
            }
          }
        }

        .footer-bottom {
          background-color: #e9ecef;
          padding: 1rem 2rem;
          text-align: center;

          p {
            margin: 0.25rem 0;
            color: #6c757d;
            font-size: 0.9rem;
          }

          .dev-info {
            color: #dc3545;
            font-weight: 500;
          }
        }
      }

      @media (max-width: 768px) {
        .app-title {
          font-size: 1.1rem;
        }

        .footer-content {
          grid-template-columns: 1fr;
          padding: 1rem;
          gap: 1rem;
        }

        .footer-bottom {
          padding: 1rem;
        }
      }

      @media (min-width: 1024px) {
        .content-wrapper {
          padding: 0 1rem;
        }
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Propriétés publiques
  appName = environment.appName || 'Assolution';
  appVersion = environment.appVersion || '1.0.0';
  contactEmail = environment.contact?.supportEmail || 'contact@assolution.com';
  contactPhone = environment.contact?.phoneNumber || '+33 1 23 45 67 89';
  currentYear = new Date().getFullYear();
  environment = environment;

  // État de l'interface
  isLoading = false;
  isLargeScreen = window.innerWidth >= 1024;
  showFooter = true;

  // État d'authentification (à connecter avec le service d'auth)
  isAuthenticated = false;
  isAdmin = false;

  // Référence au sidenav
  private sidenavRef: any;

  constructor(private router: Router) {
    // Écouter les changements de taille d'écran
    window.addEventListener('resize', () => {
      this.isLargeScreen = window.innerWidth >= 1024;
    });
  }

  ngOnInit(): void {
    this.setupRouterEvents();
    this.checkAuthenticationStatus();
    this.logEnvironmentInfo();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Configuration des événements du router
   */
  private setupRouterEvents(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        // Fermer le sidenav après navigation sur mobile
        if (!this.isLargeScreen && this.sidenavRef) {
          this.closeSidenav();
        }

        // Masquer le footer sur certaines pages
        this.showFooter = !this.isSpecialPage(event.url);

        // Scroll vers le haut
        window.scrollTo(0, 0);
      });
  }

  /**
   * Vérifier le statut d'authentification
   */
  private checkAuthenticationStatus(): void {
    // TODO: Connecter avec le service d'authentification
    // this.authService.isAuthenticated$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(isAuth => {
    //     this.isAuthenticated = isAuth;
    //   });
    // this.authService.currentUser$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(user => {
    //     this.isAdmin = user?.role === 'ADMIN';
    //   });
  }

  /**
   * Afficher les informations d'environnement en développement
   */
  private logEnvironmentInfo(): void {
    if (environment.development) {
      console.group("🚀 Assolution - Informations d'environnement");
      console.log('📱 Application:', this.appName);
      console.log('🔢 Version:', this.appVersion);
      console.log(
        '🌍 Environnement:',
        environment.production ? 'Production' : 'Développement'
      );
      console.log('🔗 API URL:', environment.apiUrl);
      console.log('📏 Écran large:', this.isLargeScreen);
      console.groupEnd();
    }
  }

  /**
   * Vérifier si une route est active
   */
  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  /**
   * Vérifier si c'est une page spéciale (sans footer)
   */
  private isSpecialPage(url: string): boolean {
    const specialPages = ['/auth/', '/admin/', '/maintenance'];
    return specialPages.some((page) => url.includes(page));
  }

  /**
   * Basculer l'état du sidenav
   */
  toggleSidenav(): void {
    if (this.sidenavRef) {
      this.sidenavRef.toggle();
    }
  }

  /**
   * Fermer le sidenav
   */
  closeSidenav(): void {
    if (this.sidenavRef) {
      this.sidenavRef.close();
    }
  }

  /**
   * Déconnexion de l'utilisateur
   */
  logout(): void {
    // TODO: Connecter avec le service d'authentification
    // this.authService.logout().subscribe(() => {
    //   this.router.navigate(['/home']);
    // });

    // Simulation pour le développement
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.router.navigate(['/home']);
  }

  /**
   * Lifecycle hook appelé après l'initialisation de la vue
   */
  ngAfterViewInit(): void {
    // Récupérer la référence du sidenav si nécessaire
    // this.sidenavRef = this.sidenav;
  }
}
