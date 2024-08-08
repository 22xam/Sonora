import "./HeaderBar.css";

function HeaderBar() {
  return (
    <header>
      <nav className="menu_container">
        <section className="menu_logo">
          <a href="/">
            <i className="lab la-mastodon"></i>SONORA
          </a>
        </section>

        <ul className="menu_links">
          <li className="menu_item">
            <a href="Albums/List" className="menu_link">
              Albums
            </a>
          </li>
          <li className="menu_item">
            <a href="#Nosotros" className="menu_link">
              Nosotros
            </a>
          </li>
          <li className="menu_item menu_item_show">
            <a href="#Sistema" className="menu_link menu_arrow">
              A cerca des
            </a>
          </li>
          <li className="menu_item menu_item_show">
            <a href="#Desarrolladores" className="menu_link menu_arrow">
              Desarrolladores
            </a>
          </li>
          <li className="menu_item">
            <a href="login" className="menu_link">
              Iniciar sesion
            </a>
          </li>
        </ul>

        <div className="menu_hamburguer">
          <i className="las la-bars"></i>
        </div>
      </nav>
    </header>
  );
}

export default HeaderBar;
