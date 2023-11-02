import "./topbar.scss";

const Topbar = () => {
  return (
    <div className='topbar '>
      <ul className="menu">
        <li className="options"><a href="/">Sector</a></li>
        <li className="options"><a href="/">Piso</a></li>
        <li className="out"><a href="/">Salir</a></li>        
      </ul>
    </div >
  );
}

export default Topbar