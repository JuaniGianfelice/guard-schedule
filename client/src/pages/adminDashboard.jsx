import React, { useState } from "react";
import "../index.scss";
import UserCreationForm from "../components/userCreationForm/userCreationForm";
import Schedule from "../components/schedule/schedule";
import Summary from "../components/summary/summary";

const AdminDashboard = () => {
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

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

  return (
    <div className="admin-dashboard">
      <div className="menu">
        <button onClick={handleCreateUserClick}>Crear Usuario</button>
        <button onClick={handleCalendarClick}>Calendario</button>
        <button onClick={handleSummaryClick}>Resumen</button>
        <button>Cerrar Sesion</button>
      </div>
      <div className="option">
        {showCreateUserForm && <UserCreationForm onCreateUser={handleCreateUser}/>}
        {showCalendar && <Schedule/>}
        {showSummary && <Summary/>}
      </div>
    </div>
  );
}

export default AdminDashboard;
