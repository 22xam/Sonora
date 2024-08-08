import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

function Logout() {
  const { logout } = useAuth("actions");

  const handleLogout = () => {
    logout();
    alert("Has cerrado sesión correctamente");
    // Aquí puedes realizar acciones adicionales, como redirigir al usuario
  };

  return (
    <button onClick={handleLogout} className="btn-logout">
      Cerrar sesión
    </button>
  );
}

export default Logout;
