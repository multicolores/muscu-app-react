import * as React from "react";
import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from "@mui/icons-material/Send";

import "./AddTrainingDialog.scss";

export default function AddTrainingDialog(props: any) {
  // const { addTrainingDialog, setAddTrainingDialog } = props;
  const [open, setOpen] = useState(false);
  const [numberSet, setNumberSet] = useState(
    props.exercise.repetition[0].length
  );

  console.log(props);
  const exerciseTab = props.exercise;
  console.log(exerciseTab);
  console.log(props.exercise.repetition);
  console.log(props.exercise.name);
  // console.log(exerciseTab.repetition[0]);
  // console.log(exerciseTab.repetition[0].length);

  // const handleClose = () => {
  //   setAddTrainingDialog({ ...addTrainingDialog, isOpen: false });
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    console.log("confirm ( montrer les datas des inputs ici après ");
    setOpen(false);
  };

  let weight = props.exercise.weight;
  let recup = props.exercise.recuperation;
  const changeWeight = (e) => {
    console.log(weight);
    weight = e.target.value;
    console.log(weight);
  };
  const changeRecup = (e) => {
    console.log(recup);
    recup = e.target.value;
    console.log(recup);
  };

  let TrainingrepsArray = [];

  const handleChange = (e: any) => {
    console.log("handleChange");
    let arrayPosition = parseInt(e.target.id.split("_").pop());
    TrainingrepsArray[arrayPosition] = e.target.value;
    console.log(TrainingrepsArray);
  };

  let items = [];
  function exerciseRep() {
    for (let i = 0; i < numberSet; i++) {
      console.log(i);
      items.push(
        <input
          type="text"
          key={i}
          onChange={handleChange}
          id={`setNumber_${i}`}
        />
      );
    }
    return items;
  }

  let FinalArray = [];
  const handleSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.target.length - 4; i++) {
      if (i === 0 || i === 1) {
        if (e.target[i].value) FinalArray.push(e.target[i].value);
        else if (i === 0) FinalArray.push(props.exercise.weight);
        else if (i === 1) FinalArray.push(props.exercise.recuperation);
      } else {
        FinalArray.push(parseInt(e.target[i].value));
      }

      e.target[i].value = "";
    }
    console.log(FinalArray);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className="btAddTraining borderButton"
      >
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose} className="test">
        <div className="addTraining_DialogContainer">
          <h3>{props.exercise.name} training</h3>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <div className="weightRecup_input">
                <input
                  type="text"
                  onChange={changeWeight}
                  placeholder={props.exercise.weight}
                />
                <input
                  type="text"
                  onChange={changeRecup}
                  placeholder={props.exercise.recuperation}
                />
              </div>
              <div className="reps_input">
                <div className="reps_container">{exerciseRep()}</div>
                <div className="btReps">
                  <button
                    onClick={() => {
                      setNumberSet(numberSet + 1);
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      setNumberSet(numberSet - 1);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <div className="buttons_Container">
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  className="simpleBorderButton"
                >
                  Cancel
                </Button>
                {/* <Button
                variant="contained"
                onClick={handleConfirm}
                className="simpleBorderButton"
              >
                Confirm
              </Button> */}
                <input type="submit" value="Confirm" className="submitInput" />
              </div>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </>
  );
}
