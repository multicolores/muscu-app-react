import React from "react";
import { useState, useEffect } from "react";
// import { TextField } from "@mui/material";
// import Button from "@mui/material/Button";
import { Button } from "@mui/material";
// import { Link } from "react-router-dom";
import axios from "axios";

import { useCookies } from "react-cookie";

// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";

import "./WorkoutStyle.scss";
import AddTraining from "./AddTraining";
// import Notification from "./materialUI/Notification";
import ConfirmDialog from "./materialUI/ConfirmDialog";
import AddTrainingDialog from "./materialUI/AddTrainingDialog";
import Graphique from "./Graphique";

import { deleteWorkout } from "../servicesFunctions/deleteWorkout";

function Workout(props: any) {
  const [cookies, setCookie] = useCookies(["user"]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [AddTrainingbt, setAddTrainingbt] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false);
  // const [notify, setNotify] = useState({
  //   isOpen: false,
  //   message: "",
  //   type: "",
  // });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: null,
  });
  const [addTrainingDialog, setAddTrainingDialog] = useState({
    isOpen: false,
    workout: { repetition: [[0]] },
    onConfirm: null,
  });

  const workout_id = props.workout_id;

  useEffect(() => {
    // fetch every workouts id present in user
    fetchTrainingsData();
  }, []);
  function fetchTrainingsData() {
    console.log(" --------- FETCH --------");
    axios
      .get("https://api-nodejs-todo.herokuapp.com/workout/" + workout_id, {
        headers: {
          "auth-token": cookies.user,
        },
      })
      .then((res) => {
        //   console.log(res.data);
        setData(res.data);
        // console.log(res.data);
        setError(null);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function ShowExercises() {
    // https://flaviocopes.com/react-how-to-loop/

    let items = [];
    for (let i = 0; i < data.exercise.length; i++) {
      console.log(data.exercise[i].name);
      items.push(
        <div className="exerciseTable">
          <div className="content_container">
            <AddTrainingDialog
              exercise={data.exercise[i]}
              workout={data}
              reloadTrainings={fetchTrainingsData}
            />
            <div className="exoInfo">
              <span>{data.exercise[i].name}</span>
            </div>
            <div className="repsContainer">
              {data.exercise[i].repetition.map((row: any) => (
                <div className="repRow">
                  <div className="reps" key={Math.random()}>
                    {exercieRep(row)}
                  </div>
                  <div className="weightAndRecupContainer">
                    <span>{row[0]}</span>
                    <span>{row[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="graphique_container">
            <Graphique data={data.exercise[i].repetition} />
          </div>
        </div>
      );
    }
    return items;
  }
  function exercieRep(repArray: any) {
    let repRow = [];
    if (repArray.length > 2) {
      for (let e = 2; e < repArray.length; e++) {
        repRow.push(<span>{repArray[e]}</span>);
      }
    }
    return repRow;
  }

  function buttonDeleteWorkout() {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    let res = deleteWorkout(props.user, data._id, cookies.user);
    if (res) {
      props.setNotify({
        isOpen: true,
        message: "Workout Supprimer",
        type: "success",
      });
      props.reloadDatas();
    } else {
      props.setNotify({
        isOpen: true,
        message: "something went wrong, please try again",
        type: "error",
      });
    }
  }

  return (
    <div className="workoutContainer">
      {loading && <div>A moment please...</div>}
      {error && <div>{`There is a problem fetching user data - ${error}`}</div>}
      {/* {data && <Application user={data.user} workout={data.user.workout} />} */}
      {data && (
        <>
          <div className="workoutsCard_container">
            {/* <DeleteIcon className="deleteIcon" /> */}
            <IconButton
              aria-label="delete"
              className="deleteIcon"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Do you really want to delete this workout ?",
                  subTitle: "",
                  onConfirm: () => {
                    buttonDeleteWorkout();
                  },
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
            <div
              onClick={() => {
                setShowWorkout(!showWorkout);
                window.scrollTo(0, 0);
              }}
            >
              <h2>{data.name}</h2>
              <span className="description">{data.description}</span>
              <div className="exoInfo_container">
                {data.exercise.map((exercise: any) => (
                  <div className="exoInfo">
                    <li>{exercise.name}</li>
                    <span>{exercise.repetition.length} training</span>
                  </div>
                ))}
              </div>
              <span className="date">12/03/2022</span>
            </div>
          </div>
          {showWorkout && (
            <div className="workoutsDetailsContainer">
              <h1>{data.name}</h1>
              <div
                className="closeButton"
                onClick={() => {
                  setShowWorkout(!showWorkout);
                }}
              >
                <IconButton
                  aria-label="close icon"
                  component="span"
                  size="large"
                >
                  <CancelIcon fontSize="inherit" />
                </IconButton>
              </div>
              {/* {AddTrainingbt && (
                <AddTraining
                  workout={data}
                  reloadTrainings={fetchTrainingsData}
                />
              )} */}

              <div className="tableContainer">{ShowExercises()}</div>
            </div>
          )}
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </>
      )}
    </div>
  );
}

export default Workout;
