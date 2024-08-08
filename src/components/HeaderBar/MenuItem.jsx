function MenuItem({ path, label, icon }) {
  return (
    <li className="menu_item">
      <a href={path} className="menu_link">
        <i className={icon}></i>
        {label}
      </a>
    </li>
  );
}

export default MenuItem;
