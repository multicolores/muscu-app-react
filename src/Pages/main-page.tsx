import React from "react";
import { useState, useEffect } from "react";
// import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// import { Link } from "react-router-dom";
import axios from "axios";

import { useCookies } from "react-cookie";
import Workout from "../components/Workout";
import Notification from "../components/materialUI/Notification";
import { Link, useNavigate } from "react-router-dom";

function MainPage() {
  const [data, setData] = useState(null);
  const [userinfo, setUserinfo] = useState(null);
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [workouts, setWorkouts] = useState([]);
  // const [workouts, setWorkouts] = useState([]);
  const [errorWorkout, setErrorWorkout] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    // User data fetching here
    axios
      .get("https://api-nodejs-todo.herokuapp.com/user", {
        headers: {
          "auth-token": cookies.user,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setUserinfo(res.data.user);
        setWorkout(res.data.user.workout);
        console.log(res.data.user.workout);
        // if (res.data.user.workout.length > 0) {
        //   getWorkouts(res.data.user.workout);
        // }
        // console.log(workouts);
        setError(null);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setData(null);
        navigate("/login", { state: data });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const navigate = useNavigate();
  const toCreateWorkout = () => {
    navigate("/create-workouts", { state: data });
  };

  function reloadDatas() {
    axios
      .get("https://api-nodejs-todo.herokuapp.com/user", {
        headers: {
          "auth-token": cookies.user,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setUserinfo(res.data.user);
        setWorkout(res.data.user.workout);
        console.log(res.data.user.workout);
        // if (res.data.user.workout.length > 0) {
        //   getWorkouts(res.data.user.workout);
        // }
        // console.log(workouts);
        setError(null);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function Logout() {
    if (cookies.user) {
      removeCookie("user");
      navigate("/login");
    }
  }
  return (
    <div>
      {loading && (
        <div className="loadingContainer">
          <div>
            <CircularProgress />
            <span>Loading</span>
          </div>
        </div>
      )}
      {error && <div>{`There is a problem fetching user data - ${error}`}</div>}
      {data && (
        <header className="headerMain-pageContainer">
          <h1>{data.user.name}</h1>
          {/* <p>
            Il y a des data on peut faire des truc avec comme afficher le nom du
            mec ect..
          </p> */}
          <Button
            variant="contained"
            className="btAddTraining gradientButton"
            onClick={() => {
              toCreateWorkout();
            }}
          >
            Create a Workout
          </Button>
          <Button variant="contained" className="btLogout" onClick={Logout}>
            Logout
          </Button>
        </header>
      )}

      {/* {workout && <TestChildElement data={workout} />} */}
      <div className="workoutsComponentsContainer">
        {workout &&
          workout.map((id: any) => (
            <Workout
              workout_id={id}
              key={id}
              user={data.user}
              reloadDatas={reloadDatas}
              notify={notify}
              setNotify={setNotify}
            />
          ))}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default MainPage;
