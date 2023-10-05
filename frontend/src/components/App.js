import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltip from "./InfoTooltip.js";
import Register from './Register.js';
import Login from './Login.js';
import { api } from '../utils/api.js';
import CurrentUserContext from '../context/CurrentUserContext.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import * as auth from '../utils/auth.js'

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.email);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }}, []);

  useEffect(() => {
    if(loggedIn) {
      api.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.error(err);
      });
  }}, [loggedIn]);

  useEffect(() => {
    if(loggedIn) { 
    api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }}, [loggedIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.error(err);
    });
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then(() => {
      setCards(cards.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.error(err);
    });
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = (data) => {
    api.setUserInfo(data.name, data.about)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateAvatar = (data) => {
    api.setUserAvatar(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddPlaceSubmit = (newCard) => {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegister = (email, password) => {
    auth.register(email, password)
    .then(() => {
      setIsSuccess(true);
      setIsInfoToolTipPopupOpen(true);
      navigate("/sign-in");
    })
    .catch((err) => {
      console.log(err);
      setIsSuccess(false);
      setIsInfoToolTipPopupOpen(true);
    });
  };

  const handleLogin = (email, password) => {
    auth.login(email, password)
    .then((res) => {
      localStorage.setItem("jwt", res.token);
      setLoggedIn(true);
      setUserEmail(email);
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    navigate("/sign-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <div className="page__content">
        <Header email={userEmail} onSignOut={handleSignOut} loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={
          <ProtectedRouteElement
          element={Main}
          loggedIn={loggedIn}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
          <Route path="*" element={<Navigate to="/sign-in"/>}/>
        </Routes>
        <Footer />
      </div>
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups} 
        onSubmit={handleAddPlaceSubmit} 
      />
      <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups} 
      />
      <PopupWithForm 
        title="Вы уверены?" 
        name="card-delete" 
        value="Да">
        <div className="edit-form">
          <h2 className="edit-form__title">Вы уверены?</h2>
          <button className="edit-form__submit-button" type="submit">
            Да
          </button>
        </div>
      </PopupWithForm>
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar} 
      />
      <InfoTooltip
        isOpen={isInfoToolTipPopupOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess} 
      />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
