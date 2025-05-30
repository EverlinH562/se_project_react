import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import Sidebar from "../SideBar/SideBar.jsx";
import "./Profile.css";

function Profile({ clothingItems, onCardClick, onAddClick, onEditProfile, onLogout }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddClick={onAddClick}
        />
         <button onClick={onAddClick}>Edit Profile</button>
        <button onClick={onLogout} className="profile__logout-button">
          Sign out
        </button>
      </section>
    </div>
  );
}

export default Profile;
