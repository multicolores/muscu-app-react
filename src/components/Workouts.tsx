import React from "react";
import { useState, useEffect } from "react";
// import { TextField } from "@mui/material";
// import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
// import { Link } from "react-router-dom";
import axios from "axios";

import { useCookies } from "react-cookie";

// material ui imports
// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";

function Workouts(props: any) {
  //   const [cookies, setCookie] = useCookies(["user"]);
  //   const [workouts, setWorkouts] = useState([]);
  //   const [data, setData] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);

  const workouts = props.workouts;

  //   useEffect(() => {
  //     // fetch every workouts id present in user
  //     props.workouts.map((id: any) => {
  //       axios
  //         .get("https://api-nodejs-todo.herokuapp.com/workout/" + id, {
  //           headers: {
  //             "auth-token": cookies.user,
  //           },
  //         })
  //         .then((res) => {
  //           //   console.log(res.data);
  //           workouts.push(res.data);
  //           console.log(workouts);
  //           setData(res.data);

  //           setError(null);
  //         })
  //         .catch((err) => {
  //           console.log(err.message);
  //           setError(err.message);
  //           setData(null);
  //         })
  //         .finally(() => {
  //           setLoading(false);
  //         });
  //     });
  //   }, []);
  console.log(workouts);
  const listWorkouts = workouts.map((workout: any) => (
    <li key={workout._id}>{workout.name}</li>
  ));
  return (
    <div>
      <h1>Workouts component</h1>
      {listWorkouts}
      {/* {workouts.map((_id: any) => {
        console.log("ok");
      })} */}
      {workouts[0]._id}
      <br />
      <br />
      <br />
      <Button variant="contained">Create a workout</Button>
      <Link to="/exercises">
        <Button variant="contained">Create an exercise</Button>
      </Link>
    </div>
  );
}

export default Workouts;
