import React, { useState, useEffect } from "react";
import "./ProfileForm.css";

const ProfileForm = ({ userId, onClose, onUpdate }) => {
  const [profileData, setProfileData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    dob: "",
    bio: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("authToken");
  const apiUrl = `https://sandbox.academiadevelopers.com/users/profiles/${userId}/`;

  useEffect(() => {
    setIsLoading(true);
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData({
          username: data.username || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          dob: data.dob || "",
          bio: data.bio || "",
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setIsLoading(false);
      });
  }, [apiUrl, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileData({
      ...profileData,
      image: file,
    });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("username", profileData.username);
    formData.append("first_name", profileData.first_name);
    formData.append("last_name", profileData.last_name);
    formData.append("email", profileData.email);
    formData.append("dob", profileData.dob);
    formData.append("bio", profileData.bio);

    fetch(apiUrl, {
      method: "PUT",
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
        onUpdate();
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
        <h2 className="tit-edit-profile">Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <div className="titulos">
            <label>Nombre de Usuario:</label>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleInputChange}
              required
              minLength={1}
            />
          </div>
          <div className="titulos">
            <label>Nombre:</label>
            <input
              type="text"
              name="first_name"
              value={profileData.first_name}
              onChange={handleInputChange}
              required
              minLength={1}
            />
          </div>
          <div className="titulos">
            <label>Apellido:</label>
            <input
              type="text"
              name="last_name"
              value={profileData.last_name}
              onChange={handleInputChange}
              required
              minLength={1}
            />
          </div>
          <div className="titulos">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="titulos">
            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              name="dob"
              value={profileData.dob}
              onChange={handleInputChange}
            />
          </div>
          <div className="titulos">
            <label>Biografía:</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              maxLength={1000}
            />
          </div>
          <div className="boton-actualizar-container">
            <button className="boton-actualizar-profile" type="submit" disabled={isLoading}>
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;