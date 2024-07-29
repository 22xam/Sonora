import React from "react";
import { format } from "date-fns";
import ArtistName from "./ArtistName.jsx";

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
          <strong>Titulo:</strong> {title}
        </div>
        <div>
          <strong>ID:</strong> {id}
        </div>
        <div>
          <strong>Created At:</strong> {formatDate(created_at)}
        </div>
        <div>
          <strong>Updated At:</strong> {new Date(updated_at).toLocaleString()}
        </div>

        <div>
          <strong>Year:</strong> {year ? year : "N/A"}
        </div>
        <div>
          <strong>Artist:</strong> <ArtistName artistId={artist} />
        </div>
        <div>
          <strong>Owner:</strong> {owner}
        </div>
      </div>
    </div>
  );
}

export default CardAlbums;
