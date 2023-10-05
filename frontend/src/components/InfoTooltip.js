import React from "react";
import iconSuccess from "../images/icon-success.svg";
import iconFail from "../images/icon-fail.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
    return (
        <section className={`popup popup_type_info ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__container_type_info">
            <button 
            className="popup__close-button" 
            type="button" 
            onClick={onClose} 
            />
            <img 
            className="popup__icon" 
            alt="Иконка результата регистрации/авторизации" 
            src={isSuccess ? iconSuccess : iconFail} 
            />
            <h2 className="popup__message">
            {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
            </h2>
        </div>
        </section>
    )
}

export default InfoTooltip;