import "./schedule.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'



const Schedule = () => {
  return (
    <div className="schedule">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'event 1', date: '2023-11-07' },
          { title: 'event 2', date: '2023-11-07' }
        ]}
        height={650}
        
        />
    </div>
  );
}

export default Schedule