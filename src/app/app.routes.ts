import { Routes } from '@angular/router';

import { EventForm } from './pages/event-form/event-form';
import { EventList } from './pages/event-list/event-list';
import { EventDetail } from './pages/event-detail/event-detail';
import { TicketPage } from './pages/ticket-page/ticket-page';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventList },
  { path: 'events/new', component: EventForm },
  { path: 'events/:id', component: EventDetail },
  { path: 'ticket/:id', component: TicketPage },
  { path: '**', redirectTo: 'events' }
];
