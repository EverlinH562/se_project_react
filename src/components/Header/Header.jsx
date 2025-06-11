import "./Header.css";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData, loggedIn, setActiveModal }) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const renderAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt="User Avatar"
          className="header__avatar"
        />
      );
    } else if (currentUser?.name) {
      return (
        <div className="header__avatar-placeholder">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
      );
    }
    return null;
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}{" "}
        </p>
      </div>

      <ToggleSwitch />
      {loggedIn && (
  <button
    onClick={handleAddClick}
    type="button"
    className="header__add-clothes-btn"
  >
    + Add clothes
  </button>
)}

{loggedIn ? (
  <Link to="/profile" className="header__link">
    <div className="header__user-container">
      <p className="header__username">{currentUser?.name}</p>
      {renderAvatar()}
    </div>
  </Link>
) : (
  <div className="header__auth-links">
    <button
      className="header__auth-btn"
      onClick={() => setActiveModal("login")}
    >
      Log In
    </button>
    <button
      className="header__auth-btn"
      onClick={() => setActiveModal("register")}
    >
      Sign Up
    </button>
  </div>
)}
      
    </header>
  );
}

export default Header;
