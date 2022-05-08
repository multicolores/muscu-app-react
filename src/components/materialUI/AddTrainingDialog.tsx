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

  function exerciseRep() {
    let items = [];

    for (let i = 0; i < numberSet; i++) {
      console.log(i);
      items.push(<input type="text" key={i} />);
    }
    return items;
  }

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
          <DialogContent>
            <div className="weightRecup_input">
              <input type="text" />
              <input type="text" />
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
                className="underlineButton"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleConfirm}
                className="simpleBorderButton"
              >
                Confirm
              </Button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
