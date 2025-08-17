import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscriptions-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="inscriptions-container">
      <h1>Liste des inscriptions</h1>
      <p>Cette page sera développée prochainement.</p>
    </div>
  `,
  styles: [
    `
      .inscriptions-container {
        padding: 2rem;
      }
    `,
  ],
})
export class InscriptionsListComponent {}
