import DateTime from "react-datetime";
import "./summary.scss";

const Summary = () => {
    return (
        <div className="dash">
            <div className="container">
                <p className="date-title">Seleccionar Periodo</p>
                <DateTime dateFormat="DD-MM-YYYY" timeFormat={false} className="date-select"/>
                <DateTime dateFormat="DD-MM-YYYY" timeFormat={false} className="date-select"/>
                <button className="btn-search">Buscar</button>
            </div>
        </div>
    )
}

export default Summary