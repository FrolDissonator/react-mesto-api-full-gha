import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../context/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        if (isOpen && currentUser) {
          setName(currentUser.name);
          setDescription(currentUser.about);
        }
    }, [isOpen, currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    };
    
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    };

    function handleSubmit(e) {
      e.preventDefault();
      onUpdateUser({
        name: name,
        about: description,
      });
    };

    return (
      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        value="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <div className="edit-form__input-container">
          <input
            className="edit-form__input edit-form__input_field_name"
            id="name"
            name="name"
            type="text"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleNameChange}
          />
          <span className="edit-form__error-message" id="name-error"></span>
        </div>
        <div className="edit-form__input-container">
          <input
            className="edit-form__input edit-form__input_field_description"
            id="description"
            name="description"
            type="text"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className="edit-form__error-message" id="description-error"></span>
        </div>
      </PopupWithForm>
    );
  }

export default EditProfilePopup;