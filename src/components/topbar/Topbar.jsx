import "./topbar.scss";

const Topbar = () => {
  return (
    <div className='topbar '>
      <ul className="menu">
        <li className="options"><a href="/">Sector</a></li>
        <li className="options"><a href="/">Piso</a></li>
        <li className="out"><a href="/">Salir</a></li>
        <li>
          <select id="selector">
            <option value="" disabled selected>Selecciona una opción</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
            <option value="opcion4">Opción 4</option>
          </select></li>
      </ul>
    </div >
  );
}

export default Topbar