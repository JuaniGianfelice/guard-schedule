import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="index">
      <div className="container">
        <h1>Calendario de Guardias</h1>
        <p>
          Sistema de carga de guardias médicas y liquidación de honorarios.<br />
          Estuvo en uso en una clínica privada para reemplazar el control manual
          en planilla.<br /><br />
          Esta es una demo con datos ficticios. Podés entrar con cualquiera de
          los siguientes usuarios<br />
          para ver cómo cambia la aplicación según el rol.
        </p>

        <ul>
          <li><h4>Administrador:</h4> admin / admin1</li>
        </ul>
        <ul>
          <li><h4>Coordinador de guardia:</h4> coordinador / coordinador1</li>
        </ul>
        <ul>
          <li><h4>Coordinador de UTI:</h4> coordinadoruti / coordinador1</li>
        </ul>
        <ul>
          <li><h4>Médico:</h4> medico / medico1</li>
        </ul>

        <button onClick={() => navigate("/home")}>Entrar a la demo</button>
      </div>
    </div>
  );
};

export default Landing;
