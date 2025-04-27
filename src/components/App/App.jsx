import { useEffect, useState } from "react";
import { coordinates, APIkey } from "../../utils/constants.js";
import {Routes, Route} from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import Sidebar from "../SideBar/SideBar.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { defaultClothingItems } from "../../utils/constants.js";
import { getItems, deleteItem } from "../../utils/api";



function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition:"",
    isDay: false,
  });

  const [clothingItems, setClothingItems ] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const[currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () =>{
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }
  
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({name, imageUrl, weather}) => {
    const newId = Math.max(...clothingItems.map((item) =>item._id)) +1;
    setClothingItems((prevItems)=>[{name, link: imageUrl, weather, _id: newId}, ...prevItems]);
    closeModal();
  };
  
  const handleCardDelete = () => {
    if (!selectedCard._id || typeof selectedCard._id !== "string") {
      // Probably mock data, just remove it locally
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== selectedCard._id)
      );
      closeModal();
      return;
    }
  
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeModal();
      })
      .catch(console.error);
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
    getItems().then((data) => {
      setClothingItems(data);
    }).catch(console.error);
  }, []); 

 

  return (
    <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
      <div className="page">
        <div className="page__contnent">
         <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route path="/" element={<Main 
             weatherData={weatherData} 
             handleCardClick={handleCardClick}
            clothingItems={clothingItems}
            />} />
            <Route path="/profile" element={<Profile onCardClick={handleCardClick}/>} />
         </Routes>
        
      
      <AddItemModal 
        isOpen={activeModal === "add-garment"}
        onClose={closeModal} 
        onAddItemModalSubmit={handleAddItemModalSubmit}
      />
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeModal}
        onDelete={handleCardDelete}
      />
      
      <Footer />
    </div>
    </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
