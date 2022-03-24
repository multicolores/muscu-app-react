import React from "react";
import { useState, useEffect } from "react";
// import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
// import { Link } from "react-router-dom";
import axios from "axios";

import { useCookies } from "react-cookie";
import Application from "../components/Application";
import Workouts from "../components/Workouts";

function MainPage() {
  const [data, setData] = useState(null);
  const [userinfo, setUserinfo] = useState(null);
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cookies, setCookie] = useCookies(["user"]);
  const [workouts, setWorkouts] = useState([]);
  const [loadingWorkout, setLoadingWorkout] = useState(true);
  const [errorWorkout, setErrorWorkout] = useState(null);
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
        if (res.data.user.workout.length > 0)
          getWorkouts(res.data.user.workout);
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
  }, []);

  function getWorkouts(workoutsArray: any) {
    workoutsArray.map((id: any) => {
      axios
        .get("https://api-nodejs-todo.herokuapp.com/workout/" + id, {
          headers: {
            "auth-token": cookies.user,
          },
        })
        .then((res) => {
          //   console.log(res.data);
          workouts.push(res.data);
          console.log(workouts);
          setErrorWorkout(null);
        })
        .catch((err) => {
          console.log(err.message);
          setErrorWorkout(err.message);
        })
        .finally(() => {
          setLoadingWorkout(false);
        });
    });
  }

  // function getInfoWithautorisation() {
  //   axios
  //     .get("https://api-nodejs-todo.herokuapp.com/exercise", {
  //       headers: {
  //         "auth-token": cookies.user,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  return (
    <div>
      {loading && <div>A moment please...</div>}
      {error && <div>{`There is a problem fetching user data - ${error}`}</div>}
      {/* {data && <Application user={data.user} workout={data.user.workout} />} */}
      {data && (
        <h1>
          Il y a des data on peut faire des truc avec comme afficher le nom du
          mec ect..
        </h1>
      )}

      {!loadingWorkout &&
        (workouts.length > 0 ? (
          <Workouts workouts={workouts} />
        ) : (
          <h2>Aucun workout :( en créer un </h2>
        ))}

      {/* {workouts.length > 0 ? (
        <Workouts workouts={workouts} />
      ) : (
        <h2>Aucun workout :( en créer un </h2>
      )} */}

      {/* <ul>
          {data &&
            data.map(({ _id, name, email, password }) => (
              <li key={_id}>
                <h3>{name}</h3>
                <span>{_id}</span>
                <p>{email}</p>
                <p>{password}</p>
              </li>
            ))}
        </ul> */}
      {/* {workout.lenght > 0 ? (
          <h2>ils y as des workout</h2>
        ) : (
          <h2>Aucun workout :( en créer un </h2>
        )} */}
      {/* {cookies.user && <p>{cookies.user}</p>} */}
    </div>
  );
}

export default MainPage;
