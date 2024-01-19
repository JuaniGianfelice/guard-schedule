// schedule.jsx

import "./schedule.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "../modal/modal";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Schedule = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const navigate = useNavigate();

  // Traigo tipo de calendario del usuario desde el Token
  const calendarType = Cookies.get('calendar');

  // Traigo el "Evento" según el calendario del usuario
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/events/${calendarType}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`,
          },
        });

        if (response.ok) {
          const eventosData = await response.json();
          setEvents(eventosData);
        } else {
          console.error("Error al obtener eventos");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getEvents();
  }, [calendarType]);

  // Agregar Evento
  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(event);
  };

  // Logout
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
    <div className="schedule">
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
        events={events} // Muestro evento segun tipo de calendario
        eventContent={({ event }) => (
          <div>
            <b>{event.title}</b>
          </div>
        )}
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
