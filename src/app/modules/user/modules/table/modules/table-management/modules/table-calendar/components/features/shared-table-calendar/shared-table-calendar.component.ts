import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-shared-table-calendar',
  templateUrl: './shared-table-calendar.component.html',
  styleUrl: './shared-table-calendar.component.scss'
})
export class SharedTableCalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    contentHeight:'80vh',
    headerToolbar: {
      left: 'prev,next', // rajouter today pour avoir le bouton qui ramene à aujourd'hui
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    buttonText: {
      month: "Mois",
      week: 'sem.',
      list: 'list'
    },
    eventClick: (arg) => this.handleEventClick(arg),
    dateClick: (arg) => this.handleDateClick(arg),
    navLinks: true,
    editable: true,
    droppable: true,
    firstDay: 1,
    locale: 'fr',
    events: [
      {title: 'dispo Gimli', date: '2024-05-24'},
      {title: 'dispo Freyr', date: '2024-05-27'}
    ]
  }


  handleDateClick(arg: any) {
    alert('date click !' + arg.dateStr)
  }

  handleEventClick(arg: any) {
    alert(arg.event.title)
  }

}
