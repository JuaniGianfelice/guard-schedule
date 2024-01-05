import "./schedule.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "../modal/modal";
import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const calendarRef = useRef(null);
  const navigate = useNavigate();

  //Agregar Evento
  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(event);
  };

  //Logout
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log("Cierre de sesión exitoso");
        navigate('/');
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="schedule" >
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekNumberCalculation="ISO"
        locale="es"
        height={600}
        headerToolbar={{
          left: "Add",
          center: "title",
          right: "today prev,next CloseSesion",
        }}
        weekNumbersWithinDays={5}
        customButtons={{
          Add: {
            text: "Agregar Guardia",
            click: () => setModalOpen(true),
          },
          CloseSesion: {
            text: "Cerrar Sesion",
            click: () => handleLogout(true),
          }
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
