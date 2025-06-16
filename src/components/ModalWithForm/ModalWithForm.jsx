import React from "react";
import "./ModalWithForm.css";

const ModalWithForm = ({
  title,
  children,
  buttonText,
  onClose,
  isOpen,
  formValid,
  onSubmit,
}) => {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose}>
          <img src="src\assets\closebtn.svg" alt="Close" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button
            className="modal__submit"
            type="submit"
            disabled={!formValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;


   
      