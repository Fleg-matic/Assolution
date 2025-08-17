import { Component } from '@angular/core';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  template: `
    <div class="profile-container">
      <h1>Profil utilisateur</h1>
      <p>Cette page sera développée prochainement.</p>
    </div>
  `,
  styles: [
    `
      .profile-container {
        padding: 2rem;
        text-align: center;
      }
    `,
  ],
})
export class ProfileComponent {}
