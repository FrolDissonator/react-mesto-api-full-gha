import logoMesto from '../images/header-logo.svg';
import { Link, Route, Routes } from 'react-router-dom';

function Header(props) {
    return (
    <header className="header">
      <img src={logoMesto} alt="логотип Место Россия" className="header__logo" />
      <div className="header__container">
      {props.loggedIn && <p className='header__user-email'>{props.email}</p>}
        <Routes>
          <Route path='/'element={
          <Link to="/sign-in" className="header__link header__link_place_user-page" onClick={props.onSignOut}>
            Выйти
          </Link>}>
          </Route>
          <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>}>
          </Route>
          <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>}>
          </Route>
        </Routes>
      </div>
    </header>
    )
}

export default Header