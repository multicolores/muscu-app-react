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
  const { addTrainingDialog, setAddTrainingDialog } = props;

  console.log(props);
  const exerciseTab = props.addTrainingDialog.workout;
  console.log(exerciseTab);
  console.log(exerciseTab.repetition[0]);
  console.log(exerciseTab.repetition[0].length);

  const handleClose = () => {
    setAddTrainingDialog({ ...addTrainingDialog, isOpen: false });
  };

  return (
    <Dialog
      open={addTrainingDialog.isOpen}
      onClose={handleClose}
      className="test"
    >
      <div className="addTraining_DialogContainer">
        <h3>{addTrainingDialog.workout.name} training</h3>
        <DialogContent>
          {exerciseTab.repetition[0] && (
            <TrainingForm exerciseTab={exerciseTab} />
          )}

          {/* {exercisesComponent()} */}
        </DialogContent>
        <DialogActions>
          <div className="buttons_Container">
            <Button
              variant="outlined"
              onClick={() =>
                setAddTrainingDialog({ ...addTrainingDialog, isOpen: false })
              }
              className="underlineButton"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={addTrainingDialog.onConfirm}
              className="simpleBorderButton"
            >
              Add training
            </Button>
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
}

const TrainingForm = (exerciseTab: any) => {
  console.log("test");
  console.log(exerciseTab);
  const [numberSet, setNumberSet] = useState(exerciseTab.repetition);

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
    </>
  );
};
