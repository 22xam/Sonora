import { Outlet } from "react-router-dom";
import { AuthProvider } from "../components/contexts/AuthContext.jsx";

export default function Layout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
