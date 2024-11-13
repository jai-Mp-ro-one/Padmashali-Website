// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import Header from './Components/Header/Header';
import AboutPage from './Pages/AboutPage/AboutPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import LatestNews from './Pages/LatestNews/LatestNews';

function App() {
  return (
    <div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to Padmashali global website</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/latestnews" element={<LatestNews />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
