import React, { useState } from "react";
import "./userCreationForm.scss"

const UserCreationForm = ({ onCreateUser }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Medico',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateUser(formData);
  };

  return (
    <div className="dash">

      <form className="form" onSubmit={handleSubmit}>
        <label className="form-group">
          Usuario:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label className="form-group">
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <label className="form-group">
          Rol:
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Admin">Admin</option>
            <option value="Coordinador">Coordinador</option>
            <option value="Medico">Médico</option>
          </select>
        </label>
        <button className="btn-create" type="submit">Crear</button>
      </form>
    </div>
  );
};

export default UserCreationForm;

