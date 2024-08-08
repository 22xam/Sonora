import { Outlet } from "react-router-dom";
import { AuthProvider } from "../components/contexts/AuthContext.jsx";
import HeaderBar from "../components/HeaderBar/HeaderBar.jsx";
import FooterBar from "../components/FooterBar/FooterBar.jsx";

export default function Layout() {
  return (
    <AuthProvider>
      <HeaderBar />
      <Outlet />
      <FooterBar />
    </AuthProvider>
  );
}
