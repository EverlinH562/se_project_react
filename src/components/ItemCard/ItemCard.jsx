import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser?._id;
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    console.log("Card clicked:", item); 
    if (onCardClick) onCardClick(item);
  };

  const handleLike = () => {
    if (onCardLike) onCardLike(item);
  };

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {isLoggedIn && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          type="button"
        />
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;