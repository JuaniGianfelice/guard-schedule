import "./schedule.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "../modal/modal";
import { useState, useRef } from "react";

const Schedule = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
  const calendarRef = useRef(null);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(event);
  };

  return (
    <div className="schedule" >
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekNumberCalculation="ISO"
        locale="es"
        height={650}
        headerToolbar={{
          left: "Agregar",
          center: "title",
          right: "today prev,next",
        }}
        customButtons={{
          Agregar: {
            text: "Agregar Guardia",
            click: () => setModalOpen(true),
          },
        }}
      />

      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </div>
  );
};

export default Schedule;
