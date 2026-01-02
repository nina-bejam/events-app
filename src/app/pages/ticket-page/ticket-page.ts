import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { EventService, EventItem } from '../../services/event.service';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-ticket-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './ticket-page.html',
  styleUrl: './ticket-page.css'
})
export class TicketPage implements OnInit {
  event: EventItem | null = null;
  isLoading = true;
  selectedTicketId: string | null = null;
  selectedTicket: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private snackBar: SnackBarService,
    private cdr: ChangeDetectorRef
  ) {}



  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const navigation = this.router.getCurrentNavigation();
    
    // 🔹 یا از state بگیر یا از sessionStorage
    const passedTicketId =
      navigation?.extras?.state?.['selectedTicketId'] ||
      sessionStorage.getItem('selectedTicketId');

    if (id) {
      this.eventService.loadEvent(id).subscribe({
        next: (data) => {
          this.event = data;
          this.isLoading = false;

          // ✅ انتخاب بلیت از لیست
          if (passedTicketId && this.event?.tickets) {
            this.selectedTicket = this.event.tickets.find(
              (t) => t.id === passedTicketId
            );
          }

          if (!this.selectedTicket) {
            this.snackBar.openSnackBar(
              'Kein Ticket ausgewählt. Bitte wählen Sie ein Ticket im Event-Detail aus.',
              'error'
            );
            setTimeout(() => this.router.navigate(['/events']), 2500);
          }

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('[TicketPage] Fehler beim Laden', err);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    }
  }





confirmReservation() {
  if (!this.event || !this.selectedTicket) {
    this.snackBar.openSnackBar('Bitte wählen Sie ein Ticket aus!', 'error');
    return;
  }

  const ticket = this.selectedTicket;

  if (ticket.available <= 0) {
    this.snackBar.openSnackBar('Keine Tickets mehr verfügbar!', 'error');
    return;
  }

  ticket.available -= 1;

  this.eventService.updateEvent(this.event.id!, this.event).subscribe({
    next: (updated) => {
      console.log('[TicketPage] Ticket updated:', updated);

      this.snackBar.openSnackBar(
        `Ein "${ticket.name}"-Ticket für "${this.event!.title}" wurde erfolgreich reserviert!`,
        'success'
      );

      sessionStorage.removeItem('selectedTicketId');

      setTimeout(() => this.router.navigate(['/events']), 2000);
    },
    error: (err) => {
      console.error('[TicketPage] Fehler beim Aktualisieren', err);
      this.snackBar.openSnackBar('Fehler beim Speichern!', 'error');
    }
  });
}


  cancelReservation() {
    this.snackBar.openSnackBar(
      'Deine Reservierung bleibt für 24 Stunden erhalten.',
      'info'
    );
    setTimeout(() => this.router.navigate(['/events']), 2000);
  }
}
