import React, { useState, useEffect } from "react";

function ArtistField({ artistId, field }) {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}harmonyhub/artists/${artistId}`,
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
          setArtist(data);
        } else {
          setArtist({ detalle: "No se encontró al artista" });
        }
      } catch (error) {
        console.error("Error obteniendo artista:", error);
        setArtist({ detalle: "No se encontró al artista" });
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [artistId]);

  if (loading) {
    return <span>Cargando...</span>;
  }
  const fieldValue = artist && artist[field];
  const displayValue =
    fieldValue === undefined || fieldValue === null || fieldValue === ""
      ? "Sin Información"
      : fieldValue;

  return <span>{displayValue}</span>;
}

export default ArtistField;
