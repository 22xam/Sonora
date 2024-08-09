import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { logout } = useAuth("actions");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("Has cerrado sesión correctamente");
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="">
      Cerrar sesión
    </button>
  );
}

export default Logout;
