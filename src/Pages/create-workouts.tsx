import * as React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import "../styles/create-workouts.scss";

function CreateWorkout() {
  const [exerciseNumber, setexerciseNumber] = useState(1);
  const location = useLocation();

  console.log(location.state);
  const user = location.state["user"];
  //info : There's no difference, location.state["user"] just doesn't get type checked. So, it's more of a workaround  (location.state.user doesn't work)
  console.log(user);

  function CreateTheWorkout(e: any) {
    // l'impoter des services
    console.log(e);
    let formArray = [];
    for (let i = 0; i < e.target.length - 1; i++) {
      formArray.push(e.target[i].value);
      console.log(e.target[i].name);
    }
    console.log(formArray);

    e.preventDefault();
  }

  function exercisesInputs() {
    let inputsDom = [];
    for (let i = 0; i < exerciseNumber; i++) {
      inputsDom.push(
        <div className="exercisesInputs">
          <label htmlFor={"exoname" + i}>Exercise's Name :</label>
          <input type="text" name={"exoname" + i} />
          <label htmlFor={"exoNbSet" + i}>Set number:</label>
          <input type="text" name={"exoNbSet" + i} />
          <label htmlFor={"recuperation" + i}>Recuperation :</label>
          <input type="text" name={"recuperation" + i} />
          <label htmlFor={"weight" + i}>Weight :</label>
          <input type="text" name={"weight" + i} />
        </div>
      );
    }

    return inputsDom;
  }
  return (
    <div className="creatWorkout_container">
      <h1>Create a workout</h1>
      <form onSubmit={CreateTheWorkout}>
        <div>
          <label htmlFor="workoutname">Workout's Name :</label>
          <input type="text" name="workoutname" />
          <Button
            variant="contained"
            className="btAddExo"
            onClick={() => {
              setexerciseNumber(exerciseNumber + 1);
            }}
          >
            Add exercise
          </Button>
          <Button
            variant="contained"
            className="btAddExo"
            onClick={() => {
              setexerciseNumber(exerciseNumber - 1);
            }}
          >
            -
          </Button>
        </div>

        {exercisesInputs()}

        <input type="submit" value="Create workout" className="submitInput" />
      </form>
    </div>
  );
}

export default CreateWorkout;
