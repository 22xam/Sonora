import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { logout } = useAuth("actions");
  const navigate = useNavigate();

  const handleLogout = () => {
    swal({
      title: "¿Seguro que quieres salir?",
      text: "Se cerrará tu sesión actual.",
      icon: "warning",
      buttons: ["NO", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        console.log(respuesta);
        logout();
        navigate("/");
      } else {
        navigate("/perfil");
      }
    });
    //navigate("/");

  };

  return (
    <button onClick={handleLogout} className="">
      Cerrar sesión
    </button>
  );
}

export default Logout;
