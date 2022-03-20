import React from "react";
import { useState, useEffect } from "react";
// import { TextField } from "@mui/material";
// import Button from "@mui/material/Button";
import { Button } from "@mui/material";
// import { Link } from "react-router-dom";
import axios from "axios";

import { useCookies } from "react-cookie";

// material ui imports
// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";

function Application(props: any) {
  let user = props.user;
  let workout = props.workout;

  return (
    <div>
      <h1>{user.name}</h1>
      {workout.lenght > 0 ? (
        <h2>ils y as des workout</h2>
      ) : (
        <h2>Aucun workout :( en créer un </h2>
      )}

      {/* <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab> */}

      <Button variant="contained">Get Token</Button>
    </div>
  );
}

export default Application;
