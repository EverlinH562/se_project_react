import "./DeleteItems.css";

const DeleteItems = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) {
      return null;
    }
    return (
      <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
        <div className="modal__content">
          <p className="modal__warning">
            Are you sure you want to delete this item?
          </p>
          <div className="modal__buttons">
            <button
              className="modal__button modal__button-confirm"
              onClick={onConfirm}
            >
              Yes, delete item
            </button>
            <button
              className="modal__button modal__button-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default DeleteItems;