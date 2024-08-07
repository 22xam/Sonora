import React from "react";

function HeaderAlbums() {
  return (
    <section className="header-albums">
      <section className="header-albums-title">
        <h2>Álbumes que No Puedes Perderte</h2>
      </section>
      <section className="header-albums-card-create">
        <img src="./src/assets/albums.jpg" alt="nuevo-albums" />
        <p>
          ¡Deja que tu música hable por ti! Crea un álbum, comparte tus
          emociones y conecta con el mundo. Es tu momento de brillar y dejar una
          huella en los corazones.
        </p>
        <label className="header-albums-btn-create">DA VIDA A TU MUSICA</label>
      </section>
    </section>
  );
}

export default HeaderAlbums;
