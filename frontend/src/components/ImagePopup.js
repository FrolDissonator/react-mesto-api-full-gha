import React from 'react';

function ImagePopup(props) {
  const { card, onClose } = props;

  return (
    <section className={`popup popup_full-image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button className="popup__close-button" type="button" onClick={onClose} />
        <img src={card?.link} alt={card?.name} className="popup__image" />
        <h2 className="popup__caption">{card ? card.name : ''}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
