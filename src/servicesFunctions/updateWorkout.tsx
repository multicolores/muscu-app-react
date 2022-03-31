import React from "react";
import axios from "axios";

export async function updateWorkout(
  trainingArray: any,
  workoutData: any,
  referenceExercise: any
) {
  // ne prend pas encore de token en header
  //   console.log(trainingArray);
  //   console.log(workoutData);
  //   console.log(referenceExercise);

  workoutData.exercise.forEach((exo: any) => {
    if (exo.name === referenceExercise.name) {
      exo.repetition.unshift(trainingArray);
    }
  });
  console.log(workoutData.exercise);
  console.log(workoutData._id);

  // const options = {
  //   headers: {
  //       "auth-token": cookies.user,
  //   }
  //  }

  let res = await axios.patch(
    "https://api-nodejs-todo.herokuapp.com/workout/" + workoutData._id,
    { exercise: workoutData.exercise }
  );
  return res.data;
}
