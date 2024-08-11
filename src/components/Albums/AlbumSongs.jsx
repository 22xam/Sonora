import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardSong from "../Songs/CardSongs.jsx";
import "../Songs/ListSongs.css";

export default function AlbumSongs() {
  const { id } = useParams(); // Obtener album_pk desde los parámetros de la URL
  const [songs, setSongs] = useState([]);
  const [nextURL, setNextURL] = useState(null);
  const [previousURL, setPreviousURL] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const doFetch = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("No se pudieron cargar las canciones");
      }
      const data = await response.json();

      // Verificar si el álbum tiene canciones
      if (data.count === 0) {
        swal({
          title: "El album no contiene canciones",
          text: "No se agregaron canciones en este album",
          icon: "info",
          button: "Aceptar",
        });
      } else {
        setSongs(data.results);
        setNextURL(data.next);
        setPreviousURL(data.previous);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialURL = `${
      import.meta.env.VITE_API_URL
    }harmonyhub/albums/${id}/songs/`;
    doFetch(initialURL);
  }, [id]);

  const handleNextPage = () => {
    if (nextURL) {
      doFetch(nextURL);
    }
  };

  const handlePreviousPage = () => {
    if (previousURL) {
      doFetch(previousURL);
    }
  };

  return (
    <>
      <section className="fondo">
        <div>
          <div className="list-songs">
            <ul className="song-list">
              {songs.map((song) => (
                <li key={song.id} className="song-item">
                  <CardSong song={song} className="card-songs-gradient" />
                </li>
              ))}
            </ul>
            <div className="button-container">
              {isLoading && (
                <p className="loading-text">Cargando más canciones...</p>
              )}
              <button
                className="button"
                onClick={handlePreviousPage}
                disabled={!previousURL}
              >
                Anterior
              </button>
              <button
                className="button"
                onClick={handleNextPage}
                disabled={!nextURL}
              >
                Siguiente
              </button>
              {isError && <p>Error al cargar las canciones.</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
