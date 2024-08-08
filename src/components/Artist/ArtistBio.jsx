import React, { useEffect, useState } from "react";

function ArtistBio({ artistId }) {
  const [ArtistBio, setArtistBio] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistBio = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + `harmonyhub/artists/${artistId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setArtistBio(data.bio);
        } else {
          setArtistBio("No se encontro Bio del Artista");
        }
      } catch (error) {
        console.error("Error obtener Bio del artista:", error);
        setArtistBio("Bio Inexistente");
      } finally {
        setLoading(false);
      }
    };

    fetchArtistBio();
  }, [artistId]);

  if (loading) {
    return <span>cargando...</span>;
  }

  return <span>{ArtistBio}</span>;
}

export default ArtistBio;
