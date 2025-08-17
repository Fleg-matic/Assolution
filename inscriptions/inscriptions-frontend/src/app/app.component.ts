/**
 * Composant principal de l'application Assolution
 * Gère la structure globale et la navigation principale
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
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
import { Title } from '@angular/platform-browser';

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
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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

  constructor(
    private router: Router,
    private titleService: Title
  ) {
    // Écouter les changements de taille d'écran
    window.addEventListener('resize', () => {
      this.isLargeScreen = window.innerWidth >= 1024;
    });

    const prefix = environment.production ? '' : '[DEV] ';
    this.titleService.setTitle(`${prefix}Assolution - Inscriptions`);
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
        filter(event => event instanceof NavigationEnd),
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
      console.log('🌍 Environnement:', environment.production ? 'Production' : 'Développement');
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
    return specialPages.some(page => url.includes(page));
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
