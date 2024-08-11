import React, { useState, useEffect } from "react";
import "./AlbumForm.css";

const AlbumForm = ({ albumId = null, onClose }) => {
  const [albumData, setAlbumData] = useState({
    title: "",
    year: "",
    cover: null,
    artist: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(!!albumId);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("authToken");
  const apiUrl = "https://sandbox.academiadevelopers.com/harmonyhub/albums/";

  useEffect(() => {
    if (isEditMode && albumId) {
      setIsLoading(true);
      fetch(`${apiUrl}${albumId}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAlbumData({
            title: data.title || "",
            year: data.year || "",
            cover: data.cover || null,
            artist: data.artist || "",
          });
          setPreviewImage(data.cover || null);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching album data:", error);
          setIsLoading(false);
        });
    }
  }, [albumId, isEditMode, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlbumData({
      ...albumData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAlbumData({
      ...albumData,
      cover: file,
    });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", albumData.title);
    formData.append("year", albumData.year);

    if (albumData.cover && typeof albumData.cover === "object") {
      formData.append("cover", albumData.cover);
    }
    formData.append("artist", albumData.artist);

    const url = isEditMode ? `${apiUrl}${albumId}/` : apiUrl;
    const method = isEditMode ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        swal({
          title: "La operación fue exitosa",
          text: "La operación fue exitosa",
          icon: "success",
          timer: "3000",
        });
        console.log("Success:", data);
        setIsLoading(false);
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 className="tit-edit-album">{isEditMode ? "Editar Álbum" : "Crear Álbum"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="titulos">
            <label>Título:</label>
            <input
              type="text"
              name="title"
              value={albumData.title}
              onChange={handleInputChange}
              required
              maxLength={255}
              minLength={1}
            />
          </div>
          <div className="titulos">
            <label>Año:</label>
            <input
              type="number"
              name="year"
              value={albumData.year}
              onChange={handleInputChange}
              max={2147483647}
              min={-2147483648}
            />
          </div>
          <div className="titulos">
            <label>Portada del álbum:  </label>
            <label className="custom-file-upload">
              <input
                type="file"
                name="cover"
                accept="image/*"
                onChange={handleFileChange}
              />
              
              Elegir archivo
            </label>
          </div>
          {previewImage && (
            <div className="preview">
              <img src={previewImage} alt="Preview" className="preview-image" />
            </div>
          )}
          <div className="titulos">
            <label>Artista:</label>
            <input
              type="number"
              name="artist"
              value={albumData.artist}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="boton-actualizar-container">
            <button className="boton-actualizar-album" type="submit" disabled={isLoading}>
              {isEditMode ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlbumForm;