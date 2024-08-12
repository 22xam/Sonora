import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./CardArtist.css";
import ArtistForm from "./ArtistForm";

function CardArtist({ id, name, bio, image, website, onArtistUpdated }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCloseForm = () => {
    setIsEditMode(false);
    if (onArtistUpdated) onArtistUpdated();
  };

  const handleDeleteClick = () => {
    swal({
      title: "¿Seguro de eliminar el Artista?",
      text: "Eliminar al artista no podrá deshacer esta operación",
      icon: "warning",
      buttons: ["No", "Sí, Seguro"],
    }).then((willDelete) => {
      if (willDelete) {
        const token = localStorage.getItem("authToken");
        fetch(`https://sandbox.academiadevelopers.com/harmonyhub/artists/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              swal("Artista eliminado con éxito", {
                icon: "success",
              });
              setIsDeleted(true);
            } else {
              swal({
                title: "Error al eliminar el artista",
                text: "No eres propietario del artista",
                icon: "error",
                timer: 3000,
              });
            }
          })
          .catch((error) => {
            console.error("Error eliminando el artista:", error);
            swal("Error al eliminar el artista", {
              icon: "error",
            });
          });
      }
    });
  };

  const handleOpenClick = () => {
    navigate(`/Artists/${id}`, { state: { name, bio, image, website } });
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="artist-card">
      <img 
        src={image || "/src/assets/mini_logo.jpg"} 
        alt={name}
        className="artist-image" 
      />
      <div className="details">
        <h3 className="letras">Artista: {name}</h3>
        <song className="letras">Biografía:</song>
        <p className="bio">{bio || "No hay datos sobre su bio"}</p>
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            Visita su sitio web haciendo click aquí
          </a>
        )}
        <div className="botones-albums">
          <label className="btn-editar" onClick={handleEditClick}>
            Editar <i className="las la-edit"></i>
          </label>
          <label className="btn-eliminar" onClick={handleDeleteClick}>
            Eliminar <i className="las la-trash"></i>
          </label>
        </div>
      </div>
      {isEditMode && <ArtistForm artistId={id} onClose={handleCloseForm} />}
    </div>
  );
}

export default CardArtist;