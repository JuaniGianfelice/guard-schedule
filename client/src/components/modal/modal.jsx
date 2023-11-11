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
      title,
      dale: date.toISOString(),
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
          <DateTime value={date} onChange={(newDate) => setDate(newDate)} dateFormat="DD-MM-YYYY" timeFormat="HH:mm"/>
        </div>
        <button type="submit">Agregar</button>
      </form>
    </Modal>
  );
};
export default AddEventModal;

/*
const Modal = (state, changeState) => {
    return (
        <>
            {state &&
                <div className="modal">
                    <section>
                        <button className="close">Cerrar</button>
                        <div className="options">
                            <form>
                                <select id="proffesional">
                                    <option value="" disabled selected>Selecciona una opción</option>
                                    <option value="opcion1">Opción 1</option>
                                    <option value="opcion2">Opción 2</option>
                                    <option value="opcion3">Opción 3</option>
                                    <option value="opcion4">Opción 4</option>
                                </select>
                            </form>
                            <button>Aregar</button>
                        </div>
                    </section>
                </div>
            }
        </>
    )
}*/

/*

    return (
        <div>
            <form>
                <select id="proffesional">
                    <option value="" disabled selected>Selecciona una opción</option>
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                    <option value="opcion4">Opción 4</option>
                </select>
            </form>
            <button onClick={handleAdd}>Aregar</button>
        </div>
    )*/
