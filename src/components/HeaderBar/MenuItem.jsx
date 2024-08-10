import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function MenuItem({ path, label, icon }) {
  const { logout } = useAuth("actions");
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (label === "Cerrar") {
      e.preventDefault();
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
          navigate("/");
        }
      });
    }
  };

  return (
    <li className="menu_item">
      <a href={path} className="menu_link" onClick={handleClick}>
        <i className={icon}></i>
        {label}
      </a>
    </li>
  );
}

export default MenuItem;
