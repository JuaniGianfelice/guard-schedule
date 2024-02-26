import { useState } from "react";
import "./modal.scss";
import Modal from "react-modal";
import DateTime from "react-datetime";
import axios from "axios";
import moment from 'moment'; // Importar moment.js para formatear la fecha

const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    title: "",
    date: "",
  });
  const professionals = ["Fuentes Omar", "Lopez Mario", "Pacheco Luisa", "Parra Carlos", "Rivas Luis"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = moment(date).toISOString(); // Formatear la fecha con moment.js

    onEventAdded({
      title: formData.title,
      date: formattedDate,
    });
    onClose();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/eventsUti",
        {
          title: formData.title,
          date: formattedDate, // Enviar la fecha formateada al backend
        }
      );

      if (response.data.success) {
        console.log("Evento creado con éxito");
      } else {
        console.error(
          "Error al crear Evento:",
          response.data.message || "Error desconocido"
        );
      }
    } catch (error) {
      console.error(
        "No se pudo crear el Evento:",
        error.response
          ? error.response.data.message
          : error.message || "Error desconocido"
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={handleSubmit} className="modal">
        <div className="section">
          <label>Seleccionar Profesional</label>
          <select
            value={formData.title}
            name="title"
            onChange={handleChange}
          >
            <option value="" disabled>
              Seleccionar profesional
            </option>
            {professionals.map((professional) => (
              <option key={professional} value={professional}>
                {professional}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Ingresar Fecha</label>
          <DateTime
            value={date}
            onChange={(newDate) => setDate(newDate)}
            dateFormat="DD-MM-YYYY"
            timeFormat={false}
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
    </Modal>
  );
};

export default AddEventModal;
