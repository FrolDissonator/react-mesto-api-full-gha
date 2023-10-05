import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({ isOpen, onClose, onSubmit }) {
    const nameRef = useRef();
    const linkRef = useRef();

    useEffect(() => {
      if (!isOpen) {
        nameRef.current.value = '';
        linkRef.current.value = '';
      }
    }, [isOpen]);


    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
          name: nameRef.current.value,
          link: linkRef.current.value,
        });
    }

    return (
        <PopupWithForm 
        title="Новое место" 
        name="card" 
        value="Создать" 
        isOpen={isOpen} 
        onClose={onClose} 
        onSubmit={handleSubmit}>
        <div className="edit-form__input-container">
          <input
            className="edit-form__input edit-form__input_field_place-name"
            id="card-name"
            name="name"
            type="text"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            ref={nameRef}
          />
          <span className="edit-form__error-message" id="card-name-error"></span>
        </div>
        <div className="edit-form__input-container">
          <input
            className="edit-form__input edit-form__input_field_place-image"
            id="card-image"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            required
            ref={linkRef}
          />
          <span className="edit-form__error-message" id="card-image-error"></span>
        </div>
      </PopupWithForm>
    )
};

export default AddPlacePopup;