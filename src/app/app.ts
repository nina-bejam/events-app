import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // ✅ Required for *ngIf

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Events App</span>
      <span class="spacer"></span>

      <!-- Show "Events" button only when not on /events -->
      <button *ngIf="showEventsLink" mat-button routerLink="/events">Events</button>

      <!-- Always show "New Event" -->
      <button mat-button routerLink="/events/new">Neues Event</button>
    </mat-toolbar>

    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrl: './app.css'
})
export class App {
  showEventsLink = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Hide "Events" button when current route is /events
        this.showEventsLink = !event.urlAfterRedirects.match(/^\/events$/);
      });
  }
}
