import "./HeaderArtist.css";

function HeaderArtist() {
  return (
    <section className="header-artist">
      <section className="header-artist-title">
        <h2>Artistas que son tu voz, hazla resonar.</h2>
      </section>
      <section className="header-artist-card-create">
        <img src="https://i.ibb.co/XWq2YWX/artistas.jpg" alt="nuevo-artista" />
        <p>
          Tu música es tu identidad. No tengas miedo de expresarte y de mostrar
          al mundo lo que te. Agrega tus artistas favoritos!!!
        </p>
        <a href="/Artist/create">
          <label className="header-artist-btn-create">Agregar</label>
        </a>
      </section>
    </section>
  );
}

export default HeaderArtist;
