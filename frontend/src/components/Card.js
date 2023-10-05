import React, { useContext } from 'react';
import CurrentUserContext from '../context/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(id => id === currentUser._id);

    const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_active'}`;

    const handleClick = () => {
      onCardClick(card);
    };

    const handleLikeClick = () => {
      onCardLike(card);
    };

    const handleDeleteClick = () => {
      onCardDelete(card);
    };

    return (
    <div className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
      {isOwn && <button className="card__delete-button" type="button" onClick={handleDeleteClick}></button>}
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <div className="card__likes-number">{card.likes.length}</div>
        </div>
      </div>
    </div>
    );
}

export default Card;

