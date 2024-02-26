import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    user: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', loginData);

      if (response.data.success) {
        console.log("Inicio de sesión exitoso");

        const userRole = response.data.rol;
        switch (userRole) {
          case 'Admin':
            navigate('/AdminDashboard');
            break;
          case 'Coordinador':
            const userCalendar = response.data.calendar_type
            switch (userCalendar) {
              case 'Guardia':
                navigate('/GuardDashboard');
                break;
              case 'Uti':
                navigate('/UtiDashboard');
                break;
            }            
            break;
          case 'Medico':
            navigate('/VisitDashboard'); 
            break;
          default:
            navigate('/VisitDashboard');
            break;
        }
        
      } else {
        console.error("Error al iniciar sesión:", response.data.message || "Error desconocido");
      }
    } catch (error) {
      console.error("No se pudo iniciar sesión:", error.response ? error.response.data.message : error.message || "Error desconocido");
    }
  };

  return (
    <div className="home">
      <div className="container">
        <h1 className="title">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="user">Usuario:</label>
            <input type="text" id="user" name="user" placeholder="Ingrese su usuario" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" required onChange={handleChange} />
          </div>
          <button type="submit" className="btn-login">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
