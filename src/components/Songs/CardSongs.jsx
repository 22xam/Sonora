import PropTypes from "prop-types";
import "../Songs/CardSongs.css";
import { useState } from "react";

function CardSong({ song }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para el cartel de carga

  const handleDeleteClick = () => {
    swal({
      title: "¿Seguro de eliminar la cancion?",
      text: "Eliminará la canción y no podrá deshacer esta operación",
      icon: "warning",
      buttons: ["No", "Sí, seguro"],
    }).then((willDelete) => {
      if (willDelete) {
        setIsLoading(true); // Mostrar cartel de carga
        const token = localStorage.getItem("authToken");
        fetch(`${import.meta.env.VITE_API_URL}harmonyhub/songs/${song.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        })
          .then((response) => {
            setIsLoading(false); // Ocultar cartel de carga
            if (response.ok) {
              swal("Canción eliminada con éxito", {
                icon: "success",
              });
              setIsDeleted(true);
            } else {
              swal({
                title: "Error al eliminar la canción",
                text: "No eres propietario de la canción",
                icon: "error",
                timer: "2000",
              });
            }
          })
          .catch((error) => {
            setIsLoading(false); // Ocultar cartel de carga
            console.error("Error eliminando la canción:", error);
            swal("Error al eliminar la canción", {
              icon: "error",
            });
          });
      }
    });
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="song-card">
      {isLoading && <p>Cargando...</p>} {/* Mostrar cartel de carga */}
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className={"song-name"}>{song.title}</p>
          </div>
        </div>
        <div className="content audio-player">
          <audio controls>
            <source src={song.song_file} type="audio/mpeg" />
            El navegador no soporta el elemento de audio.
          </audio>
        </div>
        <div className="botones-songs">
          <label className="btn-eliminar" onClick={handleDeleteClick}>
            Eliminar <i className="las la-trash"></i>
          </label>
        </div>
      </div>
    </div>
  );
}

CardSong.propTypes = {
  song: PropTypes.shape({
    title: PropTypes.string.isRequired,
    song_file: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardSong;
