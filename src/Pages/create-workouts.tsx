import * as React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import "../styles/create-workouts.scss";
import { createWorkout } from "../servicesFunctions/createWorkout";
import { useCookies } from "react-cookie";

function CreateWorkout() {
  const [exerciseNumber, setexerciseNumber] = useState(1);
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["user"]);

  console.log(location.state);
  const user = location.state["user"];
  //info : There's no difference, location.state["user"] just doesn't get type checked. So, it's more of a workaround  (location.state.user doesn't work)
  console.log(user);

  function CreateTheWorkout(e: any) {
    // dans le future : go importer cette fonction des services ( pitet plustot la fonction qui fait appelle a l'api avce les bon truc en props dedans)
    console.log(e);
    let formArray = [];
    let exercisesArrayToSend = [];
    // for (let i = 0; i < e.target.length - 1; i++) {
    //   formArray.push(e.target[i].value);
    //   console.log(e.target[i].name);
    // }
    for (let i = 1; i < e.target.length - 2; i++) {
      formArray.push(e.target[i].value);
      // console.log(e.target[i].name);
    }
    console.log(formArray);
    // console.log(formArray.length / 4);
    let separation = 3;
    for (let i = 0; i < formArray.length / 3; i++) {
      let objectArray = formArray.slice().splice(separation - 3, separation);
      console.log(objectArray);
      let exerciseObject = {
        name: objectArray[0],
        repetition: "",
        recuperation: objectArray[1],
        weight: objectArray[2],
        // name: objectArray[0],
        // repetition: objectArray[1],
        // recuperation: objectArray[2],
        // weight: objectArray[3],
      };
      exercisesArrayToSend.push(exerciseObject);
      separation = separation + 3;
    }
    console.log(exercisesArrayToSend);

    let workoutObject = {
      name: e.target[0].value,
      exercise: exercisesArrayToSend,
      description: "Description de la scéance",
    };
    console.log(workoutObject);

    //TODO now create and import funciton to create a new workout ( form services folder ) with in param workoutObject
    // il vas falloir créer un workout et prendre l'id pour l'ajouter aux user's workouts ids
    // arguments in function : (user, workoutObject)

    if (createWorkout(user, workoutObject, cookies.user)) {
      alert("Workout created !");
      setexerciseNumber(0);
    } else {
      alert("Error");
    }
    e.preventDefault();
  }

  function exercisesInputs() {
    let inputsDom = [];
    for (let i = 0; i < exerciseNumber; i++) {
      inputsDom.push(
        <div className="exercisesInputs">
          <label htmlFor={"exoname" + i}>Exercise's Name :</label>
          <input type="text" name={"exoname" + i} />
          {/* <label htmlFor={"exoNbSet" + i}>Set number:</label>
          <input type="text" name={"exoNbSet" + i} /> */}
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
        </div>

        {exercisesInputs()}
        <Button variant="contained" className="borderButton">
          <input type="submit" value="Create workout" className="submitInput" />
        </Button>
      </form>
      <div className="btAddContainer">
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
    </div>
  );
}

export default CreateWorkout;
