import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function MenuItem({ path, label, icon }) {
  const { logout } = useAuth("actions");
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (label === "Cerrar") {
      e.preventDefault();
      logout();
      alert("Has cerrado sesión correctamente");
      navigate("/");
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
