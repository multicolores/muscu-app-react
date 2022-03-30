import React from "react";
import { useState, useEffect } from "react";
// import { TextField } from "@mui/material";
// import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// import { Link } from "react-router-dom";
import axios from "axios";

import { useCookies } from "react-cookie";
import "./AddTraining.scss";

function AddTraining(props: any) {
  const [cookies, setCookie] = useCookies(["user"]);
  //   const [data, setData] = useState(null);
  //   const [numberSet, setnumberSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   setData(props.workout);
  const workout = props.workout;
  let nbSeries = [];
  //   setnumberSet(nbSeries);

  function ExerciseInfo() {
    // https://flaviocopes.com/react-how-to-loop/

    let items = [];
    for (let i = 0; i < workout.exercise.length; i++) {
      console.log(workout.exercise[i].name);
      nbSeries[i] = workout.exercise[i].repetition[0].length;
      //   setnumberSet(nbSeries);
      console.log(nbSeries);
      //   console.log(numberSet);
      items.push(
        <div className="exerciseTable">
          <div className="exoInfo">
            <span>{workout.exercise[i].name}</span>
            <span>{workout.exercise[i].recuperation}</span>
            <span>{workout.exercise[i].weight}</span>
          </div>
          <div className="inputRepContainer">
            {exercieRepInput(nbSeries[i])}
            <IconButton
              aria-label="delete"
              onClick={() => {
                addSerie(i);
              }}
              color="primary"
            >
              <AddCircleIcon />
            </IconButton>
            {/* <Button variant="outlined" startIcon={<AddCircleIcon />}></Button> */}
          </div>
        </div>
      );
    }
    return items;
  }

  function exercieRepInput(seriesNumber: number) {
    let repInput = [];
    for (let e = 0; e < seriesNumber; e++) {
      repInput.push(<input type="text" />);
    }
    console.log(seriesNumber);
    return repInput;
  }
  function addSerie(indexSerieArray: any) {
    console.log(indexSerieArray);
    nbSeries[indexSerieArray] = nbSeries[indexSerieArray] + 1;
    console.log(nbSeries);
  }
  return (
    <div className="AddTraining">
      {/* {loading && <div>A moment please...</div>}
      {error && <div>{`There is a problem fetching user data - ${error}`}</div>} */}
      <h1>{workout.name}</h1>
      {ExerciseInfo()}
    </div>
  );
}

export default AddTraining;
