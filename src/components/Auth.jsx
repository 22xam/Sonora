import React, { useState } from "react";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "api-auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Inicio de sesión exitoso", result);
        alert("Inicio de sesión exitoso");
        localStorage.setItem("token", result.token);
        console.log(localStorage.getItem("token"));
        // Aquí puedes manejar el resultado como necesites, por ejemplo:
        // - Guardar el token en el estado o en el almacenamiento local
        // - Redirigir al usuario a otra página
      } else {
        console.error("Error en el inicio de sesión", response.statusText);
        alert("Error en el inicio de sesión");
        // Aquí puedes manejar el error de inicio de sesión, por ejemplo:
        // - Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
      alert("Error en la solicitud");
      // Aquí puedes manejar errores de red o de servidor
    }
  };

  return (
    <main>
      <section className="login-registro">
        <article className="container-form logueo">
          <form onSubmit={handleSubmit}>
            <p className="icono">
              <img src="/src/assets/mini_logo.jpg" alt=""></img>
            </p>
            <h2>Inicia Sesion</h2>
            <div className="container-input form-group">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <i className="las la-user"></i>
              <label>Usuario</label>
            </div>
            <div className="container-input form-group">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="las la-lock"></i>
              <label>Contraseña</label>
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
  );
}

export default Auth;
