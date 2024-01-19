// modal.jsx

import { useState } from "react";
import "./modal.scss";
import Modal from "react-modal";
import DateTime from "react-datetime";

const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const [date, setDate] = useState(new Date());

  const professionals = ["Profesional1", "Profesional2", "Profesional3", "Profesional4", "Profesional5"];

  const onSubmit = (event) => {
    event.preventDefault();

    onEventAdded({
      title: selectedProfessional, // Usamos "title" en lugar de "professional"
      date: date.toISOString(),
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit} className="modal">
        <div className="section">
          <label>Seleccionar Profesional</label>
          <select value={selectedProfessional} onChange={(e) => setSelectedProfessional(e.target.value)}>
            <option value="" disabled>Seleccionar profesional</option>
            {professionals.map((professional) => (
              <option key={professional} value={professional}>{professional}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Ingresar Fecha</label>
          <DateTime value={date} onChange={(newDate) => setDate(newDate)} dateFormat="DD-MM-YYYY" timeFormat={false} />
        </div>
        <button type="submit">Agregar</button>
      </form>
    </Modal>
  );
};

export default AddEventModal;
