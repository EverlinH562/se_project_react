import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <form className="modal__form" onSubmit={handleSubmit}>
        <h3 className="modal__title">Edit Profile</h3>
        <label className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="modal__label">
          Avatar URL
          <input
            type="url"
            className="modal__input"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />
        </label>
        <div className="modal__buttons">
          <button type="submit" className="modal__save-button">
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button type="button" className="modal__close-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileModal;