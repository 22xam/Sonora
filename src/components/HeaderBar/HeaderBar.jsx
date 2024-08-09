import { useState } from "react";
import "./HeaderBar.css";
import MenuItem from "./MenuItem.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import menuItemLO from "./menuItemLO.json";
import menuItemLI from "./menuItemLI.json";
import logo from "../../assets/logo.png";

function HeaderBar() {
  const { isAuthenticated } = useAuth("state");
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = isAuthenticated ? menuItemLI : menuItemLO;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className="menu_container">
        <section className="menu_logo">
          <a href="/">
            <img src={logo} alt="Logo" className="logo" />
            <span>SONORA</span>
          </a>
        </section>

        <ul className={`menu_links ${menuOpen ? "menu_links_show" : ""}`}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              path={item.path}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </ul>

        <div className="menu_hamburguer" onClick={toggleMenu}>
          <i className="las la-bars"></i>
        </div>
      </nav>
    </header>
  );
}

export default HeaderBar;