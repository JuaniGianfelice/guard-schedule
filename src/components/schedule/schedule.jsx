import "./schedule.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'



const Schedule = () => {
  return (
    <div className="schedule">
      <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
        />
    </div>
  );
}

export default Schedule