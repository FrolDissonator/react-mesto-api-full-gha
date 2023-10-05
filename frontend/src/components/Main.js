import React, { useContext } from 'react';
import Card from './Card.js';
import CurrentUserContext from '../context/CurrentUserContext.js';

function Main(props) {
  const { onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards } = props;
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container">
            <button className="profile__avatar-button" onClick={onEditAvatar}>
              {currentUser && <img src={currentUser.avatar} alt="аватар страницы" className="profile__avatar" />} 
            </button>
          </div>
          <div className="profile__description">
            {currentUser && <h1 className="profile__title">{currentUser.name}</h1>} 
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            {currentUser && <p className="profile__subtitle">{currentUser.about}</p>} 
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards-grid">
        {cards.map((card) => (
          <Card card={card} 
          key={card._id} 
          onCardClick={onCardClick} 
          onCardLike={onCardLike} 
          onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  );
}

export default Main;

