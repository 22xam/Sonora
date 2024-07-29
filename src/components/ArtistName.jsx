import React, { useEffect, useState } from "react";

function ArtistName({ artistId }) {
  const [artistName, setArtistName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistName = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + `harmonyhub/artists/${artistId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
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
