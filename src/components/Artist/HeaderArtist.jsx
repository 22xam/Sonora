import "../Albums/HeaderAlbums.css";

function HeaderArtist() {
  return (
    <section className="header-albums">
      <section className="header-albums-title">
        <h2>Artistas Tu música es tu voz, hazla resonar.</h2>
      </section>
      <section className="header-albums-card-create">
        <img src="/src/assets/artistas.jpeg" alt="nuevo-artista" />
        <p>
          Tu música es tu identidad. No tengas miedo de expresarte y de alcanzar
          tus metas. En este espacio encontrarás herramientas, inspiración y
          oportunidades para hacer crecer tu carrera musical. ¡Tu voz merece ser
          escuchada por el mundo!
        </p>
        <a href="/Artist/create">
          <label className="header-albums-btn-create">Agregar</label>
        </a>
      </section>
    </section>
  );
}

export default HeaderArtist;
