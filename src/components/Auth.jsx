function Auth() {
  return (
    <>
      <body>
        <main>
          <section className="login-registro">
            <article className="container-form logueo">
              <form action="#">
                <p className="icono">
                  <img src="/src/assets/mini_logo.jpg" alt=""></img>
                </p>
                <h2>Inicia Sesion</h2>
                <div className="container-input form-group">
                  <input type="text" required></input>
                  <i className="las la-user"></i>
                  <label for="">Usuario</label>
                </div>
                <div className="container-input form-group">
                  <input type="password" required />
                  <i className="las la-lock"></i>
                  <label for="">Contraseña</label>
                </div>
                <div>
                  <button className="btn" type="submit">
                    Iniciar sesion
                  </button>
                </div>
              </form>
            </article>
          </section>
        </main>
      </body>
    </>
  );
}

export default Auth;
