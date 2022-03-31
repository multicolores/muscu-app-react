import React from "react";
import { useState, useEffect } from "react";
// import { TextField } from "@mui/material";
// import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from "@mui/icons-material/Send";
// import { Link } from "react-router-dom";
import axios from "axios";

import { useCookies } from "react-cookie";
import "./AddTraining.scss";

//import functions
import { updateWorkout } from "../servicesFunctions/updateWorkout";

function AddTraining(props: any) {
  const [cookies, setCookie] = useCookies(["user"]);
  //   const [data, setData] = useState(null);
  //   const [numberSet, setnumberSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   setData(props.workout);
  const workout = props.workout;

  function ExerciseInfo() {
    // https://flaviocopes.com/react-how-to-loop/

    let items = [];
    for (let i = 0; i < workout.exercise.length; i++) {
      console.log(workout.exercise[i].name);
      items.push(
        <ExoRepsInput
          exercise={workout.exercise[i]}
          key={Math.random()}
          workoutData={workout}
        />
      );
    }
    return items;
  }

  return (
    <div className="AddTraining">
      {/* {loading && <div>A moment please...</div>}
      {error && <div>{`There is a problem fetching user data - ${error}`}</div>} */}
      {/* <h1>{workout.name}</h1> */}
      {ExerciseInfo()}
    </div>
  );
}

export default AddTraining;

const ExoRepsInput = ({ exercise, workoutData }) => {
  const [numberSet, setnumberSet] = useState(exercise.repetition[0].length);
  const [repExoArrya, setrepExoArrya] = useState(null);

  let TrainingrepsArray = [];

  function exercieRepInput() {
    let repInput = [];
    for (let e = 0; e < numberSet; e++) {
      repInput.push(<input type="text" key={Math.random()} />);
    }
    console.log(numberSet);
    return repInput;
  }

  function handleSubmit(e: any) {
    // console.log(e);
    for (let i = 0; i < e.target.length - 1; i++) {
      TrainingrepsArray.push(parseInt(e.target[i].value));
    }
    // console.log(TrainingrepsArray);
    updateWorkout(TrainingrepsArray, workoutData, exercise);
    // e.preventDefault();
  }
  return (
    <div className="exerciseTable">
      <div className="exoInfo">
        <span>{exercise.name}</span>
        <span>{exercise.recuperation}</span>
        <span>{exercise.weight}</span>
      </div>
      <div className="inputRepContainer">
        <form onSubmit={handleSubmit}>
          <div className="inputs">{exercieRepInput()}</div>
          <input type="submit" value=" " className="submitInput" />
        </form>
        <SendIcon className="sendIcon" />
        <IconButton
          aria-label="add set"
          onClick={() => {
            setnumberSet(numberSet + 1);
          }}
          color="primary"
          className="AddSetbt"
        >
          <AddCircleIcon />
        </IconButton>
        {/* <Button variant="outlined" startIcon={<AddCircleIcon />}></Button> */}
      </div>
    </div>
  );
};
