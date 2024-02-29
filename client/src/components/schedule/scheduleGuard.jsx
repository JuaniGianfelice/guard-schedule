import React, { useState, useRef, useEffect } from "react";
import "./schedule.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "../modal/modalGuard";
import { useNavigate } from "react-router-dom";

const ScheduleGuard = () => {
  const BeURL = process.env.REACT_APP_BE_URL;
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const navigate = useNavigate();

  // Cargar eventos al inicializar el componente
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BeURL}/api/eventsGuard`);
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events);
        } else {
          console.error("Error al obtener eventos:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      }
    };

    fetchEvents();
  }, []);

  // Agregar Eventos
  const onEventAdded = (event) => {
    setEvents([...events, event]);
  };

  // Logout
  const handleLogout = async () => {
    try {
      const response = await fetch(`${BeURL}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Cierre de sesión exitoso");
        navigate("/");
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="schedule">
      <h1>Calendario de GUARDIA</h1>

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
        customButtons={{
          Add: {
            text: "Agregar Guardia",
            click: () => setModalOpen(true),
          },
          CloseSesion: {
            text: "Cerrar Sesion",
            click: () => handleLogout(true),
          },
        }}
        events={events}
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

export default ScheduleGuard;
