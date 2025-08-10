import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { EMPTY } from 'rxjs';

// Composant dummy pour les routes de test
@Component({
  template: '<div>Test Route</div>',
})
class TestComponent {}

describe('AppComponent', () => {
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Mock du Router avec tous les événements nécessaires
    mockRouter = jasmine.createSpyObj('Router', ['navigate'], {
      events: EMPTY, // Observable vide pour éviter les erreurs
      url: '/home',
    });

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BrowserAnimationsModule,
        // RouterTestingModule fournit tous les providers Router nécessaires
        RouterTestingModule.withRoutes([
          { path: 'home', component: TestComponent },
          { path: 'auth/login', component: TestComponent },
          { path: 'auth/register', component: TestComponent },
          { path: 'inscriptions', component: TestComponent },
          { path: 'profile', component: TestComponent },
          { path: 'admin', component: TestComponent },
          { path: '', redirectTo: '/home', pathMatch: 'full' },
        ]),
      ],
      providers: [
        // Le RouterTestingModule fournit déjà Router et ActivatedRoute
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have application name', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.appName).toBeDefined();
    expect(app.appName).toBe('Assolution');
  });

  it('should have current year', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.currentYear).toBe(new Date().getFullYear());
  });

  it('should have contact information', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.contactEmail).toBeDefined();
    expect(app.contactPhone).toBeDefined();
  });

  it('should render component without errors', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
    expect(compiled.querySelector('.app-container')).toBeTruthy();
  });

  it('should have toolbar with app name', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const toolbar = compiled.querySelector('.app-toolbar');
    expect(toolbar).toBeTruthy();
  });

  it('should initialize authentication status', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isAuthenticated).toBe(false);
    expect(app.isAdmin).toBe(false);
  });
});
