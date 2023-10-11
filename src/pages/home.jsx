const Home = () => {
  return (
    <div class="home">
      <div class="container">
        <h1 class="title">Iniciar Sesión</h1>
        <form>
          <div class="form-group">
            <label for="user">Usuario:</label>
            <input type="text" id="user" name="user" placeholder="Ingrese su usuario" />
          </div>
          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" />
          </div>
          <button type="submit" class="btn-login">Ingresar</button>
        </form>
      </div>
    </div>

  );
}

export default Home