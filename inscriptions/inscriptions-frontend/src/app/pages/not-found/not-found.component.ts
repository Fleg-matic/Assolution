import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  template: `
    <div class="not-found-container">
      <h1>404</h1>
      <h2>Page non trouvée</h2>
      <p>Désolé, la page que vous recherchez n'existe pas.</p>
      <a mat-raised-button color="primary" routerLink="/home"> Retour à l'accueil </a>
    </div>
  `,
  styles: [
    `
      .not-found-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
        text-align: center;
        padding: 2rem;
      }

      h1 {
        font-size: 6rem;
        color: #dc3545;
        margin: 0;
      }

      h2 {
        font-size: 2rem;
        margin: 1rem 0;
      }

      p {
        font-size: 1.1rem;
        margin-bottom: 2rem;
        color: #6c757d;
      }
    `,
  ],
})
export class NotFoundComponent {}
