import axios from "axios";

export async function deleteWorkout(
  user: any,
  workoutIdToDelete: any,
  token: any
) {
  // ne prend pas encore de token en header
  //   console.log(trainingArray);
  //   console.log(workoutData);
  //   console.log(referenceExercise);

  // const options = {
  //   headers: {
  //       "auth-token": cookies.user,
  //   }
  //  }

  console.log(workoutIdToDelete);
  const res = await axios.delete(
    "https://api-nodejs-todo.herokuapp.com/workout/" + workoutIdToDelete
  );

  if (res.status === 200) {
    console.log("bien supprimer");
    let deleteUserWorkoutResponse = deleteWorkoutFromUsersWorkout(
      user,
      workoutIdToDelete,
      token
    );
    if (deleteUserWorkoutResponse) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

async function deleteWorkoutFromUsersWorkout(
  user: any,
  workoutId: any,
  token: any
) {
  console.log("deleteWorkoutFromUsersWorkout function");
  console.log(user);
  console.log(workoutId);
  console.log(token);
  let actualUserWorkoutsArray = user.workout;

  const index = actualUserWorkoutsArray.indexOf(workoutId);
  if (index > -1) {
    actualUserWorkoutsArray.splice(index, 1);
  }
  console.log("array to patch");
  console.log(actualUserWorkoutsArray);

  const options = {
    headers: {
      "auth-token": token,
    },
  };
  let res = await axios.patch(
    "https://api-nodejs-todo.herokuapp.com/user/" + user._id,
    { workout: actualUserWorkoutsArray },
    options
  );
  return res.data;
}
