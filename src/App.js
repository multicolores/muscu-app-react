import * as React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./Pages/home-page";
import Register from "./Pages/register-page";
import Login from "./Pages/login-page";
import MainPage from "./Pages/main-page";
import CreateWorkout from "./Pages/create-workouts";
import { CookiesProvider } from "react-cookie";
function App() {
  return (
    <CookiesProvider>
      <Router>
        <div className="App">
          <nav>
            <Link to="/" className="logo">
              Muscu App
            </Link>
            <div>
              <Link to="/register">Register</Link>
              <Link to="/mainpage">Login</Link>
            </div>
            {/* <Link to="/mainpage">Main Page</Link> */}
            {/* <Link to="/create-workouts">Create Workouts</Link> */}
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/create-workouts" element={<CreateWorkout />} />

            {/* <Route path="about" element={<About />} /> */}
          </Routes>
        </div>
      </Router>
    </CookiesProvider>
  );
}

export default App;
