import { Component } from '@angular/core';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
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
