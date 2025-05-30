import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ card, onClose, onDelete, activeModal }) {
  const currentUser = useContext(CurrentUserContext);

  if (!card) return null;

  const isOwn = card.owner === currentUser?._id;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_open" : ""}`}>
      <div className="modal__content">
        <button className="modal__close-button" onClick={onClose}>×</button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__title">{card.name}</h2>
          {isOwn && (
            <button className="modal__delete-button" onClick={onDelete}>
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;