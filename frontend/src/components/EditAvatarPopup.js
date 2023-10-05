import React, { useRef, useEffect } from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    useEffect(() => {
      if (!isOpen) {
        avatarRef.current.value = '';
      }
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
    };

    return (
        <PopupWithForm 
        title="Обновить аватар" 
        name="avatar" 
        value="Сохранить" 
        isOpen={isOpen} 
        onClose={onClose}
        onSubmit={handleSubmit}>
        <div className="edit-form__input-container">
          <input
            ref={avatarRef}
            className="edit-form__input edit-form__input_field_avatar"
            id="avatar"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="edit-form__error-message" id="avatar-error"></span>
        </div>
        </PopupWithForm>
    )    
}

export default EditAvatarPopup;