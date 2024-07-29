import React, { useEffect, useState } from "react";

function ArtistName({ artistId }) {
  const [artistName, setArtistName] = useState("");
  const [loading, setLoading] = useState(true);
  const token = "b309c840f86b9f63548c680f36c7e6ef1e62dc00";

  useEffect(() => {
    const fetchArtistName = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + `harmonyhub/artists/${artistId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setArtistName(data.name);
        } else {
          setArtistName("No se encontro Artista");
        }
      } catch (error) {
        console.error("Error obtener nombre del artista:", error);
        setArtistName("Artista Inexistente");
      } finally {
        setLoading(false);
      }
    };

    fetchArtistName();
  }, [artistId]);

  if (loading) {
    return <span>cargando...</span>;
  }

  return <span>{artistName}</span>;
}

export default ArtistName;
