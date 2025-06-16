import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { useContext } from "react";

function Profile ({ handleCardClick, clothingItems, handleAddClick, handleDeleteClick, handleEditProfileClick, handleSignOutClick, handleCardLike, handleRemoveCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleEditProfileClick={handleEditProfileClick} handleSignOutClick={handleSignOutClick}/>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection  clothingItems={clothingItems} handleCardClick={handleCardClick} handleAddClick={handleAddClick} handleDeleteClick={handleDeleteClick} />
      </section>
    </div>
  );
}

export default Profile;