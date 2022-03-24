import * as React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import MainPage from "./Pages/MainPage";
import Exercises from "./Pages/Exercises";
import Workouts from "./Pages/Workouts";
import { CookiesProvider } from "react-cookie";
function App() {
  return (
    <CookiesProvider>
      <Router>
        <div className="App">
          <h1>Muscu App</h1>
          <nav>
            <Link to="/register">Register </Link>
            <Link to="/login">Login </Link>
            <Link to="/mainpage">Main Page</Link>
          </nav>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/workouts" element={<Workouts />} />
            {/* <Route path="about" element={<About />} /> */}
          </Routes>
        </div>
      </Router>
    </CookiesProvider>
  );
}

export default App;
