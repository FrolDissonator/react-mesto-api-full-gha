import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email, password);
    }

    return(
        <div className="entrance">
            <h2 className="entrance__title">Регистрация</h2>
            <form className="entrance__form" onSubmit={handleSubmit}>
                <input 
                className="entrance__input"
                required
                placeholder="Email"
                value={email || ''}
                onChange={handleChangeEmail}
                autoComplete="username"
                ></input>
                <input 
                className="entrance__input"
                required
                type="password"
                placeholder="Пароль"
                value={password || ''}
                onChange={handleChangePassword}
                autoComplete="current-password"
                ></input>
            <button className="entrance__button" type="submit">Зарегистрироваться</button>
            </form>
            <div className="entrance__caption">
                <p className="entrance__subtitle">Уже зарегистрированы?
                    <Link className="entrance__link" to="/sign-in"> Войти</Link>
                </p>
            </div>
        </div>
    )
}

export default Register;