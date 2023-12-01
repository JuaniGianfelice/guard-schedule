import DateTime from "react-datetime";

const Summary = () => {
    return (
        <div>
            <p>Seleccionar Periodo</p>
            <DateTime dateFormat="DD-MM-YYYY" timeFormat={false} />
            <DateTime dateFormat="DD-MM-YYYY" timeFormat={false} />
            <button>Buscar</button>
        </div>
    )
}

export default Summary