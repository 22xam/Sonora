import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ArtistListBox.css";
import { useNavigate } from "react-router-dom";

function ArtistListBox({ onArtistSelect }) {
  const [artists, setArtists] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    import.meta.env.VITE_API_URL + "/harmonyhub/artists/"
  );
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [selectedArtistId, setSelectedArtistId] = useState(null);

  const navegetion = useNavigate();

  useEffect(() => {
    fetchArtists();
  }, [currentPageUrl]);

  const fetchArtists = async () => {
    try {
      const response = await axios.get(currentPageUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      });

      setArtists(response.data.results);
      setNextPageUrl(response.data.next);
      setPreviousPageUrl(response.data.previous);
    } catch (error) {
      console.error("Error al obtener artistas:", error);
    }
  };

  const handleNextPage = () => {
    if (nextPageUrl) {
      setCurrentPageUrl(nextPageUrl);
    }
  };

  const handNavegation = () => {
    navegetion("/Artist/create");
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      setCurrentPageUrl(previousPageUrl);
    }
  };

  const handleArtistClick = (id) => {
    setSelectedArtistId(id);
    onArtistSelect(id); // Asegúrate de que esta función sea llamada
  };

  return (
    <div className="artist-listbox-container">
      <h2>Lista de Artistas</h2>
      <div className="listbox">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className={`listbox-item ${
              selectedArtistId === artist.id ? "selected" : " "
            }`}
            onClick={() => handleArtistClick(artist.id)}
          >
            <span>{artist.name}</span>
            <span className="id-listbox"> ID:  {artist.id}</span>
          </div>
        ))}
      </div>
      {selectedArtistId && (
        <p>ID del Artista Seleccionado: {selectedArtistId}</p>
      )}
      <div className="pagination-buttons">
        <button
          className="Ant-Sig"
          type="button"
          onClick={handlePreviousPage}
          disabled={!previousPageUrl}
        >
          Anterior
        </button>

        <button
          className="boton-agregar-artista"
          type="button"
          onClick={handNavegation}
        >
          Agregar Artista
        </button>

        <button
          className="Ant-Sig"
          type="button"
          onClick={handleNextPage}
          disabled={!nextPageUrl}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default ArtistListBox;