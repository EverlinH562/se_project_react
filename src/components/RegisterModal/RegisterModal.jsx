import { useNavigate } from "react-router-dom";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../utils/useFormAndValidation";

const RegisterModal = ({
  handleCloseModal,
  onSubmit,
  isOpen,
  onLogin,
  isLoading,
}) => {
  const { values, handleChange, isValid, resetForm } = useFormAndValidation();
  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  console.log("Submitting values:", values); 

  if (typeof onSubmit !== 'function') {
    console.error("onSubmit is not a function");
    return;
  }

  const maybePromise = onSubmit(values);

  if (maybePromise && typeof maybePromise.then === 'function') {
    maybePromise
      .then(() => {
        handleCloseModal();
        resetForm();
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  } else {
    console.warn("onSubmit did not return a Promise.");
  }
};

  return (
    <ModalWithForm
  title="Sign Up"
  buttonText={isLoading ? "Registering..." : "Sign Up"}
  onClose={handleCloseModal}
  isOpen={isOpen}
  formValid={isValid}
  onSubmit={handleSubmit}
>
  <label htmlFor="email" className="modal__label">
    Email*
    <input
      type="email"
      className="modal__input"
      id="register-email"
      name="email"
      placeholder="Email"
      value={values.email || ""}
      onChange={handleChange}
      required
    />
  </label>
  <label htmlFor="password" className="modal__label">
    Password*
    <input
      type="password"
      className="modal__input"
      id="register-password"
      name="password"
      placeholder="Password"
      value={values.password || ""}
      onChange={handleChange}
      required
    />
  </label>
  <label htmlFor="name" className="modal__label">
    Name*
    <input
      type="text"
      className="modal__input"
      id="register-name"
      name="name"
      placeholder="Name"
      value={values.name || ""}
      onChange={handleChange}
      required
    />
  </label>
  <label htmlFor="avatar" className="modal__label">
    Avatar URL*
    <input
      type="url"
      className="modal__input"
      id="avatar"
      name="avatar"
      placeholder="Avatar URL"
      value={values.avatar || ""}
      onChange={handleChange}
      required
    />
  </label>
  <div className="modal__button-container">
    <button className="modal__to-login" type="button" onClick={onLogin}>
      <span className="modal__login-button-text">or Log In</span>
    </button>
  </div>
</ModalWithForm>
  );
};

export default RegisterModal;