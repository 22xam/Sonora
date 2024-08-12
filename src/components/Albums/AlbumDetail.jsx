import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ArtistField from "../Artist/ArtistField";
import "./AlbumDetail.css";
import AlbumSongs from "./AlbumSongs.jsx";

function AlbumDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { title, cover, year, artist } = location.state || {};
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <section className="fondo">
      <div className="cont-volver">
      <button onClick={handleBackClick} className="btn-volver">
          Volver a Albums
        </button>
      </div>
      <div className="album-detail-container">
        <div className="album-detail-header">
          <img
            src={cover || "/src/assets/mini_logo.jpg"}
            alt={`${title} cover`}
            className="album-detail-image"
          />
          <div className="album-detail-info">
            <h1 className="titulo-album">{title}</h1>
            <p>Año:  {year}
            </p>
            <p>Artista: <ArtistField artistId= {artist} field="name" /> </p>
            <p className="album-detail-info-biografia">Biografia: <ArtistField artistId= {artist} field="bio" /> </p>
            
            <a href="/Songs/create">
              <label className="header-albums-btn-create">Agregar canciones a este album</label>
            </a>
          </div>
        </div>
      </div>
      <AlbumSongs />
    </section>
  );
}

export default AlbumDetail;
