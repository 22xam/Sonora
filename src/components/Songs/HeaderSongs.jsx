import "./HeaderSongs.css";

function HeaderSongs() {
  return (
    <section className="header-songs">
      <section className="header-songs-title">
        <h2>Canciones que te van a volar la cabeza</h2>
      </section>
      <section className="header-songs-card-create">
        <img src="../src/assets/songs.jpeg" alt="nuevo-songs" />
        <p>
          ¡Deja que tu música hable por ti! Agrega tus canciones favoritas, comparte tus gustos,
          emociones y conectate con el mundo. Es tu momento de mostrar lo que te gusta.
        </p>
        <a href="/songs/create">
          <label className="header-songs-btn-create">
            Agregar
          </label>
        </a>
      </section>
    </section>
  );
}

export default HeaderSongs;
