import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";
import Terms from "./components/ReadTerms";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";
import { useState } from "react";
import './styles/index.css'
import Contacts from "./components/Contacts";

function App() {
  const [name, setName] = useState('') //State that stores user's name

  return (
    <div className="App">
      <header className="text-start p-3" style={{ backgroundColor: "rgb(120, 120, 140)" }}>
        <a href="/">
          <i className="fa-solid fa-address-book text-dark"></i>
        </a>
        <a href="/">
          <span className="ms-4 text-dark" style={{ fontSize: "23px" }}>
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
          <Route path="/profile" element={<Profile name={name} setName={setName} />}></Route>
          <Route path="/logout" element={<Logout/>}></Route>
          <Route path='/contacts' element={<Contacts name={name} setName={setName} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
