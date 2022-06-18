import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";
import Terms from "./components/ReadTerms";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import './styles/index.css'

function App() {
  return (
    <div className="App">
      <header className="text-start p-3" style={{ backgroundColor: "rgb(120, 120, 140)" }}>
        <a href="/">
          <i className="fa-solid fa-address-book text-dark"></i>
        </a>
        <a href="/">
          <span className="ms-5 text-dark" style={{ fontSize: "23px" }}>
            Contacts App
          </span>
        </a>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/terms" element={<Terms />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
