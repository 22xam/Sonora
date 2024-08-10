import "./Auth.css";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth("actions");

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
        swal({
          title: "Bienvenido a Sonora",
          text: "¡Prepárate para disfrutar de buena música!",
          icon: "success",
          buttons: "Aceptar",
          timer: "2000",
        });
        login(result.token);
        //localStorage.setItem("token", result.token);
        localStorage.setItem("user", data.username);
        //console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("user"));
      } else {
        console.error("Error en el inicio de sesión", response.statusText);
        alert("Error en el inicio de sesión");
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
