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
    <div className="album-detail-container">
      <button onClick={handleBackClick} className="btn-volver">
        Volver
      </button>
      <div className="album-detail-header">
        <img
          src={cover || "/src/assets/mini_logo.jpg"}
          alt={`${title} cover`}
          className="album-detail-image"
        />
        <div className="album-detail-info">
          <h1>{title}</h1>
          <p>
            <strong>Año: </strong> {year}
          </p>
          <p>
            <strong>Artista: </strong>
            <ArtistField artistId={artist} field="name" />
          </p>
          <p>
            <strong>Biografia: </strong>
            <ArtistField artistId={artist} field="bio" />
          </p>
          <a href="/Songs/create">
            <label className="header-albums-btn-create">Agregar</label>
          </a>
        </div>
      </div>

      <AlbumSongs />
    </div>
  );
}

export default AlbumDetail;
