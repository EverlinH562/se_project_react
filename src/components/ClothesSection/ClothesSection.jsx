import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard.jsx";

function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClick,
  onCardDelete,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-content">
        <p className="clothes-text">Your Items</p>
        <button className="clothes-button" type="button" onClick={onAddClick}>
          {" "}
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
