import "./FooterBar.css";

function FooterBar() {
  return (
    <div>
      <footer>
        <section className="section-footer">
          <h3>¿Por que usar SONORA?</h3>
          <a href="#">Misión</a>
          <a href="#">Visión</a>
          <a href="#">Descripcioón</a>
          <a href="#">A cerca de...</a>
        </section>
        <section className="section-footer">
          <h3>Desarrolladores</h3>
          <p>Suarez Matias Gonzalo</p>
          <p>Fernando Daniel Barroso</p>
        </section>
        <section className="section-footer">
          <h3>Recursos</h3>
          <a href="#">
            <i className="lab la-react"></i> React
          </a>
          <a href="#">
            <i className="las la-play"></i> Vite
          </a>
          <a href="#">
            <i className="las la-play"></i> Bulma
          </a>
          <a href="#">Institutción UPATECO</a>
        </section>
        <section className="section-footer">
          <h3>SONORA</h3>
          <a href="#">Conócenos</a>
          <a href="#">Noticias</a>
          <a href="#">Ayuda</a>
          <p>SONORA@gmail.com</p>
        </section>
      </footer>
    </div>
  );
}

export default FooterBar;
