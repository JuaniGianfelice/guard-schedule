import "./schedule.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'

const events = [
  
  { title: 'event 1', date: '2023-11-07' },
  { title: 'event 2', date: '2023-11-07' }
]

const Schedule = () => {
  return (
    <div className="schedule">
      <button>Agregar</button>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekNumberCalculation="ISO"
        locale="es"
        events={events}
        height={650}
      />
    </div>
  );
}

export default Schedule