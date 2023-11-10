import "./schedule.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import addGuardModal from "../modal/modal";

const events = [
  { title: 'event 1', date: '2023-11-07' },
  { title: 'event 2', date: '2023-11-07' }
]

const Schedule = () => {
  
  return (
    <div className="schedule">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekNumberCalculation="ISO"
        locale="es"
        events={events}
        height={650}
        headerToolbar={{
          left: "Agregar",
          center: "title",
          right: "today prev,next",
        }}
        customButtons={{
          Agregar: {
            text: "Agregar Guardia",
            click: addGuardModal,
          },
        }}
      />
    </div>
  );
}

export default Schedule