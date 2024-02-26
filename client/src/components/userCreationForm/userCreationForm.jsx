import { useState } from "react";
import "./userCreationForm.scss";
import axios from "axios";

const UserCreationForm = ({ onCreateUser }) => {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
    rol: "",
    calendar_type: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users",
        formData
      );

      if (response.data.success) {
        console.log("Usuario creado con éxito");
      } else {
        console.error(
          "Error al crear usuario:",
          response.data.message || "Error desconocido"
        );
      }
    } catch (error) {
      console.error(
        "No se pudo crear el usuario:",
        error.response
          ? error.response.data.message
          : error.message || "Error desconocido"
      );
    }
  };

  return (
    <div className="dash">
      <form className="creation-form" onSubmit={handleSubmit}>
        <label className="creation-form-group">
          Usuario:
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
          />
        </label>
        <label className="creation-form-group">
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <label className="creation-form-group">
          Rol:
          <select name="rol" value={formData.rol} onChange={handleChange}>
            <option value="" disabled hidden>
              Seleccionar rol
            </option>
            <option value="Admin">Admin</option>
            <option value="Coordinador">Coordinador</option>
            <option value="Medico">Médico</option>
          </select>
        </label>
        <label className="creation-form-group">
          Calendario:
          <select
            name="calendar_type"
            value={formData.calendar_type}
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              Tipo de calendario
            </option>
            <option value="Admin">Admin</option>
            <option value="Uti">UTI</option>
            <option value="Guardia">Guardia</option>
          </select>
        </label>
        <button className="btn-create" type="submit">
          Crear
        </button>
      </form>
    </div>
  );
};

export default UserCreationForm;
