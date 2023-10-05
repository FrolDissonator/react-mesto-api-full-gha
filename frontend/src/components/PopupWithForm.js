import React from 'react';

function PopupWithForm(props) {
  const { isOpen, onClose, onSubmit } = props;

  return (
    <section className={`popup popup_type_${props.name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <form className={`edit-form edit-form_${props.name}`} name={props.name} onSubmit={onSubmit} noValidate>
          <h2 className="edit-form__title">{props.title}</h2>
          {props.children}
          <button className="edit-form__submit-button" type="submit">
            {props.value}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
