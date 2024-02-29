import { useState } from "react";
import "./modal.scss";
import Modal from "react-modal";
import DateTime from "react-datetime";
import axios from "axios";
import moment from 'moment';

const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
  const BeURL = process.env.REACT_APP_BE_URL;
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
        `${BeURL}/api/eventsGuard`,
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
      <button className="close" onClick={onClose}>x</button>
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form">
          <label>Profesional</label>
          <div className="option">
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
          </div>
          <DateTime
            value={date}
            onChange={(newDate) => setDate(newDate)}
            dateFormat="DD-MM-YYYY"
            timeFormat={false}
            className="option"
          />
          <button type="submit" className="btn">Agregar</button>
        </div>
      </form>
    </Modal >
  );
};

export default AddEventModal;
