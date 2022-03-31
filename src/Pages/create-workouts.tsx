import * as React from "react";
import { useLocation } from "react-router-dom";

function CreateWorkout() {
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
  return (
    <div className="creatWorkout_container">
      <h1>Create a workout</h1>
      <form onSubmit={CreateTheWorkout}>
        <label htmlFor="workoutname">Workout's Name :</label>
        <input type="text" name="workoutname" />
        <div>
          <label htmlFor="exoname">Exercise's Name :</label>
          <input type="text" name="exoname" />
          <label htmlFor="exoNbSet">Set number:</label>
          <input type="text" name="exoNbSet" />
          <label htmlFor="recuperation">Recuperation :</label>
          <input type="text" name="recuperation" />
          <label htmlFor="weight">Weight :</label>
          <input type="text" name="weight" />
          <span>Add exercise</span>
        </div>
        <input type="submit" value="Create workout" className="submitInput" />
      </form>
    </div>
  );
}

export default CreateWorkout;
