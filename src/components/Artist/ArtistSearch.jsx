import React, { useState, useEffect } from "react";
import axios from "axios";

function ArtistSearch({ onArtistSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = localStorage.getItem("authToken");

  useEffect(() => {
    if (searchTerm.length > 0) {
      searchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setError(null); // Resetear el error al cambiar el término de búsqueda
  };

  const searchSuggestions = async () => {
    setLoading(true);
    setError(null);
    let nextPageUrl = import.meta.env.VITE_API_URL + "/harmonyhub/artists/";
    let allSuggestions = [];

    try {
      while (nextPageUrl) {
        const response = await axios.get(nextPageUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        const filteredArtists = response.data.results.filter((artist) =>
          artist.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        allSuggestions = [...allSuggestions, ...filteredArtists];

        nextPageUrl = response.data.next;
      }

      setSuggestions(allSuggestions);
    } catch (error) {
      console.error("Error al buscar el artista:", error);
      setError("Error al buscar el artista. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (artistId, artistName) => {
    setSearchTerm(artistName);
    setSuggestions([]); 
    onArtistSelect(artistId); 
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const selectedArtist = suggestions.find(
      (artist) => artist.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (selectedArtist) {
      handleSelectSuggestion(selectedArtist.id, selectedArtist.name);
    } else {
      setError("Artista no encontrado");
    }
  };

  return (
    <div>
      <h2>Buscar Artista</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Nombre del artista"
          value={searchTerm}
          onChange={handleSearchChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul style={{ border: "1px solid #ccc", padding: "0", margin: "0" }}>
          {suggestions.map((artist) => (
            <li
              key={artist.id}
              onClick={() => handleSelectSuggestion(artist.id, artist.name)}
              style={{
                cursor: "pointer",
                padding: "10px",
                listStyleType: "none",
              }}
            >
              {artist.name}
            </li>
          ))}
        </ul>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default ArtistSearch;
