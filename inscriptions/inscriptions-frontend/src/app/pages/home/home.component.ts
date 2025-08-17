import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
],
  template: `
    <div class="home-container">
      <section class="hero-section">
        <div class="hero-content">
          <h1>Bienvenue sur Assolution</h1>
          <p class="hero-subtitle">
            Plateforme moderne d'inscriptions sécurisée
          </p>
          <div class="hero-actions">
            <a mat-raised-button color="primary" routerLink="/inscriptions">
              Voir les inscriptions
            </a>
            <a mat-button routerLink="/auth/register">
              Créer un compte
            </a>
          </div>
        </div>
      </section>

      <section class="features-section">
        <div class="container">
          <h2>Fonctionnalités principales</h2>
          <div class="features-grid">
            <mat-card class="feature-card">
              <mat-card-header>
                <mat-icon mat-card-avatar>security</mat-icon>
                <mat-card-title>Sécurisé</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p>Vos données sont protégées par des standards de sécurité élevés.</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="feature-card">
              <mat-card-header>
                <mat-icon mat-card-avatar>speed</mat-icon>
                <mat-card-title>Rapide</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p>Interface moderne et réactive pour une expérience optimale.</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="feature-card">
              <mat-card-header>
                <mat-icon mat-card-avatar>support_agent</mat-icon>
                <mat-card-title>Support 24/7</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p>Notre équipe de support est disponible pour vous aider.</p>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
    }

    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-content h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 300;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .features-section {
      padding: 4rem 2rem;
      background-color: #f8f9fa;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .features-section h2 {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2.5rem;
      color: #333;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      text-align: center;
      padding: 2rem;
      
      mat-icon[mat-card-avatar] {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
        background-color: #007bff;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
    }

    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2rem;
      }
      
      .hero-section {
        padding: 2rem 1rem;
      }
      
      .features-section {
        padding: 2rem 1rem;
      }
      
      .hero-actions {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class HomeComponent {}