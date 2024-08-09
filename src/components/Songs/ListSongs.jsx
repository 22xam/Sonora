import { useState, useEffect } from "react";
import CardSongs from "./CardSongs";
import HeaderSongs from "./HeaderSongs";
import "./ListSongs.css";

export default function ListSongs() {
  const [page, setPage] = useState(1);
  const [nextURL, setNextURL] = useState(null);
  const [songs, setSongs] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const doFetch = async () => {
    if (isFetching) return;
    setIsFetching(true);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }harmonyhub/songs/?page=${page}&page_size=4`
      );
      if (!response.ok) {
        throw new Error("No se pudieron cargar las canciones");
      }
      const data = await response.json();
      if (data.results) {
        setSongs((prevSongs) => [...prevSongs, ...data.results]);
        setNextURL(data.next);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  function handleLoadMore() {
    if (nextURL && !isFetching) {
      setPage((currentPage) => currentPage + 1);
    }
  }

  useEffect(() => {
    doFetch();
  }, [page]);
    return (
        <>
            <HeaderSongs />
            <section className="fondo">
                <div > 
                    <div className="list-songs">
                        <ul className = "song-list">
                            {songs.map((song) => (
                                <li key={song.id} className="song-item">
                                    <CardSongs song={song} className="card-songs-gradient" />
                                </li>
                            ))}
                        </ul>
                        <div className="button-container">
                        {isLoading && <p className = "loading-text">Cargando más canciones...</p>}
                        {nextURL && !isLoading && (
                                <button
                                    className="button"
                                    onClick={handleLoadMore}
                                >
                                    Mostrar más canciones
                                </button>
                        )}
                        {isError && <p>Error al cargar las canciones.</p>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

