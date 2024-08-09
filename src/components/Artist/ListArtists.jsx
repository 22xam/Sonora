import React, { useState, useEffect } from "react";
import axios from "axios";
import CardArtist from "./CardArtist.jsx";
import HeaderArtist from "./HeaderArtist.jsx";

function ArtistList() {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://sandbox.academiadevelopers.com/harmonyhub/artists/"
  );

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get(currentPageUrl, {
          headers: {
            Authorization: "Token b309c840f86b9f63548c680f36c7e6ef1e62dc00",
          },
        });
        setArtists(response.data.results);
        setFilteredArtists(response.data.results);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, [currentPageUrl]);

  useEffect(() => {
    const results = artists.filter((artist) =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArtists(results);
  }, [searchTerm, artists]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPageUrl(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      setCurrentPageUrl(previousPage);
    }
  };

  return (
    <div>
      <HeaderArtist />
      <h2>Lista de Artistas</h2>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="artist-list">
        {filteredArtists.map((artist) => (
          <CardArtist
            key={artist.id}
            name={artist.name}
            bio={artist.bio}
            image={artist.image}
            website={artist.website}
          />
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={!previousPage}>
          Anterior
        </button>
        <button onClick={handleNextPage} disabled={!nextPage}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default ArtistList;
