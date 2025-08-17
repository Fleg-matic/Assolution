import { Component } from '@angular/core';


@Component({
  selector: 'app-my-inscriptions',
  standalone: true,
  imports: [],
  template: `
    <div class="my-inscriptions-container">
      <h1>Mes inscriptions</h1>
      <p>Cette page sera développée prochainement.</p>
    </div>
  `,
  styles: [
    `
      .my-inscriptions-container {
        padding: 2rem;
      }
    `,
  ],
})
export class MyInscriptionsComponent {}
