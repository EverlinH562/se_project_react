import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { coordinates, APIkey } from "../../utils/constants.js";
import { addCardLike, removeCardLike } from "../../utils/api";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import { updateUser } from "../../utils/api.js";

import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import {
  getItems,
  deleteItem,
  addItem,
  register,
  authorize,
} from "../../utils/api";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

import { getUserInfo } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const closeModal = () => setActiveModal("");

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => setActiveModal("add-garment");

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather }, token)
      .then((savedItem) => {
        setClothingItems((prev) => [
          {
            ...savedItem,
            link: savedItem.link || savedItem.imageUrl,
            _id: savedItem._id || savedItem.id,
          },
          ...prev,
        ]);
        closeModal();
      })
      .catch((err) => console.error("Failed to add item:", err));
  };

  const handleCardDelete = () => {
    const token = localStorage.getItem("jwt");
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== selectedCard._id)
        );
        closeModal();
      })
      .catch(console.error);
  };

  const handleRegister = ({ email, password, name, avatar }) => {
  return register({ email, password, name, avatar }) 
    .then(() => {
      return handleLogin({ email, password }); 
      })
      .catch((err) => console.error("Registration failed:", err));
  };

  const handleLogin = ({ email, password }) => {
    return authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        return getUserInfo(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser(null);
  };

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    if (!currentUser) return;

    const isLiked = likes.includes(currentUser._id);
    const likeAction = isLiked ? removeCardLike : addCardLike;

    likeAction(_id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch((err) => console.log("Error handling like:", err));
  };

  useEffect(() => {
  getWeather(coordinates, APIkey)
    .then((data) => {
      const filteredData = filterWeatherData(data);
      setWeatherData(filteredData);
    })
    .catch(console.error);
}, []);


  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserInfo(token)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("jwt");
          setLoggedIn(true);
          setCurrentUser(null);
        });
    }
  }, []);

  const handleUpdateUser = (userData) => {
    const token = localStorage.getItem("jwt");
    setIsUpdatingUser(true);
    updateUser(userData, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditProfileOpen(false);
      })
      .catch((err) => console.error("Update failed:", err))
      .finally(() => setIsUpdatingUser(false));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              loggedIn={loggedIn}
              currentUser={currentUser}
              setActiveModal={setActiveModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onAddClick={handleAddClick}
                      onEditProfile={() => setIsEditProfileOpen(true)}
                      onLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
            <ItemModal
              isOpen={activeModal === 'preview'}
              card={selectedCard}
              onClose={closeModal}
              onDelete={handleCardDelete}
              onCardLike={handleCardLike}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              handleCloseModal={closeModal}
              onSubmit={handleRegister}
              onLogin={() => setActiveModal("login")}
              isLoading={false}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              handleCloseModal={closeModal}
              onSubmit={handleLogin}
              onSignUp={() => setActiveModal("register")}
            />
            <EditProfileModal
              isOpen={isEditProfileOpen}
              onClose={() => setIsEditProfileOpen(false)}
              onUpdateUser={handleUpdateUser}
              isLoading={isUpdatingUser}
            />
            <Footer />
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
