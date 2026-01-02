import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { EventService, EventItem } from '../../services/event.service';
import { SnackBarService } from '../../services/snackbar.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, FormsModule],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css'
})
export class EventDetail implements OnInit {
  event: EventItem | null = null;
  isLoading = true;
  selectedTicket: any = null;


constructor(
  private route: ActivatedRoute,
  private eventService: EventService,
  private snackBar: SnackBarService,
  private cdr: ChangeDetectorRef,
  private router: Router   
) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('[EventDetail] Route ID:', id);

    if (id) {
      this.eventService.loadEvent(id).subscribe({
        next: (data) => {
          console.log('[EventDetail] Loaded event:', data);
          this.event = data;
          this.isLoading = false;
          this.cdr.detectChanges(); // Force refresh
        },
        error: (err) => {
          console.error('[EventDetail] Error:', err);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    }
  }

  getSafeImageUrl(): string {
    if (!this.event?.imageUrl) {
      return 'https://via.placeholder.com/600x400?text=No+Image';
    }
    return this.event.imageUrl.startsWith('http')
      ? this.event.imageUrl
      : 'https://via.placeholder.com/600x400?text=Invalid+Image';
  }

reserveTicket(ticket: any) {
  if (!this.event) return;

  if (!ticket) {
    this.snackBar.openSnackBar('Bitte wählen Sie ein Ticket aus!', 'error');
    return;
  }

  sessionStorage.setItem('selectedTicketId', ticket.id);

  this.router.navigate(['/ticket', this.event.id], {
    state: { selectedTicketId: ticket.id }
  });
}





//   reserveTicket(ticket: any) {
//   if (!this.event) return;

//   if (this.event.ticketLink) {
//     window.open(this.event.ticketLink, '_blank');
//     return;
//   }

//   this.snackBar.openSnackBar('Kein Ticket-Link verfügbar!', 'error');
// }

}
