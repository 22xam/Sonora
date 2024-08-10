import React, { useState } from "react";
import AlbumForm from "./AlbumForm";
import "./HeaderAlbums.css";

function HeaderAlbums() {
  const [isCreateMode, setIsCreateMode] = useState(false);

  const handleAddClick = () => {
    setIsCreateMode(true);
  };

  const handleCloseForm = () => {
    setIsCreateMode(false);
  };

  return (
    <section className="header-albums">
      <section className="header-albums-title">
        <h2>Álbumes que No Puedes Dejar de Escuchar</h2>
      </section>
      <section className="header-albums-card-create">
        <img src="../src/assets/albums.jpg" alt="nuevo-albums" />
        <p>
          ¡Deja que tu música hable por ti! Agrega un álbum, comparte tus
          gustos, emociones y conectate con el mundo. Es tu momento de mostrar
          lo que te gusta.
        </p>
        <a href="/Albums/create">
          <label className="header-albums-btn-create">Agregar</label>
        </a>
      </section>
      {isCreateMode && <AlbumForm onClose={handleCloseForm} />}
    </section>
  );
}

export default HeaderAlbums;
