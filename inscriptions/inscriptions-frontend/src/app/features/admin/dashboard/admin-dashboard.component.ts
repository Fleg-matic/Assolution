import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-container">
      <h1>Administration</h1>
      <p>Tableau de bord administrateur en développement.</p>
    </div>
  `,
  styles: [
    `
      .admin-container {
        padding: 2rem;
      }
    `,
  ],
})
export class AdminDashboardComponent {}
