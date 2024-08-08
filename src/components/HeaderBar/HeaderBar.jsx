import "./HeaderBar.css";
import MenuItem from "./MenuItem.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import menuItemLO from "./menuItemLO.json";
import menuItemLI from "./menuItemLI.json";

function HeaderBar() {
  const { isAuthenticated } = useAuth("state");

  const menuItems = isAuthenticated ? menuItemLI : menuItemLO;

  return (
    <header>
      <nav className="menu_container">
        <section className="menu_logo">
          <a href="/">
            <i className="lab la-mastodon"></i>SONORA
          </a>
        </section>

        <ul className="menu_links">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              path={item.path}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </ul>

        <div className="menu_hamburguer">
          <i className="las la-bars"></i>
        </div>
      </nav>
    </header>
  );
}

export default HeaderBar;
