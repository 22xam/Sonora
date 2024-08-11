import React, { useState } from "react";
import { format } from "date-fns";
import ArtistField from "../Artist/ArtistField";
import AlbumForm from "./AlbumForm";
import "./CardAlbums.css";

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
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
  onAlbumUpdated,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // New state to manage deletion

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCloseForm = () => {
    setIsEditMode(false);
    if (onAlbumUpdated) onAlbumUpdated();
  };

  const handleDeleteClick = () => {
    swal({
      title: "¿Seguro de eliminar el Album?",
      text: "Eliminara el album no podra desaser esta operacion",
      icon: "warning",
      buttons: ["No", "Si Seguro"],
    }).then((willDelete) => {
      if (willDelete) {
        const token = localStorage.getItem("authToken"); //localStorage.getItem("authToken");
        fetch(
          `https://sandbox.academiadevelopers.com/harmonyhub/albums/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              swal("Album eliminado con éxito", {
                icon: "success",
              });
              setIsDeleted(true);
            } else {
              swal({
                title: "Error al eliminar el album",
                text: "No eres propietario del album",
                icon: "error",
                timer: "2000",
              });
            }
          })
          .catch((error) => {
            console.error("Error eliminando el album:", error);
            swal("Error al eliminar el album", {
              icon: "error",
            });
          });
      }
    });
  };

  if (isDeleted) {
    return null; // Render nothing if the album is deleted
  }

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
        <div className="letras">
          <strong className="letras">Año: </strong> {year ? year : "N/A"}
        </div>
        <div>
          <strong className="letras">Artista: </strong>{" "}
          <ArtistField artistId={artist} field="name" />
        </div>
        <div className="bio">
          <strong className="letras">Biografia </strong>{" "}
          <p>
            <ArtistField artistId={artist} field="bio" />
          </p>
        </div>
        <div>
          <strong className="letras">Sitio Web: </strong>{" "}
          <ArtistField artistId={artist} field="website" />
        </div>
        <div className="botones-albums">
          <label className="btn-abrir">
            Abrir <i className="las la-comments"></i>
          </label>
          <label className="btn-editar" onClick={handleEditClick}>
            Editar <i className="las la-edit"></i>
          </label>
          <label className="btn-eliminar" onClick={handleDeleteClick}>
            Eliminar <i className="las la-trash"></i>
          </label>
        </div>
      </div>
      {isEditMode && <AlbumForm albumId={id} onClose={handleCloseForm} />}
    </div>
  );
}

export default CardAlbums;
