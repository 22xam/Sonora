import React from "react";
import { format } from "date-fns";
import ArtistField from "./ArtistField";

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    console.log(date);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  } catch (error) {
    console.error("Error formatiando fecha:", error);
    return "Fecha Invalida";
  }
}

function CardAlbums({
  id,
  created_at,
  updated_at,
  title,
  year,
  cover,
  artist,
  owner,
}) {
  return (
    <div className="album-card">
      <img
        src={cover || "/src/assets/mini_logo.jpg"}
        alt={`${title} cover`}
        className="album-image"
      />
      <div className="details">
        <div className="title">
          <strong></strong> {title}
        </div>
        <div>
          <strong>Año:</strong> {year ? year : "N/A"}
        </div>
        <div>
          <strong>Artista:</strong>{" "}
          <ArtistField artistId={artist} field="name" />
        </div>
        <div>
          <strong>Biografia:</strong>{" "}
          <ArtistField artistId={artist} field="bio" />
        </div>
        <div>
          <strong>Sitio Web:</strong>{" "}
          <ArtistField artistId={artist} field="website" />
        </div>
      </div>
    </div>
  );
}

export default CardAlbums;
