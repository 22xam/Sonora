import React, { useEffect, useState } from "react";
import CardAlbums from "./CardAlbums";

const ListAlbums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/harmonyhub/albums/",
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
          console.log(data);
          setAlbums(data.results);
        } else {
          console.error(
            "Error al recueperar los albunes:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error al recueperar los albunes:", error);
      }
    };

    fetchAlbums();
  }, [token]);

  return (
    <>
      <div className="bar-title">
        <h2>Listado de Albunes</h2>
      </div>
      <div className="album-list">
        {albums.map((album) => (
          <CardAlbums
            id={album.id}
            created={album.created_at}
            update={album.updated_at}
            title={album.title}
            year={album.year}
            cover={album.cover}
            artist={album.artist}
            owner={album.owner}
          />
        ))}
      </div>
    </>
  );
};

export default ListAlbums;
