// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import Header from './Components/Header/Header';
import AboutPage from './Pages/AboutPage/AboutPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import LatestNews from './Pages/LatestNews/LatestNews';
import { useEffect } from 'react';
import APIServices from './APIServices/APIServices';
import LoginPage from './Pages/Login/Login';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { setToken, setLoginId, setUniqueDeviceId, setRefreshToken, setProfileData, setIsLoggedIn } from './Redux/Action';
import { useNavigate } from 'react-router-dom';
import LatestEvents from './Pages/LatestEvents/LatestEvents';
import NewsDetails from './Pages/NewsDetails/NewsDetails';
import EventDetails from './Pages/EventDetails/EventDetails';
import TermsAndConditions from './Pages/TermsAndConditions/TermsAndConditions';
import PrivacyAndPolicies from './Pages/PrivacyPolicies/PrivacyPolicies';


function App() {
  const dispatch = useDispatch()
  const [refreshTokenExpired, setRefreshTokenExpired] = useState(false);

  const token = useSelector((state) => {
    return state.token;
  });

  console.log("token: ", token)

  const refreshToken = useSelector((state) => {
    return state.refreshToken;
  });

  const uniqueDeviceId = useSelector((state) => {
    return state.uniqueDeviceId;
  });

  const loginId = useSelector((state) => {
    return state.loginId;
  });

  console.log("uniqueDeviceId: ", uniqueDeviceId)
  console.log("LoggedId: ", loginId)

  const isAccessTokenExpired = (token) => {
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp < Date.now() / 1000;
    }
    return false;
  };

  const handleLogout = async () => {
    console.log('i am in')
    try {
      APIServices.handleLogut()
        .then((response) => {
          console.log("User Logged out successfully")
          setRefreshTokenExpired(true)
          dispatch(setProfileData(null))
          dispatch(setLoginId(null))
          dispatch(setUniqueDeviceId(null))
          dispatch(setToken(null))
          dispatch(setRefreshToken(null))
          dispatch(setIsLoggedIn(false))
          // navigate('/login');
        })
        .catch((error) => {
          console.log("Getting error while logging out: ", error.data)
        })
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const generateNewToken = () => {
    if (!refreshToken) {
      alert("your session expired , login now")
      handleLogout()
      return;
    }
    console.log('refresh token called to get new access token')
    APIServices.generateNewToken({ refreshToken })
      .then((response) => {
        const newAccessToken = response.data.accessToken;
        dispatch(setToken(newAccessToken));
        console.log('new token set')
        APIServices.setAuthToken(newAccessToken, uniqueDeviceId, loginId);
      })
      .catch((err) => {
        console.log("Error refreshing token:", err);
        handleLogout();
      });
  };

  const checkTokenStatus = () => {
    if (isAccessTokenExpired(token)) {
      console.log("Access token expired; refreshing...");
      generateNewToken();
    }
    else {
      console.log("Access token still valid.");
    }
  };

  useEffect(() => {
    if (token) {
      APIServices.setAuthToken(token, uniqueDeviceId, loginId);
    }
  }, [token]);

  useEffect(() => {
    checkTokenStatus();
  }, [token])

  return (
    <div>
      <Router>
        {refreshTokenExpired ? (
          // <Routes>
          //   <Route path="/login" element={<LoginPage />} />
          // </Routes>
          <LoginPage />
        ) : (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/latestnews" element={<LatestNews />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/events" element={<LatestEvents />} />
              <Route path="/news-details" element={<NewsDetails />} />
              <Route path="/event-details" element={<EventDetails />} />
              <Route path="/privacy-policy" element={<PrivacyAndPolicies />} />
              <Route path="/terms-conditions" element={<TermsAndConditions />} />

            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
