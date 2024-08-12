import { useState, useEffect } from "react";
import swal from "sweetalert";
import "./ArtistForm.css";

const ArtistForm = ({ artistId , onClose }) => {
  const [artistData, setArtistData] = useState({
    name: "",
    bio: "",
    image: null,
    website: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("authToken");
  const apiUrl = "https://sandbox.academiadevelopers.com/harmonyhub/artists/";

  useEffect(() => {
    if (artistId) {
      setIsLoading(true);
      fetch(`${apiUrl}${artistId}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setArtistData({
            name: data.name || "",
            bio: data.bio || "",
            image: data.image || null,
            website: data.website || "",
          });
          setPreviewImage(data.image || null);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching artist data:", error);
          setIsLoading(false);
        });
    }
  }, [artistId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArtistData({
      ...artistData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setArtistData({
      ...artistData,
      image: file,
    });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", artistData.name);
    formData.append("bio", artistData.bio);

    if (artistData.image && typeof artistData.image === "object") {
      formData.append("image", artistData.image);
    }
    formData.append("website", artistData.website);

    const url = `${apiUrl}${artistId}/`;
    const method = "PUT";

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
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
        <h2 className="tit-edit-artist">Editar Artista</h2>
        <form onSubmit={handleSubmit}>
          <div className="titulos">
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={artistData.name}
              onChange={handleInputChange}
              required
              maxLength={255}
              minLength={1}
            />
          </div>
          <div className="titulos">
            <label>Biografía:</label>
            <textarea
              name="bio"
              value={artistData.bio}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="titulos">
            <label>Imagen del artista: </label>
            <label className="custom-file-upload">
              <input
                type="file"
                name="image"
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
            <label>Sitio web: </label>
            <input
              type="url"
              name="website"
              value={artistData.website}
              onChange={handleInputChange}
            />
          </div>
          <div className="boton-actualizar-container">
            <button className="boton-actualizar-artist" type="submit" disabled={isLoading}>
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArtistForm;