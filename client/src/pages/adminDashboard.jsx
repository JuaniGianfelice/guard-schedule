import React, { useState } from "react";
import "../index.scss";
import UserCreationForm from "../components/userCreationForm/userCreationForm";
import ScheduleUti from "../components/schedule/scheduleUti";
import ScheduleGuard from "../components/schedule/scheduleGuard";
import Summary from "../components/summary/summary";
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();

  const handleCreateUserClick = () => {
    setShowCreateUserForm(true);
    setShowCalendar(false);
    setShowSummary(false);
  };

  const handleCalendarClick = () => {
    setShowCreateUserForm(false);
    setShowCalendar(true);
    setShowSummary(false);
  };

  const handleSummaryClick = () => {
    setShowCreateUserForm(false);
    setShowCalendar(false);
    setShowSummary(true);
  };

  const handleCreateUser = async (formData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Usuario creado exitosamente");
      } else {
        console.error("Error al crear usuario");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setShowCreateUserForm(false);
    }
  };

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
    <div className="admin-dashboard">
      <div className="menu">
        <button onClick={handleCreateUserClick}>Crear Usuario</button>
        <button onClick={handleCalendarClick}>Calendario</button>
        <button onClick={handleSummaryClick}>Resumen</button>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      <div className="option">
        {showCreateUserForm && <UserCreationForm onCreateUser={handleCreateUser}/>}
        {showCalendar && <ScheduleGuard/>}
        {showCalendar && <ScheduleUti/>}
        {showSummary && <Summary/>}
      </div>
    </div>
  );
}

export default AdminDashboard;
