import React, { useState, useEffect } from "react";
import "./schedule.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "../modal/modal";
import { useNavigate } from "react-router-dom";

const Schedule = ({ type }) => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // Cargar eventos al inicializar el componente
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/${type}/events`);
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
  }, [type]);

  // Agregar Eventos
  const onEventAdded = async (event) => {
    try {
      const response = await fetch(`http://localhost:8000/api/${type}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        const data = await response.json();
        setEvents([...events, data.event]);
      } else {
        console.error("Error al agregar evento:", response.statusText);
      }
    } catch (error) {
      console.error("Error al agregar evento:", error);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout", {
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
      <FullCalendar
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
        type={type}
      />
    </div>
  );
};

export default Schedule;
