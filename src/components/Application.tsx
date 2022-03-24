import React from "react";
import { useState, useEffect } from "react";
// import { TextField } from "@mui/material";
// import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
// import { Link } from "react-router-dom";
import axios from "axios";

import { useCookies } from "react-cookie";
import Workout from "./Workout";

// material ui imports
// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";

function Application(props: any) {
  let user = props.user;
  let workouts = props.workout;

  if (workouts.length > 0) {
    workouts.map((id: any) => console.log(id));
  }

  return (
    <div>
      <h1>{user.name}</h1>
      {workouts.length > 0 ? (
        <Workout workouts={workouts} />
      ) : (
        <h2>Aucun workout :( en créer un </h2>
      )}

      {/* <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab> */}

      {/* <Button variant="contained">Create a workout</Button>
      <Link to="/exercises">
        <Button variant="contained">Create an exercise</Button>
      </Link> */}
    </div>
  );
}

export default Application;
