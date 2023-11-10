import "./modal.scss";


const addGuardModal = ({isOpen, onClose, onGuardAdded}) => {
    return (
        console.log("Ahora si papa")
    )
}
export default addGuardModal


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