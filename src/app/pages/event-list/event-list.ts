import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EventService, EventItem } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css'
})
export class EventList implements OnInit {
  events: EventItem[] = [];
  displayedColumns = ['title', 'date', 'location', 'actions'];
  isLoading = true;

  constructor(private eventService: EventService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.eventService.loadEvents().subscribe({
      next: (data) => {
        console.log('[EventList] Data loaded:', data);
        this.events = data;
        this.isLoading = false;
        this.cdr.detectChanges(); // Force UI update manually
      },
      error: (err) => {
        console.error('[EventList] Error:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
