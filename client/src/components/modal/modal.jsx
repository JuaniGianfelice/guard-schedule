import { useState } from "react";
import "./modal.scss";
import Modal from "react-modal";
import DateTime from "react-datetime";

const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());

  const onSubmit = (event) => {
    event.preventDefault();

    onEventAdded({
      title: title,
      date: date.toISOString(),
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>
        <input
          placeholder="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <label>Ingresar Fecha</label>
          <DateTime value={date} onChange={(newDate) => setDate(newDate)} dateFormat="DD-MM-YYYY" timeFormat={false}/>
        </div>
        <button type="submit">Agregar</button>
      </form>
    </Modal>
  );
};

export default AddEventModal;