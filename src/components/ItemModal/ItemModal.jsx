import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ card, onClose, onDelete, activeModal }) {
  const currentUser = useContext(CurrentUserContext);

  if (!card) return null;

  const isOwn = card.owner === currentUser?._id;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button className="modal__close" type="button" onClick={onClose}>
          <img src="src/assets/closebtn.svg" alt="Close" />
        </button>
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