import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Mock du Router pour les tests
    mockRouter = jasmine.createSpyObj('Router', ['navigate'], {
      events: [], // Observable vide pour les tests
      url: '/home',
    });

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BrowserAnimationsModule, // Nécessaire pour Angular Material
      ],
      providers: [{ provide: Router, useValue: mockRouter }],
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

  it('should render component without errors', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
    expect(compiled.querySelector('.app-container')).toBeTruthy();
  });
});
