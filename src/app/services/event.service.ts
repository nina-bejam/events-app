import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SnackBarService } from './snackbar.service';

export interface TicketReserve {
  id?: string;
  eventId: string;
  ticketId: string;
  name: string;
  quantity: number;
}

export interface Ticket {
  id: string;
  name: string;
  price: number;
  available: number;
}

export interface EventItem {
  id?: string;
  title: string;
  location: string;
  date: string;
  description?: string;
  imageUrl?: string;
  ticketLink?: string;
  tickets?: Ticket[];
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(
    private http: HttpClient,
    private snackBar: SnackBarService
  ) {}

  loadEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(this.apiUrl).pipe(
      tap(events => console.log('[EventService] Events loaded', events)),
      catchError(err => {
        console.error('[EventService] Error loading events', err);
        this.snackBar.openSnackBar('Fehler beim Laden der Events!', 'error');
        return of([]);
      })
    );
  }

  loadEvent(id: string): Observable<EventItem | null> {
    return this.http.get<EventItem>(`${this.apiUrl}/${id}`).pipe(
      tap(event => console.log('[EventService] Loaded event:', event)),
      catchError(err => {
        console.error('[EventService] Error loading event', err);
        this.snackBar.openSnackBar('Fehler beim Laden des Events!', 'error');
        return of(null);
      })
    );
  }

  saveEvent(event: EventItem): Observable<EventItem | null> {
    return this.http.post<EventItem>(this.apiUrl, event).pipe(
      tap(saved => {
        console.log('[EventService] Event saved:', saved);
        this.snackBar.openSnackBar('Event gespeichert.', 'success');
      }),
      catchError(err => {
        console.error('[EventService] Error saving event', err);
        this.snackBar.openSnackBar('Fehler beim Speichern!', 'error');
        return of(null);
      })
    );
  }

  updateEvent(id: string, data: Partial<EventItem>): Observable<EventItem | null> {
    return this.http.patch<EventItem>(`${this.apiUrl}/${id}`, data).pipe(
      tap(updated => console.log('[EventService] Event updated:', updated)),
      catchError(err => {
        console.error('[EventService] Error updating event', err);
        this.snackBar.openSnackBar('Fehler beim Aktualisieren!', 'error');
        return of(null);
      })
    );
  }

  saveReservation(reservation: TicketReserve): Observable<TicketReserve | null> {
    return this.http.post<TicketReserve>('http://localhost:3000/reservations', reservation).pipe(
      tap(saved => console.log('[EventService] Reservation saved:', saved)),
      catchError(err => {
        console.error('[EventService] Error saving reservation', err);
        this.snackBar.openSnackBar('Fehler beim Speichern der Reservierung!', 'error');
        return of(null);
      })
    );
  }

  loadReservations(): Observable<TicketReserve[]> {
    return this.http.get<TicketReserve[]>('http://localhost:3000/reservations').pipe(
      catchError(err => {
        console.error('[EventService] Error loading reservations', err);
        return of([]);
      })
    );
  }
}
