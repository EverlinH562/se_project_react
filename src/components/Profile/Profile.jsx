import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import Sidebar from "../SideBar/SideBar.jsx";
import "./Profile.css";

function Profile({ clothingItems, onCardClick, onAddClick }) {
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
      </section>
    </div>
  );
}

export default Profile;
