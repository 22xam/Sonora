import React, { useState, useEffect } from "react";
import axios from "axios";

const ArtistSelector = ({ onArtistChange }) => {
  const [artists, setArtists] = useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const { token } = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/harmonyhub/artists/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        setArtists(response.data.results);
      } catch (error) {
        console.error("Error al obtener artistas:", error);
      }
    };

    fetchArtists();
  }, [token]);

  const handleArtistChange = (event) => {
    const selectedId = event.target.value;
    setSelectedArtistId(selectedId);
    onArtistChange(selectedId);
  };

  return (
    <div>
      <label htmlFor="artist-select">Seleccione un Artista:</label>
      <select
        id="artist-select"
        onChange={handleArtistChange}
        value={selectedArtistId || ""}
      >
        <option value="">--Selecciona un artista--</option>
        {artists.map((artist) => (
          <option key={artist.id} value={artist.id}>
            {artist.name}
          </option>
        ))}
      </select>
      {selectedArtistId && <p> Artista ID: {selectedArtistId}</p>}
    </div>
  );
};

export default ArtistSelector;
