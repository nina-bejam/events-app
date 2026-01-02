import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EventService, EventItem } from '../../services/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css'
})
export class EventForm {
  model: EventItem = {
    title: '',
    location: '',
    date: '',
    description: '',
    imageUrl: '',
    ticketLink: ''
  };

  isSaving = false;

  constructor(
    private eventService: EventService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.isSaving = true;
    this.cdr.markForCheck();

    this.eventService.saveEvent(this.model).subscribe({
      next: (saved) => {
        console.log('[EventForm] Saved:', saved);
        this.isSaving = false;
        if (saved) this.router.navigate(['/events']);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('[EventForm] Error:', err);
        this.isSaving = false;
        this.cdr.markForCheck();
      }
    });
  }
}
