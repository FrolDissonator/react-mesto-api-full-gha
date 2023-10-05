import React, { useState } from "react";

function Login({ onLogin }) {
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
        onLogin(email, password);
    }

    return(
        <div className="entrance">
            <h2 className="entrance__title">Вход</h2>
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
            <button className="entrance__button" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;